#!/usr/bin/env node
// Migração do blog.focomultimidia.com (WordPress) pro novo /blog em MDX.
// Rodado manualmente, uma vez — não faz parte do `build` (ver plano técnico
// em .claude/plans, seção "Migração do conteúdo existente"). Uso:
//   node scripts/migrate-wp-posts.mjs            (todos os posts)
//   node scripts/migrate-wp-posts.mjs --limit=3   (teste rápido)
//   node scripts/migrate-wp-posts.mjs --slug=cancelamento-de-reservas-entenda-tudo
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import * as cheerio from "cheerio";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";
import { convertToWebp } from "./webp-codec.mjs";

// http, não https — o certificado TLS do blog antigo está expirado.
const WP_BASE = "http://blog.focomultimidia.com/wp-json/wp/v2";
const ROOT = path.resolve(import.meta.dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content", "blog");
const IMG_DIR = path.join(ROOT, "public", "assets", "imgs", "blog");

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);

// Categorias genéricas/vazias do WP — nunca escolhidas como categoria
// PRIMÁRIA de um post quando ele tem outra mais específica junto (ex.: um
// post com ["Artigos", "Motor de Reservas"] vira "Motor de Reservas" — o
// "Artigos" do WP é claramente um catch-all: está em 90 dos 146 posts).
const SKIP_CATEGORY_SLUGS = new Set(["artigos", "uncategorized", "quem-somos", "images-posts", "photograph"]);

const CATEGORY_TO_PRODUCT = {
  "motor-de-reservas": "motor-de-reservas",
  solucoes: "sistema-de-gestao-hoteleira-pms",
  tecnologia: "inteligencia-artificial-para-hoteis-e-pousadas",
};
const DEFAULT_PRODUCT = "motor-de-reservas";

// "focomult_user" e "foco" são duas contas WP diferentes com o mesmo nome
// de exibição ("Foco Multimídia") — consolidadas num autor só (ver
// content/authors.ts) pra não duplicar a página de autor.
const AUTHOR_SLUG_ALIAS = {
  focomult_user: "foco-multimidia",
  foco: "foco-multimidia",
};

// Título/seoTitle têm que ser texto puro — o editor de blocos do WP às
// vezes guarda negrito DENTRO do próprio título ("<strong>Day Use</strong>:
// lucro..."), e isso não pode sobreviver como HTML bruto num campo que vira
// <h1>/<title>/aria-label em vários lugares do site novo. Remove só a TAG,
// as palavras continuam as mesmas.
function stripTags(str) {
  return str.replace(/<\/?[a-zA-Z][^>]*>/g, "");
}

// Tags que o turndown legitimamente deixa passar como HTML bruto (sem regra
// de conversão própria, ou tabela complexa demais pro plugin de GFM) — tudo
// que NÃO estiver aqui e aparecer como "<Palavra" no corpo final é quase
// sempre um link quebrado do WP (href apontando pro próprio texto do link
// em vez de uma URL), e o MDX interpretaria como abertura de componente
// JSX inexistente — quebra a build. Escapar só o "<" faz o CommonMark não
// reconhecer mais aquele link malformado como link, e ele vira texto puro
// (as palavras continuam lá, só perde o href que já não ia pra lugar
// nenhum de verdade).
const SAFE_RAW_TAGS = new Set([
  "br", "span", "sup", "sub", "u", "i", "b", "strong", "em", "a", "img",
  "table", "thead", "tbody", "tr", "td", "th", "blockquote", "code", "pre",
]);
function escapeUnsafeAngleBrackets(markdown) {
  return markdown.replace(/<(\/?)([A-Za-z][A-Za-z0-9]*)/g, (match, slash, tag) =>
    SAFE_RAW_TAGS.has(tag.toLowerCase()) ? match : `&lt;${slash}${tag}`,
  );
}

function decodeEntities(str) {
  return str
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8217;/g, "’")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8230;/g, "…")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

async function fetchAllPosts() {
  if (args.slug) {
    const res = await fetch(`${WP_BASE}/posts?slug=${args.slug}&_embed=1`);
    return res.json();
  }
  const first = await fetch(`${WP_BASE}/posts?per_page=100&_embed=1&page=1`);
  const totalPages = Number(first.headers.get("x-wp-totalpages"));
  let posts = await first.json();
  for (let page = 2; page <= totalPages; page++) {
    const res = await fetch(`${WP_BASE}/posts?per_page=100&_embed=1&page=${page}`);
    posts = posts.concat(await res.json());
  }
  if (args.limit) posts = posts.slice(0, Number(args.limit));
  return posts;
}

