"use client";

import { useEffect, useState } from "react";
import { TimeRangeKey } from "@/constants/timeRanges";
import ChartPanel from "./components/chartPanel";
import CoinModal from "./components/coinModal";
import { useCoinsPreviewQuery } from "@/hooks/useCoinsPreviewQuery";
import { useCurrency } from "@/context/currencyContext";
import CurrencyCard from "./components/currencyCard";
import SwapIcon from "./components/swapIcon";
import { useCoinStore } from "@/store/useCoinStore";

export default function Converter() {
  const [timeRange, setTimeRange] = useState<TimeRangeKey>("7D");

  const { defaultCurrency, isCurrencyLoaded } = useCurrency();

  const { data: coins = [], isLoading } = useCoinsPreviewQuery(
    defaultCurrency,
    isCurrencyLoaded,
  );

  // ✅ STORE
  const { fromCoin, toCoin, modalOpen, openModal, closeModal, setCoin } =
    useCoinStore();

  const defaultFrom = coins[0] ?? null;
  const defaultTo = coins[1] ?? coins[0] ?? null;

  const activeFromCoin = fromCoin ?? defaultFrom;
  const activeToCoin = toCoin ?? defaultTo;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeModal]);

  return (
    <div className="w-full bg-background text-foreground">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[72px] py-6">
        <div className="flex lg:flex-row items-start gap-6">
          {/* LEFT SIDE */}
          <div className="relative flex flex-col gap-4">
            <CurrencyCard
              label="From"
              openModal={() => openModal("from")}
              selectedCoin={activeFromCoin}
              isLoading={isLoading}
            />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <SwapIcon />
            </div>

            <CurrencyCard
              label="To"
              openModal={() => openModal("to")}
              selectedCoin={activeToCoin}
              isLoading={isLoading}
            />
          </div>

          {/* RIGHT SIDE */}
          <ChartPanel
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            fromCoin={activeFromCoin}
            toCoin={activeToCoin}
          />
        </div>
      </div>

      {/* MODAL CONTROLLED BY STORE */}
      <CoinModal
        open={modalOpen}
        setOpen={closeModal}
        coins={coins}
        onSelectCoin={setCoin}
      />
    </div>
  );
}
