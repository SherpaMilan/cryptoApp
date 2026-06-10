"use client";

import { useEffect, useState } from "react";
import { TimeRangeKey } from "@/constants/timeRanges";
import ChartPanel from "./components/chartPanel";
import CoinModal from "./components/coinModal";
import { useCoinsPreviewQuery } from "@/hooks/useCoinsPreviewQuery";
import { useCurrency } from "@/context/currencyContext";
import CurrencyCard from "./components/currencyCard";
import SwapIcon from "./components/swapIcon";
import { Coin } from "@/types/coin";

export default function Converter() {
  const [open, setOpen] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeRangeKey>("7D");

  const { defaultCurrency, isCurrencyLoaded } = useCurrency();

  const { data: coins = [], isLoading } = useCoinsPreviewQuery(
    defaultCurrency,
    isCurrencyLoaded,
  );

  const [fromCoin, setFromCoin] = useState<Coin | null>(null);
  const [toCoin, setToCoin] = useState<Coin | null>(null);

  const [activeCoinSlot, setActiveCoinSlot] = useState<"from" | "to" | null>(
    null,
  );

  const defaultFrom = coins[0] ?? null;
  const defaultTo = coins[1] ?? coins[0] ?? null;

  // ESC close modal
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // coin selection handler
  const handleCoinSelect = (coin: Coin) => {
    if (activeCoinSlot === "from") {
      setFromCoin(coin);
    }

    if (activeCoinSlot === "to") {
      setToCoin(coin);
    }

    setOpen(false);
    setActiveCoinSlot(null);
  };

  return (
    <div className="w-full bg-background text-foreground">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[72px] py-6">
        <div className="flex lg:flex-row items-start gap-6">
          <div className="relative flex flex-col gap-4">
            <CurrencyCard
              label="From"
              openModal={() => setOpen(true)}
              selectedCoin={fromCoin ?? defaultFrom}
              isLoading={isLoading}
              setActiveCoinSlot={setActiveCoinSlot}
            />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <SwapIcon />
            </div>

            <CurrencyCard
              label="To"
              openModal={() => setOpen(true)}
              selectedCoin={toCoin ?? defaultTo}
              isLoading={isLoading}
              setActiveCoinSlot={setActiveCoinSlot}
            />
          </div>

          <ChartPanel
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            fromCoin={fromCoin ?? defaultFrom}
            toCoin={toCoin ?? defaultTo}
          />
        </div>
      </div>

      <CoinModal
        open={open}
        setOpen={setOpen}
        coins={coins}
        onSelectCoin={handleCoinSelect}
      />
    </div>
  );
}
