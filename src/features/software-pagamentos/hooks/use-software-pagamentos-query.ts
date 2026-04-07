import { useQuery } from "@tanstack/react-query";
import { fetchSoftwarePagamentosData } from "../api/software-pagamentos-api";
import type { SoftwarePagamentosData } from "../types";

function useSoftwarePagamentosQuery() {
  return useQuery<SoftwarePagamentosData, Error>({
    queryKey: ["software-pagamentos"],
    queryFn: fetchSoftwarePagamentosData,
    staleTime: 5 * 60 * 1000,
  });
}

export { useSoftwarePagamentosQuery };
