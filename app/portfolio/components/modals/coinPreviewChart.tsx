"use client";

import React from "react";
import { Line, LineChart, ResponsiveContainer, YAxis } from "recharts";

import { useCoinChartQuery } from "@/hooks/useCoinChartQuery";
import { useStableCurrencyKey } from "@/hooks/useStableCurrencyKey";
import { TIME_RANGES } from "@/constants/timeRanges";

type Props = {
  coinId: string | undefined;
};

type ChartPoint = {
  timestamp: number;
  price: number;
};

export default function CoinPreviewChart({ coinId }: Props) {
  const stableCurrency = useStableCurrencyKey();

  const { data, isLoading } = useCoinChartQuery(
    coinId,
    stableCurrency,
    TIME_RANGES["7D"],
  );

  const chartData = React.useMemo(() => {
    const prices: ChartPoint[] = (data?.prices ?? [])
      .slice()
      .sort((a, b) => a.timestamp - b.timestamp)
      .map((point) => ({
        timestamp: point.timestamp,
        price: point.price,
      }));

    if (prices.length <= 30) {
      return prices;
    }

    const maximumPoints = 30;
    const bucketSize = Math.ceil(prices.length / maximumPoints);

    return prices.filter((_, index) => index % bucketSize === 0);
  }, [data]);

  const chartDomain = React.useMemo(() => {
    if (chartData.length === 0) {
      return ["auto", "auto"] as const;
    }

    const prices = chartData.map((point) => point.price);

    const minimumPrice = Math.min(...prices);
    const maximumPrice = Math.max(...prices);
    const priceRange = maximumPrice - minimumPrice;

    const padding =
      priceRange === 0
        ? Math.max(Math.abs(minimumPrice) * 0.005, 0.000001)
        : priceRange * 0.05;

    return [minimumPrice - padding, maximumPrice + padding] as [number, number];
  }, [chartData]);

  if (isLoading) {
    return (
      <div className="h-28 w-full animate-pulse rounded-xl bg-black/5 dark:bg-white/5" />
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="flex h-28 items-center justify-center text-xs text-muted-foreground">
        No chart data
      </div>
    );
  }

  return (
    <div className="h-28 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 4,
            right: 4,
            bottom: 4,
            left: 4,
          }}
        >
          <YAxis hide domain={chartDomain} />

          <Line
            type="linear"
            dataKey="price"
            stroke="var(--brand-purple)"
            strokeWidth={2}
            dot={false}
            activeDot={false}
            isAnimationActive
            animationDuration={400}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
