"use client";

import * as React from "react";
import { Bar, BarChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
import { formatCurrencyCompact } from "@/utils/formatCurrency";
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

  const sortedData = React.useMemo(() => {
    const volumes = data?.volumes ?? [];
    return volumes.slice().sort((a, b) => a.timestamp - b.timestamp);
  }, [data?.volumes]);

  if (isLoading) return <ChartSkeleton />;
  if (error) return <div className="text-red-500">Error loading chart</div>;

  return (
    <Card className="pt-0 rounded-xl overflow-hidden border border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-md bg-white/0">
      <CardHeader className="flex items-center gap-2 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 px-2">
          <CardTitle>Volume 24h</CardTitle>

          <CardDescription>
            {formatCurrencyCompact(coin?.total_volume ?? 0, defaultCurrency)}
          </CardDescription>

          <span>
            Last updated:{" "}
            {coin?.last_updated ? (
              <time dateTime={coin.last_updated}>
                {new Date(coin.last_updated).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            ) : (
              "N/A"
            )}
          </span>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-2 sm:px-6 sm:pt-2">
        <ChartContainer config={chartConfig} className=" h-[190px] w-full">
          <BarChart data={sortedData} margin={{ left: 12, right: 12 }}>
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

            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[110px]"
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

            <Bar
              dataKey="volume"
              fill={CHART_COLOR}
              radius={[4, 4, 0, 0]}
              activeBar={{
                fill: "#818cf8",
                stroke: "#6366f1",
                strokeWidth: 1,
                opacity: 0.9,
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
