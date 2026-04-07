import { useQuery } from "@tanstack/react-query";
import { fetchGestaoHoteleiraData } from "../api/gestao-hoteleira-api";
import type { GestaoHoteleiraData } from "../types";

function useGestaoHoteleiraQuery() {
  return useQuery<GestaoHoteleiraData, Error>({
    queryKey: ["gestao-hoteleira"],
    queryFn: fetchGestaoHoteleiraData,
    staleTime: 5 * 60 * 1000,
  });
}

export { useGestaoHoteleiraQuery };
