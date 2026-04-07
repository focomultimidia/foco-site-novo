import { useQuery } from "@tanstack/react-query";
import { fetchHomeData } from "../api/home-api";
import type { HomeData } from "../types";

function useHomeQuery() {
  return useQuery<HomeData, Error>({
    queryKey: ["home"],
    queryFn: fetchHomeData,
    staleTime: 5 * 60 * 1000,
  });
}

export { useHomeQuery };
