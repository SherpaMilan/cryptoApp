import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Coin } from "@/types/coin";

export function useCoinsQuery(currency: string, enabled: boolean) {
  return useQuery({
    queryKey: ["coins", currency],
    enabled,
    queryFn: async () => {
      const { data } = await axios.get("/api/coins", {
        params: {
          currency,
          perPage: 20,
          page: 1,

          order: "market_cap_desc",
          price_change_percentage: "1h,24h,7d",
          sparkline: true,
        },
      });
      return data as Coin[];
    },
    staleTime: 60 * 1000 * 2, // 2 min cache
  });
}
