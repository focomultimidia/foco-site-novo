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
  build: {
    // `true`, não "hidden". Os dois geram os mesmos .map em dist/; a única
    // diferença é o comentário `//# sourceMappingURL=` no fim do JS servido.
    //
    // "hidden" existia aqui pra "não expor o fonte em produção", mas isso
    // nunca funcionou: o deploy sobe a pasta dist/ inteira, então os .map já
    // estão públicos no servidor há tempos — verificado em produção,
    // https://focomultimidia.com/assets/index-<hash>.js.map devolve 200 com o
    // mapa real (2,79 MB, `{"version":3,...}`). Como o nome do .map é só o
    // nome do .js + ".map", qualquer um chega nele. Omitir o comentário não
    // escondia nada: só impedia o DevTools (e o Lighthouse) de ACHAR o mapa
    // que já estava lá — daí o aviso "Mapas de origem ausentes no JavaScript
    // principal grande" no PageSpeed Insights.
    //
    // Sem custo pro usuário final: navegador nenhum baixa .map a menos que o
    // DevTools esteja aberto, então o payload real da página não muda.
    sourcemap: true,

    // Emite dist/.vite/manifest.json (mapa "arquivo-fonte → chunk hasheado +
    // seus imports estáticos"). Não vai pro navegador: é consumido em build
    // por scripts/generate-static-meta.mjs pra escrever os
    // <link rel="modulepreload"> do chunk de cada rota no HTML daquela rota.
    //
    // Por que isso importa: as rotas são `lazy()` (ver App.tsx), então a URL
    // do chunk da página só existe DENTRO do index.js. Medido em trace
    // (throttling 4x + Slow 4G), o pedido de home-page-*.js só saía aos
    // ~1.024 ms — o navegador precisou baixar E avaliar os 568 KB do
    // index.js antes de descobrir que esse arquivo existia, enquanto o
    // próprio index.js tinha começado aos 648 ms. Com o modulepreload no
    // HTML, o preload scanner dispara os dois em paralelo já no parse bruto.
    manifest: true,
  },
});
