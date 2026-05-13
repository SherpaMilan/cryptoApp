import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Coin } from "@/types/coin";

export function useCoinsPreviewQuery(currency: string, enabled: boolean) {
  return useQuery({
    queryKey: ["coins-preview", currency],
    enabled,

    queryFn: async () => {
      const { data } = await axios.get("/api/coins", {
        params: {
          currency,
          perPage: 20,
          page: 1,
        },
      });

      return data as Coin[];
    },

    staleTime: 1000 * 60 * 2,
  });
}
