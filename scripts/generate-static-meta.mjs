#!/usr/bin/env node
// Gera um dist/<rota>/index.html por rota (13 páginas fixas, /blog, /blog/busca,
// os 146 posts, categorias, tags e autores em uso) com <title>/description/
// og:*/twitter:*/canonical CORRETOS por página, mais um <script type=
// "application/ld+json"> de Organization em toda página, Product nas 9
// páginas de produto e BlogPosting em cada post — roda DEPOIS de `vite
// build` (ver package.json).
//
// Por que isso existe: o site é uma SPA sem SSR/prerender — um único
// dist/index.html serve todas as rotas, com título/description genéricos
// da Home. `useSeo()` (src/features/shared/lib/use-seo.ts) já corrige isso
// no CLIENTE via useEffect, o que resolve pro Googlebot (que executa JS
// antes de indexar) — mas não resolve pra quem NÃO executa JS: o preview de
// link do WhatsApp, Slack, Telegram, iMessage, Discord, X/Twitter. Esses
// bots leem só o HTML cru da primeira resposta — hoje, compartilhar
// QUALQUER página (um produto, um post do blog) mostra o título/descrição/
// imagem genéricos da Home, nunca os da página real.
//
// A correção não é SSR de verdade (exigiria um servidor Node persistente
// no lugar do Apache estático atual — mudança de infraestrutura, não só de
// código). É reescrever só o <head> por rota, copiando o dist/index.html
// já buildado (JS/CSS com hash, scripts de terceiros, tudo isso continua
// idêntico) pra dist/<rota>/index.html — o `RewriteCond %{REQUEST_FILENAME}
// !-f` que já existe no .htaccess (fallback de SPA) já pula o fallback
// quando existe um arquivo real, então o Apache serve esse HTML específico
// direto, sem precisar de nenhuma mudança de servidor. Quem navega DENTRO
// do site via React Router (client-side, sem reload) nunca nem toca nesses
// arquivos — só importam pra quem chega por link direto ou request de bot.
//
// Fonte dos dados de cada página fixa: extraída via regex do PRÓPRIO
// `useSeo({...})` de cada page.tsx — não duplicada à mão num segundo
// lugar, pra nunca dessincronizar do que o cliente realmente mostra.
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIST = path.join(ROOT, "dist");
const SITE_URL = "https://focomultimidia.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const LOGO_URL = `${SITE_URL}/assets/imgs/logo/logo-foco.svg`;

const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Foco Tecnologia",
  url: SITE_URL,
  logo: LOGO_URL,
  description:
    "Ecossistema completo de tecnologia hoteleira: PMS, motor de reservas, channel manager, site hoteleiro e CRM integrados em uma única plataforma.",
  foundingDate: "2006",
  sameAs: [
    "https://br.linkedin.com/company/focotecnologiaemarketing",
    "https://www.instagram.com/focomultimidia/",
    "https://www.facebook.com/focotecnologiaemarketing/",
    "https://www.youtube.com/channel/UCufhGIuMoV3ASJxaOR4Ci_Q",
    "https://twitter.com/FocoMultimidia_",
  ],
};

// As 9 páginas que vendem um produto real (não a Home, /sobre,
// /marketing-para-hoteis ou /politica-de-privacidade, que falam da empresa
// ou de um serviço de marketing, não de um software específico).
const PRODUCT_PAGES = new Set([
  "/sites-para-hoteis-e-pousadas",
  "/motor-de-reservas",
  "/gestor-de-canais-channel-manager",
  "/sistema-de-gestao-hoteleira-pms",
  "/aplicativo-de-hospedagem",
  "/software-de-pagamentos",
  "/integracoes-hoteleiras",
  "/crm-hoteleiro",
  "/inteligencia-artificial-para-hoteis-e-pousadas",
]);

const STATIC_PAGE_FILES = [
  "src/features/home/home-page.tsx",
  "src/features/site-hoteleiro/site-hoteleiro-page.tsx",
  "src/features/motor-reservas/motor-reservas-page.tsx",
  "src/features/channel-manager/channel-manager-page.tsx",
  "src/features/gestao-hoteleira/gestao-hoteleira-page.tsx",
  "src/features/experiencia-hospede/experiencia-hospede-page.tsx",
  "src/features/software-pagamentos/software-pagamentos-page.tsx",
  "src/features/integracoes-hoteleiras/integracoes-hoteleiras-page.tsx",
  "src/features/crm-hoteleiro/crm-hoteleiro-page.tsx",
  "src/features/otheo-ai/otheo-ai-page.tsx",
  "src/features/sobre/sobre-page.tsx",
  "src/features/marketing-para-hoteis/marketing-para-hoteis-page.tsx",
  "src/features/politica-de-privacidade/politica-de-privacidade-page.tsx",
];

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// `</script>` embutido no meio do JSON (título/excerpt com essa substring,
// por mais improvável que seja) fecharia a tag mais cedo — neutraliza `<`.
function jsonLdScript(obj) {
  const json = JSON.stringify(obj).replace(/</g, "\\u003c");
  return `    <script type="application/ld+json">${json}</script>`;
}

