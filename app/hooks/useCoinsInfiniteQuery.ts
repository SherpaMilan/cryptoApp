import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Coin } from "@/types/coin";

const PAGE_SIZE = 20;

export function useCoinsInfiniteQuery(currency: string, enabled: boolean) {
  return useInfiniteQuery({
    queryKey: ["coins-infinite", currency],
    enabled,

    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.get("/api/coins", {
        params: {
          currency,
          perPage: PAGE_SIZE,
          page: pageParam,
          order: "market_cap_desc",
          price_change_percentage: "1h,24h,7d",
          sparkline: true,
        },
      });

      return data as Coin[];
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      // stop if API is finished
      if (lastPage.length < PAGE_SIZE) return undefined;

      return allPages.length + 1;
    },

    staleTime: 1000 * 60 * 2,
  });
}
