"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Coin } from "@/types/coin";
import { useCurrency } from "@/context/currencyContext";
import { useCoinChartQuery } from "@/hooks/useCoinChartQuery";
import { TIME_RANGES, TimeRangeKey } from "@/constants/timeRanges";
import ChartSkeleton from "../skeletons/chartSkeleton";
const CHART_COLOR = "#6366f1"; // fallback indigo
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
  const { defaultCurrency } = useCurrency();

  const { data, isLoading, error } = useCoinChartQuery(
    coin?.id,
    defaultCurrency,
    TIME_RANGES[timeRange],
  );

  const volumes = data?.volumes ?? [];

  const sortedData = React.useMemo(() => {
    return [...volumes].sort((a, b) => a.timestamp - b.timestamp);
  }, [volumes]);

  if (isLoading) return <ChartSkeleton />;
  if (error) return <div className="text-red-500">Error loading chart</div>;

  return (
    <Card className="pt-0 rounded-xl overflow-hidden border-0 shadow-none">
      <CardHeader className="flex items-center gap-2 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 px-2">
          <CardTitle>Volume 24h</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[185px] w-full"
        >
          <BarChart data={sortedData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }
                />
              }
            />

            <Bar dataKey="volume" fill={CHART_COLOR} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
