import { useSiteHoteleiroQuery } from "./use-site-hoteleiro-query";

function useSiteHoteleiroPage() {
  const { data, isLoading, error, refetch } = useSiteHoteleiroQuery();

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}

export { useSiteHoteleiroPage };
