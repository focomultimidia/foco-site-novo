// Os dados desta página são um objeto ESTÁTICO escrito no próprio código
// (ver o `*-api.ts` ao lado) — não há rede envolvida. Isto aqui era um
// `useQuery` do TanStack Query sobre uma função `async` que só fazia
// `return <objeto>`, e essa combinação custava caro no LCP: mesmo
// resolvendo na microtask seguinte, `isLoading` nasce `true`, então o
// PRIMEIRO commit do React renderizava o `<Spinner/>` de tela cheia em vez
// da página. O `<img>` do hero (elemento de LCP da Home, medido no
// PageSpeed Insights) só entrava no DOM no segundo commit — e sob CPU
// lenta, com a thread principal ocupada avaliando o bundle, esse segundo
// commit demora. Medido em trace com throttling 4x + Slow 4G: 1.134 ms de
// "element render delay", 63,5% do LCP total.
//
// Lendo o objeto direto, a página inteira (hero incluso) sai já no primeiro
// commit. O formato de retorno é o mesmo de antes de propósito — as páginas
// continuam desestruturando `{ data, isLoading, isError, error, refetch }`
// e mantendo seus estados de erro/carregando, que passam a ser caminhos
// mortos aqui mas continuam válidos se algum dia esses dados virarem uma
// chamada real de API.

import { softwarePagamentosData } from "../api/software-pagamentos-api";
import type { SoftwarePagamentosData } from "../types";

interface SoftwarePagamentosQueryResult {
  data: SoftwarePagamentosData;
  isLoading: false;
  isError: false;
  error: null;
  refetch: () => void;
}

function useSoftwarePagamentosQuery(): SoftwarePagamentosQueryResult {
  return {
    data: softwarePagamentosData,
    isLoading: false,
    isError: false,
    error: null,
    refetch: () => {},
  };
}

export { useSoftwarePagamentosQuery };
