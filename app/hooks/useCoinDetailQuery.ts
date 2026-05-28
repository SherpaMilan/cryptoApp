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
    retry: false,

    staleTime: 1000 * 60 * 2,
  });
}
