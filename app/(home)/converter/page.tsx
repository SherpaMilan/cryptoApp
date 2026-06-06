"use client";

import { useEffect, useState } from "react";
import { TimeRangeKey } from "@/constants/timeRanges";
import ChartPanel from "./chartPanel";
import CoinModal from "./coinModal";
import { useCoinsPreviewQuery } from "@/hooks/useCoinsPreviewQuery";
import { useCurrency } from "@/context/currencyContext";
import CurrencyCard from "./currencyCard";
import SwapIcon from "./swapIcon";

export default function Converter() {
  const [open, setOpen] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeRangeKey>("7D");
  const { defaultCurrency, isCurrencyLoaded } = useCurrency();

  const { data: coins = [], isLoading } = useCoinsPreviewQuery(
    defaultCurrency,
    isCurrencyLoaded,
  );

  const fromCoin = coins.find((c) => c.symbol === "BTC") || coins[0] || null;
  const toCoin = coins.find((c) => c.symbol === "ETH") || coins[1] || null;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="w-full bg-background text-foreground">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[72px] py-6">
        <div className="flex lg:flex-row items-start gap-6">
          <div className="relative flex flex-col gap-4">
            {/* FROM */}
            <CurrencyCard
              label="From"
              openModal={() => setOpen(true)}
              selectedCoin={fromCoin}
              isLoading={isLoading}
            />

            {/* SWAP */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <SwapIcon />
            </div>

            {/* TO */}
            <CurrencyCard
              label="To"
              openModal={() => setOpen(true)}
              selectedCoin={toCoin}
              isLoading={isLoading}
            />
          </div>

          <ChartPanel timeRange={timeRange} setTimeRange={setTimeRange} />
        </div>
      </div>

      <CoinModal open={open} setOpen={setOpen} coins={coins} />
    </div>
  );
}
