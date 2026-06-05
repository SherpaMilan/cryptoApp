import { MIN_SEARCH_LENGTH } from "@/constants/search";
import { SearchCoin } from "@/types/searchCoin";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCoinSearchQuery = (query: string) => {
  return useQuery<SearchCoin[]>({
    queryKey: ["coin-search", query],

    queryFn: async () => {
      const { data } = await axios.get("/api/search", {
        params: { query },
      });

      return data.coins;
    },

    enabled: query.trim().length > MIN_SEARCH_LENGTH,
    staleTime: 1000 * 60 * 2, // 2 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