function pickCategorySlug(termsCategories) {
  const specific = termsCategories.find((c) => !SKIP_CATEGORY_SLUGS.has(c.slug));
  return (specific ?? termsCategories[0])?.slug ?? "artigos";
}

// Mesma razão do WP_BASE acima — as imagens estão no mesmo domínio com
// certificado expirado.
function toHttp(url) {
  return url.replace(/^https:\/\/blog\.focomultimidia\.com/, "http://blog.focomultimidia.com");
}

function sanitizeFilename(url) {
  const base = decodeURIComponent(url.split("/").pop().split("?")[0]);
  // Sempre .webp — a imagem é convertida antes de gravar (ver abaixo), não
  // importa a extensão original (png/jpg/jpeg/sem extensão nenhuma).
  const withoutExt = base.replace(/\.[a-zA-Z0-9]+$/, "");
  return withoutExt.replace(/[^a-zA-Z0-9._-]/g, "-") + ".webp";
}

const imageCache = new Map(); // url -> caminho público (evita baixar a mesma imagem 2x)

async function downloadImage(url, slugDir) {
  if (imageCache.has(url)) return imageCache.get(url);
  const filename = sanitizeFilename(url);
  const localDir = path.join(IMG_DIR, slugDir);
  const localPath = path.join(localDir, filename);
  const publicPath = `/assets/imgs/blog/${slugDir}/${filename}`;
  if (!existsSync(localPath)) {
    await mkdir(localDir, { recursive: true });
    try {
      const res = await fetch(toHttp(url));
      if (!res.ok) throw new Error(`status ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      const webpBuf = await convertToWebp(buf);
      await writeFile(localPath, webpBuf);
    } catch (err) {
      console.warn(`    [img] falhou (${err.message}): ${url}`);
      imageCache.set(url, null);
      return null;
    }
  }
  imageCache.set(url, publicPath);
  return publicPath;
}

// ── turndown ──────────────────────────────────────────────────────────────
const td = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  emDelimiter: "*",
});
td.use(gfm);
td.remove(["script", "style"]);
td.addRule("figure", {
  filter: "figure",
  replacement: (content) => `\n\n${content.trim()}\n\n`,
});
td.addRule("figcaption", {
  filter: "figcaption",
  replacement: (content) => (content.trim() ? `\n*${content.trim()}*\n` : ""),
});

// Só isso passa direto pro HTML bruto embutido no corpo do MDX — qualquer
// outro atributo (class, style, id, data-*, width, height...) é puro
// enfeite do editor de blocos do WP e, pior, quebraria a compilação MDX:
// `class`/`style` como string não são JSX válido (JSX exige `className` e
// `style={{...}}`), então manter esses atributos faria `@mdx-js/rollup`
// falhar ao tentar interpretar o HTML residual como componente React.
const ATTR_ALLOWLIST = { a: ["href"], img: ["src", "alt"] };

async function cleanAndConvertContent(html, slug) {
  const $ = cheerio.load(html);
  $("script, style, noscript").remove();

  // Lazyload do tema antigo: o `src` real fica em `data-src` (o `src`
  // original é um placeholder base64 1x1 que nunca renderizaria nada aqui —
  // a lib de lazyload do WP não existe no site novo).
  $("img").each((_, el) => {
    const $img = $(el);
    const real = $img.attr("data-src") || $img.attr("src");
    if (real) $img.attr("src", real);
  });

  // Primeira imagem do CORPO que baixou com sucesso — usada como fallback
  // de `coverImage` (ver migratePost) pros posts que nunca tiveram imagem
  // destacada configurada no WP mas têm fotos de verdade no texto. Sem
  // isso, o card desses posts cai no placeholder cinza mesmo a matéria
  // tendo imagem — dado incompleto do WP, não falta de imagem de verdade.
  let firstImage = null;
  for (const el of $("img").toArray()) {
    const $img = $(el);
    const src = $img.attr("src");
    if (src && src.startsWith("http")) {
      const local = await downloadImage(src, slug);
      if (local) {
        $img.attr("src", local);
        firstImage ??= local;
      }
    }
  }

  $("*").each((_, el) => {
    if (el.type !== "tag") return;
    const allowed = ATTR_ALLOWLIST[el.tagName] || [];
    for (const attr of Object.keys(el.attribs || {})) {
      if (!allowed.includes(attr)) delete el.attribs[attr];
    }
  });

  const cleanedHtml = $.root().html() || "";
  let markdown = td.turndown(cleanedHtml);
  // `{`/`}` fora de bloco de código são sintaxe de expressão JS pro MDX —
  // esse blog não tem trecho de código nenhum, então escapar sempre é
  // seguro e preserva o caractere visualmente igual no post renderizado.
  markdown = markdown.replace(/\{/g, "&#123;").replace(/\}/g, "&#125;");
  markdown = escapeUnsafeAngleBrackets(markdown);
  markdown = markdown.replace(/\n{3,}/g, "\n\n").trim();
  return { markdown, firstImage };
}

function yamlStr(value) {
  return JSON.stringify(value);
}

async function migratePost(post) {
  const slug = post.slug;
  const title = stripTags(decodeEntities(post.title.rendered.trim())).trim();
  const excerptText = cheerio.load(post.excerpt.rendered)("body").text();
  const excerpt = decodeEntities(excerptText)
    .replace(/\s+/g, " ")
    .replace(/\s*\[?…\]?\s*$/, "")
    .trim();
  const date = post.date.slice(0, 10);
  const updatedAt = post.modified.slice(0, 10);

  const authorEmbedded = post._embedded?.author?.[0];
  const rawAuthorSlug = authorEmbedded?.slug ?? "foco-multimidia";
  const authorSlug = AUTHOR_SLUG_ALIAS[rawAuthorSlug] ?? rawAuthorSlug;

  const allTerms = post._embedded?.["wp:term"] ?? [];
  const termsCategories = allTerms.flat().filter((t) => t.taxonomy === "category");
  const termsTags = allTerms.flat().filter((t) => t.taxonomy === "post_tag");
  const category = pickCategorySlug(termsCategories);
  const tags = [...new Set(termsTags.map((t) => t.slug))];

  const { markdown: bodyMarkdown, firstImage } = await cleanAndConvertContent(post.content.rendered, slug);

  const featuredUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const featuredImage = featuredUrl ? await downloadImage(featuredUrl, slug) : null;
  // Fallback pra primeira imagem do corpo quando o post nunca teve imagem
  // destacada no WP (ver comentário em cleanAndConvertContent).
  const coverImage = featuredImage ?? firstImage ?? "";

  const ctaProduct = CATEGORY_TO_PRODUCT[category] ?? DEFAULT_PRODUCT;

  const frontmatter = [
    `title: ${yamlStr(title)}`,
    `seoTitle: ${yamlStr(title)}`,
    `excerpt: ${yamlStr(excerpt)}`,
    `date: ${yamlStr(date)}`,
    `updatedAt: ${yamlStr(updatedAt)}`,
    `author: ${yamlStr(authorSlug)}`,
    `category: ${yamlStr(category)}`,
    `tags: [${tags.map(yamlStr).join(", ")}]`,
    `coverImage: ${yamlStr(coverImage)}`,
    `ctaProduct: ${yamlStr(ctaProduct)}`,
  ].join("\n");

  const mdx = `---\n${frontmatter}\n---\n\n${bodyMarkdown}\n`;
  await writeFile(path.join(CONTENT_DIR, `${slug}.mdx`), mdx, "utf8");

  return { slug, category, tags, authorSlug, authorEmbedded };
}

async function main() {
  console.log("Buscando posts em blog.focomultimidia.com...");
  const posts = await fetchAllPosts();
  console.log(`${posts.length} posts encontrados.\n`);
  await mkdir(CONTENT_DIR, { recursive: true });

  const authorsUsed = new Map();
  const categoriesUsed = new Map();
  const failed = [];
  let i = 0;

  for (const post of posts) {
    i++;
    process.stdout.write(`[${i}/${posts.length}] ${post.slug}... `);
    try {
      const r = await migratePost(post);
      console.log("ok");
      authorsUsed.set(r.authorSlug, r.authorEmbedded);
      categoriesUsed.set(r.category, (categoriesUsed.get(r.category) ?? 0) + 1);
    } catch (err) {
      console.log(`ERRO: ${err.message}`);
      failed.push({ slug: post.slug, error: err.message });
    }
  }

  console.log("\n=== Categorias usadas (slug: contagem) ===");
  for (const [slug, count] of categoriesUsed) console.log(` ${slug}: ${count}`);

  console.log("\n=== Autores usados ===");
  for (const [slug, data] of authorsUsed) {
    console.log(` ${slug} | ${data?.name} | bio: ${data?.description || "(sem bio no WP)"}`);
  }

  if (failed.length) {
    console.log(`\n=== ${failed.length} posts falharam ===`);
    for (const f of failed) console.log(` ${f.slug}: ${f.error}`);
  }

  console.log(`\nMigrados: ${posts.length - failed.length}/${posts.length}`);
}

main();
