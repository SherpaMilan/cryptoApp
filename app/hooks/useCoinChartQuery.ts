import { formatChartData } from "@/utils/formatChartData";
import { formatVolumeChartData } from "@/utils/formatVolumeChartData";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useCoinChartQuery(
  coinId: string | undefined,
  currency: string,
  days: number,
) {
  return useQuery({
    queryKey: ["chart", coinId, currency, days],

    enabled: !!coinId && !!currency && !!days,

    queryFn: async () => {
      const { data } = await axios.get("/api/market-chart", {
        params: { coin: coinId, currency, days },
      });

      return {
        prices: formatChartData(data),
        volumes: formatVolumeChartData(data),
      };
    },

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30, //  cache longer

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}
