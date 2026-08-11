/**
 * resolveOtheoIntent — resolução de intenção 100% local, só pra essa
 * página de demonstração ter uma resposta plausível sem depender de um
 * backend real. Nunca deve ser confundido com IA de verdade: é um
 * classificador por palavra-chave, propositalmente simples. Na extranet
 * real, isso vira uma chamada de API — o contrato (retorna um `OtheoResponse`
 * tipado) já é o mesmo, então trocar a implementação aqui dentro não
 * deveria exigir mudar nenhum componente que consome o resultado.
 */

export type OtheoResponse =
  | { kind: "mapa" }
  | { kind: "reserva"; query: string }
  | { kind: "acao"; query: string }
  | { kind: "generico"; query: string };

const MAPA_MARKER = "__ABRIR_MAPA__";

const RESERVA_PATTERN = /reserva|saldo|h[oó]sped|check-?in|check-?out|voucher|avalia|consumo/i;
const ACAO_PATTERN = /bloqueio|manuten|venda|excel|insight|m[ií]nimo|m[aá]ximo/i;

export function resolveOtheoIntent(text: string): OtheoResponse {
  if (text === MAPA_MARKER) return { kind: "mapa" };
  if (RESERVA_PATTERN.test(text)) return { kind: "reserva", query: text };
  if (ACAO_PATTERN.test(text)) return { kind: "acao", query: text };
  return { kind: "generico", query: text };
}

export { MAPA_MARKER };
