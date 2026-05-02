import { formatChartData } from "@/utils/formatChartData";
import { formatVolumeChartData } from "@/utils/formatVolumeChartData";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export function useCoinChartQuery(
  coinId: string | undefined,
  currency: string,
  days: number,
) {
  return useQuery({
    queryKey: ["chart", coinId, currency, days],
    enabled: !!coinId,
    queryFn: async () => {
      try {
        const { data } = await axios.get("/api/market-chart", {
          params: {
            coin: coinId,
            currency,
            days,
          },
        });
        const prices = formatChartData(data);
        const volumes = formatVolumeChartData(data);

        return { prices, volumes };
      } catch (error: unknown) {
        const err = error as AxiosError<{ message?: string }>;
        if (err.response?.status === 429) {
          throw new Error("Too many requests. Please try again later.");
        }

        if (err.response?.status && err.response.status >= 500) {
          throw new Error("Server error. Please try again.");
        }

        throw new Error("Failed to load chart data.");
      }
    },

    staleTime: 60 * 1000 * 2, // 2 min cache
  });
}
