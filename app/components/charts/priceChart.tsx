"use client";

import React from "react";
import { Area, AreaChart, XAxis } from "recharts";
import { Coin } from "@/types/coin";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { useCurrency } from "@/context/currencyContext";
import ChartSkeleton from "../skeletons/chartSkeleton";
import { useCoinChartQuery } from "@/hooks/useCoinChartQuery";
import { formatCurrencyCompact } from "@/utils/formatCurrency";

import { TIME_RANGES, TimeRangeKey } from "@/constants/timeRanges";
const CHART_COLOR = "#6366f1"; // fallback indigo

const chartConfig = {
  price: {
    label: "Price",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function PriceChart({
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
    const prices = data?.prices ?? [];

    return prices.slice().sort((a, b) => a.timestamp - b.timestamp);
  }, [data?.prices]);

  if (isLoading) return <ChartSkeleton />;
  if (error) return <div className="text-red-500">Error loading chart</div>;

  return (
    <Card className="pt-0 rounded-xl overflow-hidden border border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-md bg-white/0">
      <CardHeader className="flex items-center gap-2 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 px-2">
          <CardTitle>
            {coin?.name} ({coin?.symbol?.toUpperCase()})
          </CardTitle>
          <CardDescription>
            {formatCurrencyCompact(coin?.market_cap ?? 0, defaultCurrency)}
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
        <ChartContainer config={chartConfig} className="h-[190px] w-full ">
          <AreaChart data={sortedData}>
            <defs>
              <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLOR} stopOpacity={0.8} />
                <stop offset="95%" stopColor={CHART_COLOR} stopOpacity={0.1} />
              </linearGradient>
            </defs>

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

            <Area
              dataKey="price"
              type="natural"
              stroke={CHART_COLOR}
              fill="url(#fillPrice)"
              strokeWidth={2}
              activeDot={{
                r: 6,
                fill: "#6366f1",
                stroke: "none",
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
