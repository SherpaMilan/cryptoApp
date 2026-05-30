import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useCoinDetailQuery(coinId: string) {
  return useQuery({
    queryKey: ["coin-detail", coinId],

    enabled: !!coinId,

    queryFn: async () => {
      const { data } = await axios.get(`/api/coin/${coinId}`);
      return data;
    },

    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,

    retry: false,

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
