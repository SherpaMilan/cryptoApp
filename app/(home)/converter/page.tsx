"use client";

import { useEffect, useState } from "react";

import { TimeRangeKey } from "@/constants/timeRanges";
import { useCurrency } from "@/context/currencyContext";
import { useCoinsPreviewQuery } from "@/hooks/useCoinsPreviewQuery";
import { useCoinStore } from "@/(home)/converter/store/useCoinStore";

import CurrencyCard from "./components/currencyCard";
import ChartPanel from "./components/chartPanel";
import CoinModal from "./components/coinModal";
import SwapIcon from "./components/swapIcon";

export default function Converter() {
  const [timeRange, setTimeRange] = useState<TimeRangeKey>("7D");
  const { defaultCurrency, isCurrencyLoaded } = useCurrency();
  const { data: coins = [], isLoading } = useCoinsPreviewQuery(
    defaultCurrency,
    isCurrencyLoaded,
  );

  // store
  const { fromCoin, toCoin, isModalOpen, openModal, closeModal } =
    useCoinStore();

  // default fallback coins

  const defaultFrom = coins[0] ?? null;
  const defaultTo = coins[1] ?? coins[0] ?? null;
  const activeFromCoin = fromCoin ?? defaultFrom;
  const activeToCoin = toCoin ?? defaultTo;

  // Esc key close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  return (
    <div className="w-full bg-background text-foreground">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[72px] py-6">
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">
            Binance Convert{" "}
            <span className="text-[var(--brand-purple)]">
              {activeFromCoin?.name?.toUpperCase()}
            </span>{" "}
            to{" "}
            <span className="text-[var(--brand-purple)]">
              {activeToCoin?.name?.toUpperCase()}
            </span>
          </h1>

          <p className="text-sm text-muted-foreground mt-2">
            Convert crypto assets instantly with live market rates
          </p>
        </div>
        <div className="flex lg:flex-row items-start gap-6">
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

          <ChartPanel
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            fromCoin={activeFromCoin}
            toCoin={activeToCoin}
          />
        </div>
      </div>

      <CoinModal isOpen={isModalOpen} onClose={closeModal} coins={coins} />
    </div>
  );
}