async function extractSeoFromPage(relPath) {
  const src = await readFile(path.join(ROOT, relPath), "utf8");
  const m = src.match(
    /useSeo\(\{\s*title:\s*"([^"]*)",\s*description:\s*\n?\s*"([^"]*)",\s*path:\s*"([^"]*)"/,
  );
  if (!m) {
    throw new Error(
      `[static-meta] useSeo() não encontrado (ou fora do formato "title/description/path" esperado) em ${relPath} — ajuste a regex de extração se o formato dessa chamada mudou.`,
    );
  }
  return { title: m[1], description: m[2], path: m[3] };
}

function buildHead(template, { title, description, path: routePath, image, imageWidth, imageHeight, jsonLd }) {
  const url = `${SITE_URL}${routePath}`;
  const isDefaultImage = image === DEFAULT_OG_IMAGE;
  let html = template;

  html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  html = html.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${escapeHtml(description)}" />`,
  );
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
  );
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
  );
  html = html.replace(
    /<meta property="og:url" content=".*?" \/>/,
    `<meta property="og:url" content="${url}" />`,
  );
  html = html.replace(
    /<meta property="og:image" content=".*?" \/>/,
    `<meta property="og:image" content="${image}" />`,
  );
  html = html.replace(
    /<meta name="twitter:title" content=".*?" \/>/,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
  );
  html = html.replace(
    /<meta name="twitter:description" content=".*?" \/>/,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
  );
  html = html.replace(
    /<meta name="twitter:image" content=".*?" \/>/,
    `<meta name="twitter:image" content="${image}" />`,
  );

  // As dimensões (900×816) só valem pro og-image.jpg padrão — pra qualquer
  // outra imagem (capa de post, card de produto, etc.) o tamanho real é
  // outro, e uma dimensão errada pode fazer o preview renderizar esticado/
  // cortado. Quando a página informa `imageWidth`/`imageHeight` (caso dos
  // cards de produto, gerados com 1200×630 conhecidos), usa o valor real;
  // senão (capa de post, cujo tamanho varia por imagem) é mais seguro
  // remover a tag (é opcional) do que declarar um valor incorreto.
  if (!isDefaultImage) {
    if (imageWidth && imageHeight) {
      html = html.replace(
        /<meta property="og:image:width" content=".*?" \/>/,
        `<meta property="og:image:width" content="${imageWidth}" />`,
      );
      html = html.replace(
        /<meta property="og:image:height" content=".*?" \/>/,
        `<meta property="og:image:height" content="${imageHeight}" />`,
      );
    } else {
      html = html.replace(/\s*<meta property="og:image:width" content=".*?" \/>\n/, "\n");
      html = html.replace(/\s*<meta property="og:image:height" content=".*?" \/>\n/, "\n");
    }
  }

  html = html.replace("</head>", `    <link rel="canonical" href="${url}" />\n  </head>`);
  const scripts = jsonLd.map(jsonLdScript).join("\n");
  html = html.replace("</head>", `${scripts}\n  </head>`);

  return html;
}

// Bloco de preload que só vale pra Home — ver o comentário no index.html.
// Fica marcado por comentários HTML em vez de casar a <link> pelo href
// porque o alvo pode mudar (outro print, outro formato) e o marcador
// continua valendo; e porque deixa explícito no próprio index.html que
// aquele trecho tem escopo de rota, não de site.
const HOME_ONLY_PRELOAD = /[ \t]*<!-- lcp-preload:home -->[\s\S]*?<!-- \/lcp-preload:home -->\n?/;

