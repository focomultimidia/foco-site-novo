import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'
import mdx from "@mdx-js/rollup"
import remarkGfm from "remark-gfm"
import remarkFrontmatter from "remark-frontmatter"
import remarkMdxFrontmatter from "remark-mdx-frontmatter"
import { remarkHeadingTree } from "./scripts/remark-heading-tree.mjs"

// https://vite.dev/config/
export default defineConfig({
  // Absoluto, não './' — o site é servido na raiz do domínio (ver
  // `RewriteBase /` em public/.htaccess). Com base relativa, o
  // <script src="./assets/..."> do index.html resolve por cima da URL
  // atual: funcionava por acidente em toda rota de 1 segmento
  // (/motor-de-reservas), mas quebra em qualquer rota mais profunda —
  // caso do blog (/blog/:slug, /blog/categoria/:slug), onde o navegador
  // resolvia "./assets/x.js" para "/blog/assets/x.js" (404) em vez de
  // "/assets/x.js".
  base: '/',
  plugins: [
    // Precisa vir ANTES do plugin do React — o Vite roda os plugins de
    // transform na ordem da lista, e o `.mdx` já tem que ter virado JSX
    // (função de componente) antes do `@vitejs/plugin-react` processar o
    // arquivo. `remarkFrontmatter` só reconhece o bloco `---` como nó da
    // árvore; quem de fato expõe `export const frontmatter = {...}` no
    // módulo compilado é o `remarkMdxFrontmatter` logo depois.
    // `remarkHeadingTree` (próprio, scripts/remark-heading-tree.mjs) faz o
    // mesmo pro sumário (`export const toc = [...]`), derivado dos
    // headings do próprio texto.
    mdx({
      remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter, remarkHeadingTree],
    }),
    inspectAttr(),
    react({
      // NÃO alargar `include` pra cobrir `.mdx` aqui — a transform do
      // @vitejs/plugin-react roda com `enforce: "pre"`, que o Vite executa
      // ANTES de qualquer plugin normal (`mdx()` incluso), não na ordem em
      // que aparecem no array. Se `.mdx` entrasse nesse `include`, o babel
      // do React tentaria interpretar o `---` do frontmatter como
      // JavaScript cru antes do `@mdx-js/rollup` sequer rodar (erro real
      // visto: "Invalid left-hand side in prefix operation" no `---`).
      // Sem isso, funciona porque `@mdx-js/rollup` já resolve toda a JSX
      // sozinho por padrão (runtime automático, sem deixar JSX literal pra
      // trás) — este plugin nunca precisa tocar o `.mdx`.
      babel: {
        plugins: [
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          ["@babel/plugin-proposal-class-properties", { loose: true }]
        ],
      },
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
