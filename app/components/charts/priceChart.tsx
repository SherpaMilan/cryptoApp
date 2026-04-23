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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCoinMarketChart from "@/hooks/useCoinMarketChart";
import { useCurrency } from "@/context/currencyContext";

const chartConfig = {
  price: {
    label: "Price",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function PriceChart({ coin }: { coin: Coin | null }) {
  const { defaultCurrency } = useCurrency();
  const { data } = useCoinMarketChart(coin?.id ?? "", defaultCurrency);
  const [timeRange, setTimeRange] = React.useState("90d");
  const chartData = data ?? [];

  const sortedData = React.useMemo(() => {
    return [...chartData].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  }, [chartData]);

  const filteredData = React.useMemo(() => {
    if (!sortedData.length) return [];

    const latestDate = new Date(sortedData[sortedData.length - 1].date);

    let daysToSubtract = 90;
    if (timeRange === "30d") daysToSubtract = 30;
    if (timeRange === "7d") daysToSubtract = 7;

    const startDate = new Date(latestDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);

    return sortedData.filter(
      (item) => new Date(item.date).getTime() >= startDate.getTime(),
    );
  }, [sortedData, timeRange]);

  return (
    <Card className="pt-0 rounded-xl overflow-hidden border-0 shadow-none">
      <CardHeader className="flex items-center gap-2 space-y-0  py-5 sm:flex-row ">
        <div className="grid flex-1 gap-1">
          <CardTitle>
            {coin?.name} ({coin?.symbol?.toUpperCase()} )
          </CardTitle>
          <CardDescription>$13.431 mln ???</CardDescription>
          <CardDescription>date ???</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[200px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-price)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-price)"
                  stopOpacity={0.1}
                />
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
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey="price"
              type="natural"
              // stroke="var(--color-price)"
              fill="url(#fillPrice)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