// ── modulepreload do chunk de cada rota ──────────────────────────────────────
// As páginas são `lazy()` (ver App.tsx), então a URL do chunk de cada uma só
// aparece DENTRO do index.js. Medido em trace (throttling 4x + Slow 4G): o
// index.js começava a baixar aos 648 ms, mas o pedido do home-page-*.js só
// saía aos 1.024 ms — o navegador teve que baixar E avaliar os 568 KB do
// bundle principal antes de sequer saber que aquele arquivo existia. Esses
// ~370 ms são serializados bem no meio da janela do LCP.
//
// `<link rel="modulepreload">` escrito no HTML resolve porque o preload
// scanner o lê no parse bruto do documento, junto com a tag do próprio
// index.js: os dois passam a baixar em paralelo. É `modulepreload` e não
// `preload as=script` de propósito — o primeiro também resolve e compila o
// módulo (e é o mesmo tipo de link que o `__vitePreload` do Vite injetaria em
// runtime), então quando o React chegar no `lazy()` o módulo já está pronto,
// sem segunda requisição.
//
// Escopo: o chunk da rota mais seus imports ESTÁTICOS (recursivo). Ficam de
// fora os `lazy()` internos da própria página (as seções gated por
// IntersectionObserver) — preloadá-los desfaria exatamente o adiamento que
// eles existem pra fazer.
let manifestCache;

async function loadManifest() {
  if (manifestCache) return manifestCache;
  try {
    manifestCache = JSON.parse(
      await readFile(path.join(DIST, ".vite/manifest.json"), "utf8"),
    );
  } catch {
    // `build.manifest` desligado ou build parcial: seguir sem os preloads é
    // degradação aceitável (o site continua correto, só perde o ganho), mas
    // avisa alto pra não passar despercebido numa mudança de config.
    console.warn(
      "[static-meta] dist/.vite/manifest.json não encontrado — nenhum <link rel=modulepreload> por rota será escrito. Confira `build.manifest` no vite.config.ts.",
    );
    manifestCache = {};
  }
  return manifestCache;
}

async function modulePreloadLinks(entryKey) {
  const manifest = await loadManifest();
  if (!entryKey || !manifest[entryKey]) return "";

  const files = [];
  const seen = new Set();
  (function collect(key) {
    if (seen.has(key)) return;
    seen.add(key);
    const chunk = manifest[key];
    if (!chunk) return;
    // A entrada (index.js) já vem como <script type="module"> no HTML; e o CSS
    // já vem como <link rel=stylesheet>. Só os chunks JS da rota interessam.
    if (chunk.file && !chunk.isEntry) files.push(chunk.file);
    for (const dep of chunk.imports ?? []) collect(dep);
  })(entryKey);

  return files
    .map((f) => `    <link rel="modulepreload" crossorigin href="/${f}" />`)
    .join("\n");
}

async function writeRoute(template, routePath, seo, entryKey) {
  let html = buildHead(template, seo);
  // Toda rota que não é a Home baixaria de graça o print do dashboard.
  if (routePath !== "/") html = html.replace(HOME_ONLY_PRELOAD, "");
  const preloads = await modulePreloadLinks(entryKey);
  if (preloads) html = html.replace("</head>", `${preloads}\n  </head>`);
  const outDir = routePath === "/" ? DIST : path.join(DIST, routePath.replace(/^\//, ""));
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "index.html"), html, "utf8");
}

