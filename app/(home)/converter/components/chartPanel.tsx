"use client";

import React from "react";

import { TIME_RANGES, TimeRangeKey } from "@/constants/timeRanges";
import TimeRangeSelector from "@/components/coinPage/TimeRangeSelector";
import RatioIcon from "./ratioIcon";
import { Coin } from "@/types/coin";
import { useCoinChartQuery } from "@/hooks/useCoinChartQuery";
import { useStableCurrencyKey } from "@/hooks/useStableCurrencyKey";

import RatioChart from "./ratioChart";

type Props = {
  timeRange: TimeRangeKey;
  setTimeRange: (v: TimeRangeKey) => void;
  fromCoin: Coin | null;
  toCoin: Coin | null;
  fromAmount: string;
};

export default function ChartPanel({
  timeRange,
  setTimeRange,
  fromCoin,
  toCoin,
}: Props) {
  const stableCurrency = useStableCurrencyKey();

  const fromId = fromCoin?.id;
  const toId = toCoin?.id;

  const isReady = !!fromId && !!toId && !!stableCurrency;

  //  IMPORTANT: only stable inputs
  const from = useCoinChartQuery(
    isReady ? fromId : undefined,
    stableCurrency,
    TIME_RANGES[timeRange],
  );

  const to = useCoinChartQuery(
    isReady ? toId : undefined,
    stableCurrency,
    TIME_RANGES[timeRange],
  );

  const isLoading = from.isLoading || to.isLoading;
  const hasError = from.isError || to.isError;

  const chartData = React.useMemo(() => {
    const fromPrices = from.data?.prices ?? [];
    const toPrices = to.data?.prices ?? [];

    if (!fromPrices.length || !toPrices.length) return [];

    const toMap = new Map<number, number>();

    for (const item of toPrices) {
      toMap.set(item.timestamp, item.price);
    }

    const result: { timestamp: number; ratio: number }[] = [];

    for (const item of fromPrices) {
      const toPrice = toMap.get(item.timestamp);
      if (!toPrice) continue;

      result.push({
        timestamp: item.timestamp,
        ratio: item.price / toPrice,
      });
    }

    return result;
  }, [from.data?.prices, to.data?.prices]);

  const latest = chartData[chartData.length - 1];

  return (
    <div className="flex-1 px-4 py-3 min-h-[280px] flex flex-col gap-3 backdrop-blur-xl bg-transparent">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <RatioIcon />
            <h2 className="text-xl font-bold tracking-tight">
              <span className="text-gray-900 dark:text-white">
                {fromCoin?.symbol?.toUpperCase() || "—"}
              </span>
              <span className="mx-1 text-[var(--brand-purple)]">/</span>
              <span className="text-gray-500 dark:text-gray-400">
                {toCoin?.symbol?.toUpperCase() || "—"}
              </span>
            </h2>
          </div>
          {latest && (
            <div className="inline-flex items-center gap-1.5 rounded-md border border-black/10 dark:border-white/10 px-2 py-1 bg-white/5">
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Exchange Rate
              </span>

              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                1 {fromCoin?.symbol?.toUpperCase()} =
                <span className="ml-1 text-sm font-bold text-[var(--brand-purple)]">
                  {latest.ratio.toFixed(4)}
                </span>{" "}
                <span className="text-gray-500 dark:text-gray-400">
                  {toCoin?.symbol?.toUpperCase()}
                </span>
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center">
          <TimeRangeSelector
            ranges={Object.keys(TIME_RANGES)}
            selected={timeRange}
            onChange={setTimeRange}
          />
        </div>
      </div>

      <div className="h-[260px] w-full">
        {!isReady ? (
          <div className="h-full flex items-center justify-center text-sm text-gray-400">
            Loading currency data...
          </div>
        ) : isLoading ? (
          <div className="h-full flex items-center justify-center text-sm text-gray-400">
            Loading chart...
          </div>
        ) : hasError ? (
          <div className="h-full flex flex-col items-center justify-center text-sm text-red-500 gap-2">
            <p>Failed to load chart data</p>
            <p className="text-xs text-gray-400">Please try again later</p>
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-gray-400">
            No chart data available
          </div>
        ) : (
          <RatioChart
            data={chartData}
            fromSymbol={fromCoin?.symbol}
            toSymbol={toCoin?.symbol}
          />
        )}
      </div>
    </div>
  );
}
