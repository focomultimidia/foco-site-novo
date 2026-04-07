import { useHomeQuery } from "./use-home-query";

function useHomePage() {
  const { data, isLoading, isError, refetch } = useHomeQuery();

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}

export { useHomePage };
