"use client";

import React from "react";
import {
  Area,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

import { useCoinChartQuery } from "@/hooks/useCoinChartQuery";
import { useCurrency } from "@/store/useCurrencyStore";
import { useStableCurrencyKey } from "@/hooks/useStableCurrencyKey";
import { TimeRangeKey, TIME_RANGES } from "@/constants/timeRanges";
import CoinPageChartSkeleton from "@/components/skeletons/CoinPageChartSkeleton";

type Props = {
  coinId: string | undefined;
  timeRange: TimeRangeKey;
};

export function CoinPageChart({ coinId, timeRange }: Props) {
  const { currencySymbol } = useCurrency();

  //  USE STABLE CURRENCY HERE
  const stableCurrency = useStableCurrencyKey();

  const { data, isLoading } = useCoinChartQuery(
    coinId,
    stableCurrency,
    TIME_RANGES[timeRange],
  );

  const chartData = React.useMemo(() => {
    return (data?.prices ?? [])
      .slice()
      .sort((a, b) => a.timestamp - b.timestamp)
      .map((p) => ({
        timestamp: p.timestamp,
        price: p.price,
      }));
  }, [data]);

  const lastPrice = chartData.length
    ? chartData[chartData.length - 1].price
    : undefined;

  const formatDate = (value?: string | number) => {
    if (!value) return "";
    return new Date(Number(value)).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="h-[420px] flex items-center justify-center text-sm text-gray-400">
        <CoinPageChartSkeleton />
      </div>
    );
  }

  return (
    <div className="relative h-[420px] w-full rounded-2xl overflow-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData}>
          <Tooltip
            cursor={{
              stroke: "rgba(0,0,0,0.12)",
              strokeWidth: 1,
              strokeDasharray: "3 3",
            }}
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;

              const d = payload[0].payload;

              return (
                <div className="bg-white/95 backdrop-blur-md border border-black/10 px-3 py-2 text-xs rounded-lg shadow-lg">
                  <p className="text-gray-500">{formatDate(label as number)}</p>

                  <p className="font-semibold text-black mt-1">
                    {currencySymbol}
                    {Number(d.price).toLocaleString()}
                  </p>
                </div>
              );
            }}
          />

          <XAxis
            dataKey="timestamp"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 10, fill: "rgba(0,0,0,0.4)" }}
            minTickGap={40}
            tickFormatter={(v) =>
              new Date(v).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            }
          />

          <YAxis hide />

          <Area
            dataKey="price"
            type="monotone"
            stroke="#2563eb"
            strokeWidth={2}
            fill="rgba(37,99,235,0.08)"
            isAnimationActive
            animationDuration={500}
            dot={false}
            activeDot={{
              r: 5,
              fill: "#2563eb",
              strokeWidth: 0,
            }}
          />

          {lastPrice && (
            <ReferenceLine
              y={lastPrice}
              stroke="rgba(0,0,0,0.2)"
              strokeDasharray="3 3"
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
