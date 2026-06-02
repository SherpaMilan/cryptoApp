"use client";

import React from "react";
import { Area, AreaChart, XAxis } from "recharts";
import { Coin } from "@/types/coin";

import { useCurrency } from "@/context/currencyContext";
import { useCoinChartQuery } from "@/hooks/useCoinChartQuery";
import { formatCurrencyCompact } from "@/utils/formatCurrency";

import { TIME_RANGES, TimeRangeKey } from "@/constants/timeRanges";
import { ChartCard } from "@/components/charts/ChartCard";
import { ChartDefaultToolTip } from "@/components/charts/ChartToolTip";
import { CHART_COLORS } from "@/constants/chartColors";
const isDark =
  typeof window !== "undefined" &&
  document.documentElement.classList.contains("dark");

const colors = isDark ? CHART_COLORS.dark : CHART_COLORS.light;
const chartConfig = {
  price: {
    label: "Price",
    color: "var(--chart-2)",
  },
};

export function PriceChart({
  coin,
  timeRange,
}: {
  coin: Coin | null;
  timeRange: TimeRangeKey;
}) {
  const { currencyKey, currencySymbol } = useCurrency();

  const { data, isLoading, error } = useCoinChartQuery(
    coin?.id,
    currencyKey,
    TIME_RANGES[timeRange],
  );

  const sortedData = React.useMemo(() => {
    return (data?.prices ?? [])
      .slice()
      .sort((a, b) => a.timestamp - b.timestamp);
  }, [data]);

  return (
    <ChartCard
      title={`${coin?.name} (${coin?.symbol?.toUpperCase()})`}
      description={formatCurrencyCompact(
        coin?.market_cap ?? 0,
        currencyKey,
        currencySymbol,
      )}
      lastUpdated={coin?.last_updated}
      config={chartConfig}
      isLoading={isLoading}
      error={error}
    >
      <AreaChart data={sortedData}>
        <ChartDefaultToolTip />

        <defs>
          <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8} />
            <stop offset="95%" stopColor={colors.primary} stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) =>
            new Date(value).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          }
          tick={{ fill: "var(--foreground)", fontSize: 12 }}
        />

        <Area
          dataKey="price"
          type="natural"
          stroke={colors.primary}
          fill="url(#fillPrice)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartCard>
  );
}
