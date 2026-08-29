// A contagem em si (~200 palavras/min sobre o texto real do MDX) já acontece
// uma vez no build, em scripts/remark-heading-tree.mjs — mais preciso ali
// (lê o markdown puro) do que rodar no cliente sobre o JSX já compilado.
// Esta função só formata o número resultante pro texto que aparece na tela.
export function formatReadingTime(minutes: number): string {
  return `${minutes} min de leitura`;
}
