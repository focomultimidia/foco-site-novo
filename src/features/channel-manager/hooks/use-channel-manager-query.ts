import { useQuery } from "@tanstack/react-query";
import { fetchChannelManagerData } from "../api/channel-manager-api";
import type { ChannelManagerData } from "../types";

function useChannelManagerQuery() {
  return useQuery<ChannelManagerData, Error>({
    queryKey: ["channel-manager"],
    queryFn: fetchChannelManagerData,
    staleTime: 5 * 60 * 1000,
  });
}

export { useChannelManagerQuery };
