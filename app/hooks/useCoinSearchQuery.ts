import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCoinSearchQuery = (query: string) => {
  return useQuery({
    queryKey: ["coin-search", query],

    queryFn: async () => {
      const { data } = await axios.get("/api/search", {
        params: { query },
      });

      return data.coins;
    },

    enabled: query.trim().length > 2, // IMPORTANT
    staleTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
