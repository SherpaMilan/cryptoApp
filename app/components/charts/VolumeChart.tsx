"use client";

import * as React from "react";
import { Bar, BarChart, XAxis } from "recharts";

import { Coin } from "@/types/coin";
import { useCurrency } from "@/store/useCurrencyStore";
import { useStableCurrencyKey } from "@/hooks/useStableCurrencyKey";
import { useCoinChartQuery } from "@/hooks/useCoinChartQuery";
import { TIME_RANGES, TimeRangeKey } from "@/constants/timeRanges";
import { formatCurrencyCompact } from "@/utils/formatCurrency";
import { ChartCard } from "@/components/charts/ChartCard";
import { ChartDefaultToolTip } from "@/components/charts/ChartToolTip";
import { CHART_COLORS } from "@/constants/chartColors";
import { ChartConfig } from "@/components/ui/Chart";

const isDark =
  typeof window !== "undefined" &&
  document.documentElement.classList.contains("dark");

const colors = isDark ? CHART_COLORS.dark : CHART_COLORS.light;

const chartConfig = {
  volume: {
    label: "Volume",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function VolumeChart({
  coin,
  timeRange,
}: {
  coin: Coin | null;
  timeRange: TimeRangeKey;
}) {
  const { currencySymbol } = useCurrency();
  const stableCurrencyKey = useStableCurrencyKey();

  const { data, isLoading, error } = useCoinChartQuery(
    coin?.id,
    stableCurrencyKey,
    TIME_RANGES[timeRange],
  );

  const sortedData = React.useMemo(() => {
    const volumes = data?.volumes ?? [];
    return volumes.slice().sort((a, b) => a.timestamp - b.timestamp);
  }, [data]);

  return (
    <ChartCard
      title={"Volume 24h"}
      description={formatCurrencyCompact(
        coin?.total_volume ?? 0,
        stableCurrencyKey,
        currencySymbol,
      )}
      lastUpdated={coin?.last_updated}
      config={chartConfig}
      isLoading={isLoading}
      error={error}
    >
      <BarChart data={sortedData} margin={{ left: 12, right: 12 }}>
        <ChartDefaultToolTip />

        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={12}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          }}
          tick={{ fill: "var(--foreground)", fontSize: 12 }}
        />

        <Bar
          dataKey="volume"
          fill={colors.primary}
          radius={[4, 4, 0, 0]}
          activeBar={{
            fill: colors.primary,
            stroke: colors.primary,
            strokeWidth: 1,
            opacity: 0.9,
          }}
        />
      </BarChart>
    </ChartCard>
  );
}
