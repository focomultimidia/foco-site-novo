import { useQuery } from "@tanstack/react-query";
import { fetchCrmHoteleiroData } from "../api/crm-hoteleiro-api";
import type { CrmHoteleiroData } from "../types";

function useCrmHoteleiroQuery() {
  return useQuery<CrmHoteleiroData, Error>({
    queryKey: ["crm-hoteleiro"],
    queryFn: fetchCrmHoteleiroData,
    staleTime: 5 * 60 * 1000,
  });
}

export { useCrmHoteleiroQuery };
