import { useCrmHoteleiroQuery } from "./use-crm-hoteleiro-query";

function useCrmHoteleiroPage() {
  const { data, isLoading, isError, refetch } = useCrmHoteleiroQuery();

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}

export { useCrmHoteleiroPage };
