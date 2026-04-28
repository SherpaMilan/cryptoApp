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
  onTimeRangeChange: (range: TimeRangeKey) => void;
}) {
  const { defaultCurrency } = useCurrency();

  const { data, isLoading, error } = useCoinChartQuery(
    coin?.id,
    defaultCurrency,
    TIME_RANGES[timeRange],
  );
  const prices = data?.prices ?? [];

  const sortedData = React.useMemo(() => {
    return [...prices].sort((a, b) => a.timestamp - b.timestamp);
  }, [data]);

  if (isLoading) return <ChartSkeleton />;
  if (error) return <div className="text-red-500">Error loading chart</div>;

  return (
    <Card className="pt-0 rounded-xl overflow-hidden border-0 shadow-none">
      <CardHeader className="flex items-center gap-2 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 px-2">
          <CardTitle>
            {coin?.name} ({coin?.symbol?.toUpperCase()})
          </CardTitle>
          <CardDescription>
            {formatCurrencyCompact(coin?.market_cap ?? 0, defaultCurrency)}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <AreaChart data={sortedData}>
            <defs>
              <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLOR} stopOpacity={0.8} />
                <stop offset="95%" stopColor={CHART_COLOR} stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <XAxis dataKey="date" />

            <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />

            <Area
              dataKey="price"
              type="natural"
              stroke={CHART_COLOR}
              fill="url(#fillPrice)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
