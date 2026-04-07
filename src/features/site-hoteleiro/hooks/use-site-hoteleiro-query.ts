import { useQuery } from "@tanstack/react-query";
import { fetchSiteHoteleiroData } from "../api/site-hoteleiro-api";
import type { SiteHoteleiroData } from "../types";

const SITE_HOTELEIRO_QUERY_KEY = ["site-hoteleiro"] as const;

function useSiteHoteleiroQuery() {
  return useQuery<SiteHoteleiroData, Error>({
    queryKey: SITE_HOTELEIRO_QUERY_KEY,
    queryFn: fetchSiteHoteleiroData,
    staleTime: 5 * 60 * 1000,
  });
}

export { useSiteHoteleiroQuery, SITE_HOTELEIRO_QUERY_KEY };
