"use client";

import * as React from "react";
import { Bar, BarChart, XAxis } from "recharts";

import { Coin } from "@/types/coin";
import { useCurrency } from "@/context/currencyContext";
import { useCoinChartQuery } from "@/hooks/useCoinChartQuery";
import { TIME_RANGES, TimeRangeKey } from "@/constants/timeRanges";
import { formatCurrencyCompact } from "@/utils/formatCurrency";
import { ChartCard } from "./ChartCard";
import { ChartDefaultToolTip } from "./ChartToolTip";
import { CHART_COLORS } from "@/constants/chartColors";
import { ChartConfig } from "../ui/Chart";

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
  const { currencyKey, currencySymbol } = useCurrency();

  const { data, isLoading, error } = useCoinChartQuery(
    coin?.id,
    currencyKey,
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
        currencyKey,
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
        />

        <Bar
          dataKey="volume"
          fill={CHART_COLORS.primary}
          radius={[4, 4, 0, 0]}
          activeBar={{
            fill: CHART_COLORS.primary,
            stroke: CHART_COLORS.primary,
            strokeWidth: 1,
            opacity: 0.9,
          }}
        />
      </BarChart>
    </ChartCard>
  );
}
