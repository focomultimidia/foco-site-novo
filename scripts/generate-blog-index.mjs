#!/usr/bin/env node
// Gera src/features/blog/lib/_generated-index.json a partir de
// content/blog/*.mdx — roda ANTES de `tsc`/`vite` (ver package.json:
// "predev"/"prebuild"), não como plugin do Vite, porque `tsc -b` roda
// independente do Vite no script de build e precisa achar o JSON já
// pronto no disco.
//
// Por que isso existe: `posts-index.ts` costumava extrair frontmatter/toc
// direto de um `import.meta.glob(".../*.mdx", { eager: true })`. Mesmo
// pedindo só o export `frontmatter` (`import: "frontmatter"`), o Rollup
// ainda precisa CARREGAR o módulo .mdx inteiro pra resolver esse binding —
// e carregar o módulo inclui compilar o corpo do post inteiro em JSX. Com
// os 146 posts reais migrados do blog antigo, isso juntava tudo (corpo
// incluso) num chunk só de 2.6MB, baixado em QUALQUER página do blog,
// inclusive a listagem — que nunca precisa do corpo de post nenhum.
//
// Rodando a extração aqui, em Node puro, fora do grafo de módulos do
// Vite/Rollup, o metadado (frontmatter/toc/tempo de leitura) vira um JSON
// estático — dado puro, sem nenhum componente React grudado. O `.mdx` em
// si só entra no bundle via `import()` dinâmico em posts-index.ts, um
// chunk por post, baixado só quando alguém abre aquele post específico.
import { readFile, writeFile, readdir, mkdir } from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { computeHeadingTree } from "./remark-heading-tree.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content", "blog");
const OUT_FILE = path.join(ROOT, "src", "features", "blog", "lib", "_generated-index.json");

const processor = unified().use(remarkParse).use(remarkGfm);

async function main() {
  const files = (await readdir(CONTENT_DIR)).filter((f) => f.endsWith(".mdx"));

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = await readFile(path.join(CONTENT_DIR, file), "utf8");
      const { data: frontmatter, content: body } = matter(raw);
      const tree = processor.parse(body);
      const { toc, readingTimeMin } = computeHeadingTree(tree);
      return { slug, frontmatter, toc, readingTimeMin };
    }),
  );

  await mkdir(path.dirname(OUT_FILE), { recursive: true });
  await writeFile(OUT_FILE, JSON.stringify(posts), "utf8");
  console.log(`[blog-index] ${posts.length} posts indexados → ${path.relative(ROOT, OUT_FILE)}`);
}

main();
