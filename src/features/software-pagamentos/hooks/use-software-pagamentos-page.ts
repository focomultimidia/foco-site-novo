import { useSoftwarePagamentosQuery } from "./use-software-pagamentos-query";

function useSoftwarePagamentosPage() {
  const { data, isLoading, isError, refetch } = useSoftwarePagamentosQuery();

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}

export { useSoftwarePagamentosPage };
