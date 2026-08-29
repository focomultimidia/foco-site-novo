import { visit } from "unist-util-visit";
import GithubSlugger from "github-slugger";
import { valueToEstree } from "estree-util-value-to-estree";
import { define } from "unist-util-mdx-define";

// ── remarkHeadingTree ────────────────────────────────────────────────────────
// Extrai os h2/h3 de um post MDX pro sumário, sem exigir que quem escreve
// mantenha uma lista separada em sincronia com o texto (a fonte de verdade é
// sempre o próprio Markdown), e de quebra calcula o tempo de leitura — os
// dois precisam do mesmo percurso pela árvore, então saem do mesmo plugin em
// vez de duas passadas separadas. Faz três coisas:
//   1. Grava `id` em `hProperties` — o mdast-util-to-hast usa isso na hora de
//      virar HTML, então o <h2>/<h3> compilado já nasce com o mesmo id usado
//      no link do sumário, sem lógica extra em tempo de execução.
//   2. Acumula { id, numero, titulo, nivel } e injeta
//      `export const toc = [...]` no topo do módulo MDX compilado — mesmo
//      formato de `tocSections` já usado em
//      politica-de-privacidade/data/toc-sections.ts, pra alimentar o
//      FloatingToc sem precisar de um formato novo. `define()` (mesmo
//      helper que remark-mdx-frontmatter usa por baixo dos panos) monta o
//      node `mdxjsEsm` com o `estree` correto — nada de montar isso à mão.
// Núcleo puro (sem `define`/injeção de export) — reaproveitado tanto pelo
// plugin remark abaixo (roda dentro do pipeline do @mdx-js/rollup, injeta
// `export const toc/readingTimeMin` no módulo compilado) quanto por
// scripts/generate-blog-index.mjs (roda fora do Vite, num script Node
// standalone, pra gerar o índice de metadado do blog sem precisar
// compilar as 146 páginas MDX inteiras). Mesma lógica, uma fonte só —
// sem isso o índice gerado podia divergir do sumário real de cada post.
export function computeHeadingTree(tree) {
  const slugger = new GithubSlugger();
  const toc = [];
  let h2Count = 0;
  let h3Count = 0;

  visit(tree, "heading", (node) => {
    if (node.depth !== 2 && node.depth !== 3) return;

    const titulo = toPlainText(node);
    if (!titulo) return;

    const id = slugger.slug(titulo);
    node.data ??= {};
    node.data.hProperties ??= {};
    node.data.hProperties.id = id;

    let numero;
    if (node.depth === 2) {
      h2Count += 1;
      h3Count = 0;
      numero = String(h2Count).padStart(2, "0");
    } else {
      h3Count += 1;
      numero = `${h2Count}.${h3Count}`;
    }

    toc.push({ id, numero, titulo, nivel: node.depth });
  });

  let wordCount = 0;
  visit(tree, "text", (node) => {
    wordCount += node.value.trim().split(/\s+/).filter(Boolean).length;
  });
  // 200 palavras/min — média padrão de leitura em português, arredondado
  // pra cima (1 min mínimo, nunca "0 min de leitura").
  const readingTimeMin = Math.max(1, Math.round(wordCount / 200));

  return { toc, readingTimeMin };
}

export function remarkHeadingTree() {
  return (tree, file) => {
    const { toc, readingTimeMin } = computeHeadingTree(tree);
    define(tree, file, { toc: valueToEstree(toc), readingTimeMin: valueToEstree(readingTimeMin) });
  };
}

function toPlainText(node) {
  let text = "";
  visit(node, (child) => {
    if (child.type === "text" || child.type === "inlineCode") text += child.value;
  });
  return text.trim();
}
