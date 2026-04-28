"use client";

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
          perPage: 100,
          page: 1,
        },
      });

      return data as Coin[];
    },
    staleTime: 60 * 1000 * 2, // 2 min cache
  });
}
