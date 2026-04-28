"use client";

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
    enabled: !!coinId,
    queryFn: async () => {
      const { data } = await axios.get("/api/market-chart", {
        params: {
          coin: coinId,
          currency,
          days,
        },
      });
      return {
        prices: formatChartData(data),
        volumes: formatVolumeChartData(data),
      };
    },
    staleTime: 60 * 1000 * 2, // 2 min cache
  });
}
