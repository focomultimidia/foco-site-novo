import { useQuery } from "@tanstack/react-query";
import { fetchIntegracoesHoteleirasData } from "../api/integracoes-hoteleiras-api";
import type { IntegracoesHoteleirasData } from "../types";

function useIntegracoesHoteleirasQuery() {
  return useQuery<IntegracoesHoteleirasData, Error>({
    queryKey: ["integracoes-hoteleiras"],
    queryFn: fetchIntegracoesHoteleirasData,
    staleTime: 5 * 60 * 1000,
  });
}

export { useIntegracoesHoteleirasQuery };
