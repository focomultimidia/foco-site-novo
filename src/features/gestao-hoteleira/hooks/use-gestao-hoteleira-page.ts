import { useGestaoHoteleiraQuery } from "./use-gestao-hoteleira-query";

function useGestaoHoteleiraPage() {
  const { data, isLoading, isError, refetch } = useGestaoHoteleiraQuery();

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}

export { useGestaoHoteleiraPage };
