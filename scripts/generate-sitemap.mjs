#!/usr/bin/env node
// Gera public/sitemap.xml — as páginas estáticas do site (lista fixa
// abaixo, igual ao sitemap.xml manual que existia antes) + toda URL real
// do blog (posts, categorias, tags, autores), derivada do índice que
// scripts/generate-blog-index.mjs já gerou. Sem isso, os 146 posts
// migrados do blog antigo ficam invisíveis pro Google via sitemap — só
// seriam descobertos rastreando link por link, bem mais lento.
//
// Roda em "predev"/"prebuild" (ver package.json), DEPOIS de
// generate-blog-index.mjs — depende do _generated-index.json que ele
// produz.
import { readFile, writeFile } from "fs/promises";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SITE_URL = "https://focomultimidia.com";
const INDEX_FILE = path.join(ROOT, "src", "features", "blog", "lib", "_generated-index.json");
const OUT_FILE = path.join(ROOT, "public", "sitemap.xml");

// Mesmas 13 páginas estáticas do sitemap.xml original — este script agora
// é a fonte única (gerado, não editado à mão), então elas moram aqui.
const STATIC_PAGES = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/sites-para-hoteis-e-pousadas", changefreq: "monthly", priority: "0.8" },
  { loc: "/motor-de-reservas", changefreq: "monthly", priority: "0.8" },
  { loc: "/gestor-de-canais-channel-manager", changefreq: "monthly", priority: "0.8" },
  { loc: "/sistema-de-gestao-hoteleira-pms", changefreq: "monthly", priority: "0.8" },
  { loc: "/aplicativo-de-hospedagem", changefreq: "monthly", priority: "0.8" },
  { loc: "/software-de-pagamentos", changefreq: "monthly", priority: "0.8" },
  { loc: "/integracoes-hoteleiras", changefreq: "monthly", priority: "0.8" },
  { loc: "/crm-hoteleiro", changefreq: "monthly", priority: "0.8" },
  { loc: "/inteligencia-artificial-para-hoteis-e-pousadas", changefreq: "monthly", priority: "0.8" },
  { loc: "/marketing-para-hoteis", changefreq: "monthly", priority: "0.8" },
  { loc: "/sobre", changefreq: "monthly", priority: "0.6" },
  { loc: "/politica-de-privacidade", changefreq: "yearly", priority: "0.3" },
];

function urlTag({ loc, changefreq, priority, lastmod }) {
  return [
    "  <url>",
    `    <loc>${SITE_URL}${loc}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    changefreq ? `    <changefreq>${changefreq}</changefreq>` : null,
    priority ? `    <priority>${priority}</priority>` : null,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

async function main() {
  const posts = JSON.parse(await readFile(INDEX_FILE, "utf8"));

  const categories = new Set();
  const tags = new Set();
  const authors = new Set();
  for (const { frontmatter } of posts) {
    categories.add(frontmatter.category);
    frontmatter.tags.forEach((t) => tags.add(t));
    authors.add(frontmatter.author);
  }

  const urls = [
    ...STATIC_PAGES.map(urlTag),
    urlTag({ loc: "/blog", changefreq: "daily", priority: "0.9" }),
    ...posts.map(({ slug, frontmatter }) =>
      urlTag({ loc: `/blog/${slug}`, lastmod: frontmatter.updatedAt, changefreq: "monthly", priority: "0.7" }),
    ),
    ...[...categories].sort().map((slug) => urlTag({ loc: `/blog/categoria/${slug}`, changefreq: "weekly", priority: "0.5" })),
    ...[...tags].sort().map((slug) => urlTag({ loc: `/blog/tag/${slug}`, changefreq: "weekly", priority: "0.4" })),
    ...[...authors].sort().map((slug) => urlTag({ loc: `/blog/autor/${slug}`, changefreq: "monthly", priority: "0.4" })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
  await writeFile(OUT_FILE, xml, "utf8");
  console.log(`[sitemap] ${urls.length} URLs (${posts.length} posts, ${categories.size} categorias, ${tags.size} tags, ${authors.size} autores) → public/sitemap.xml`);
}

main();
