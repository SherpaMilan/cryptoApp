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
  fromAmount,
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

  const fromPrices = from.data?.prices ?? [];
  const toPrices = to.data?.prices ?? [];

  const isLoading = from.isLoading || to.isLoading;
  const hasError = from.isError || to.isError;

  const chartData = React.useMemo(() => {
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
  }, [fromPrices, toPrices]);

  const latest = chartData[chartData.length - 1];

  return (
    <div className="flex-1 px-4 py-3 min-h-[280px] flex flex-col gap-3 backdrop-blur-xl bg-transparent">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <RatioIcon />

            <h2 className="text-sm font-medium text-gray-900 dark:text-white">
              {fromCoin?.symbol?.toUpperCase() || "—"}/
              {toCoin?.symbol?.toUpperCase() || "—"}
            </h2>
          </div>

          {fromAmount && latest && (
            <div className="text-xs font-bold p-2 text-gray-900 dark:text-white">
              1 {fromCoin?.symbol?.toUpperCase()} = {latest.ratio.toFixed(2)}{" "}
              {toCoin?.symbol?.toUpperCase()}
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
