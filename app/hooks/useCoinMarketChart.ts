import { formatChartData } from "@/utils/formatChartData";
import axios from "axios";
import { useState, useEffect } from "react";

export default function useCoinMarketChart(coin: string, currency: string) {
  const [data, setData] = useState<{ date: string; price: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const days = 90;

  useEffect(() => {
    if (!coin) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coin}/market_chart`,
          {
            params: {
              vs_currency: currency,
              days,
              interval: "daily",
            },
          },
        );

        setData(formatChartData(data));
      } catch (err) {
        console.error(err);
        setError("Failed to fetch market chart data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [coin, currency]);

  return { data, loading, error };
}
