import { useChannelManagerQuery } from "./use-channel-manager-query";

function useChannelManagerPage() {
  const { data, isLoading, isError, refetch } = useChannelManagerQuery();

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}

export { useChannelManagerPage };
