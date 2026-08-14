import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Coin } from "@/types/coin";

export function useCoinsPreviewQuery(
  currency: string,
  enabled: boolean,
  ids?: string[],
) {
  return useQuery({
    queryKey: ["coins-preview", currency, ids],
    enabled,

    queryFn: async () => {
      const { data } = await axios.get("/api/coins", {
        params: {
          currency,
          perPage: 100,
          page: 1,
          ...(ids?.length ? { ids: ids.join(",") } : {}),
        },
      });

      return data as Coin[];
    },

    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
}