async function main() {
  const template = await readFile(path.join(DIST, "index.html"), "utf8");
  const posts = JSON.parse(
    await readFile(
      path.join(ROOT, "src/features/blog/lib/_generated-index.json"),
      "utf8",
    ),
  );
  const { AUTHORS } = await import("../content/authors.ts");
  const { CATEGORIES } = await import("../content/categories.ts");

  let count = 0;

  // 1 — as 13 páginas fixas
  for (const file of STATIC_PAGE_FILES) {
    const seo = await extractSeoFromPage(file);
    const jsonLd = [ORGANIZATION_JSONLD];
    const isProduct = PRODUCT_PAGES.has(seo.path);
    // Card dedicado por produto (1200×630, gerado a partir de
    // scratchpad/og-card-template.html) em vez do og-image.jpg genérico da
    // Home — quem compartilha o link de um produto específico vê o nome e
    // a promessa DAQUELE produto no preview, não a mensagem genérica do site.
    const image = isProduct
      ? `${SITE_URL}/assets/imgs/og/${seo.path.slice(1)}.jpeg`
      : DEFAULT_OG_IMAGE;
    if (isProduct) {
      // "SoftwareApplication", não "Product" — são módulos de um SaaS
      // hoteleiro (sem preço público fixo, sem review/rating coletado no
      // site), e o Search Console reprova "Product" sem pelo menos um de
      // "offers"/"review"/"aggregateRating" (erro real visto: "Snippets do
      // produto: Especifique 'offers', 'review' ou 'aggregateRating'" nas
      // páginas de produto). Inventar esses campos violaria as políticas de
      // dados estruturados do Google; "SoftwareApplication" descreve o que
      // a página realmente é sem exigir nenhum deles.
      jsonLd.push({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: seo.title.split("|")[0].trim(),
        description: seo.description,
        image,
        url: `${SITE_URL}${seo.path}`,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        author: { "@type": "Organization", name: "Foco Tecnologia" },
      });
    }
    await writeRoute(template, seo.path, {
      ...seo,
      image,
      imageWidth: isProduct ? 1200 : undefined,
      imageHeight: isProduct ? 630 : undefined,
      jsonLd,
    }, file);
    count++;
  }

  // 2 — listagem e busca do blog
  await writeRoute(template, "/blog", {
    title: "Blog Foco | Gestão, marketing e tecnologia para hotelaria",
    description:
      "Artigos sobre gestão hoteleira, reserva direta, marketing e tecnologia — escritos para quem opera hotel ou pousada, não para quem só fala sobre isso.",
    path: "/blog",
    image: DEFAULT_OG_IMAGE,
    jsonLd: [ORGANIZATION_JSONLD],
  }, "src/features/blog/blog-home-page.tsx");
  count++;

  await writeRoute(template, "/blog/busca", {
    title: "Buscar | Blog Foco",
    description: "Busque artigos sobre gestão, marketing e tecnologia hoteleira.",
    path: "/blog/busca",
    image: DEFAULT_OG_IMAGE,
    jsonLd: [ORGANIZATION_JSONLD],
  }, "src/features/blog/blog-search-page.tsx");
  count++;

  // 3 — cada post
  for (const post of posts) {
    const author = AUTHORS.find((a) => a.id === post.frontmatter.author);
    const image = `${SITE_URL}${post.frontmatter.coverImage}`;
    const jsonLd = [
      ORGANIZATION_JSONLD,
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.frontmatter.title,
        description: post.frontmatter.excerpt,
        image,
        datePublished: post.frontmatter.date,
        dateModified: post.frontmatter.updatedAt,
        author: { "@type": "Person", name: author?.nome ?? "Foco Tecnologia" },
        publisher: {
          "@type": "Organization",
          name: "Foco Tecnologia",
          logo: { "@type": "ImageObject", url: LOGO_URL },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${SITE_URL}/blog/${post.slug}`,
        },
      },
    ];
    await writeRoute(template, `/blog/${post.slug}`, {
      title: `${post.frontmatter.seoTitle} | Blog Foco`,
      description: post.frontmatter.excerpt,
      path: `/blog/${post.slug}`,
      image,
      jsonLd,
    }, "src/features/blog/blog-post-page.tsx");
    count++;
  }

  // 4 — categorias, tags e autores realmente em uso (mesma lista que
  // scripts/generate-sitemap.mjs já deriva, pra nunca ter uma página de
  // categoria/tag/autor no sitemap sem <head> próprio, ou vice-versa).
  const categorySlugsInUse = new Set(posts.map((p) => p.frontmatter.category));
  for (const slug of categorySlugsInUse) {
    const cat = CATEGORIES.find((c) => c.slug === slug);
    if (!cat) continue;
    await writeRoute(template, `/blog/categoria/${slug}`, {
      title: `${cat.nome} | Blog Foco`,
      description: cat.descricao,
      path: `/blog/categoria/${slug}`,
      image: DEFAULT_OG_IMAGE,
      jsonLd: [ORGANIZATION_JSONLD],
    }, "src/features/blog/blog-category-page.tsx");
    count++;
  }

  const tagsInUse = new Set(posts.flatMap((p) => p.frontmatter.tags));
  for (const tag of tagsInUse) {
    const label = tag.replace(/-/g, " ");
    await writeRoute(template, `/blog/tag/${tag}`, {
      title: `#${label} | Blog Foco`,
      description: `Posts marcados com ${label}.`,
      path: `/blog/tag/${tag}`,
      image: DEFAULT_OG_IMAGE,
      jsonLd: [ORGANIZATION_JSONLD],
    }, "src/features/blog/blog-tag-page.tsx");
    count++;
  }

  const authorIdsInUse = new Set(posts.map((p) => p.frontmatter.author));
  for (const id of authorIdsInUse) {
    const author = AUTHORS.find((a) => a.id === id);
    if (!author) continue;
    await writeRoute(template, `/blog/autor/${id}`, {
      title: `${author.nome} | Blog Foco`,
      description: author.bio,
      path: `/blog/autor/${id}`,
      image: DEFAULT_OG_IMAGE,
      jsonLd: [ORGANIZATION_JSONLD],
    }, "src/features/blog/blog-author-page.tsx");
    count++;
  }

  console.log(`[static-meta] ${count} páginas com <head> próprio geradas em dist/`);
}

main();
