import { useIntegracoesHoteleirasQuery } from "./use-integracoes-hoteleiras-query";

function useIntegracoesHoteleirasPage() {
  const { data, isLoading, isError, refetch } = useIntegracoesHoteleirasQuery();

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}

export { useIntegracoesHoteleirasPage };
