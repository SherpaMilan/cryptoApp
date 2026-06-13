"use client";

import { useEffect, useState } from "react";

import { TimeRangeKey } from "@/constants/timeRanges";
import { useCoinStore } from "@/(home)/converter/store/useCoinStore";

import CurrencyCard from "./components/currencyCard";
import ChartPanel from "./components/chartPanel";
import CoinModal from "./components/coinModal";
import SwapIcon from "./components/swapIcon";
import { useCoinsPreviewQuery } from "@/hooks/useCoinsPreviewQuery";
import { useCurrency } from "@/context/currencyContext";

export default function Converter() {
  const [timeRange, setTimeRange] = useState<TimeRangeKey>("1Y");
  const { defaultCurrency, isCurrencyLoaded } = useCurrency();
  const { data: coins = [] } = useCoinsPreviewQuery(
    defaultCurrency,
    isCurrencyLoaded,
  );
  // store
  const { fromCoin, toCoin, isModalOpen, openModal, closeModal, swapCoins } =
    useCoinStore();

  // default fallback coins
  const defaultFrom = coins[0] ?? null;
  const defaultTo = coins[1] ?? coins[0] ?? null;
  const activeFromCoin = fromCoin ?? defaultFrom;
  const activeToCoin = toCoin ?? defaultTo;

  const [fromAmount, setFromAmount] = useState<string>("");

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

  const isSameCoin = activeFromCoin?.id === activeToCoin?.id;
  const getCoinPrice = (id?: string) =>
    coins.find((c) => c.id === id)?.current_price ?? 0;

  //  (currency-aware)
  const fromPrice = getCoinPrice(activeFromCoin?.id);
  const toPrice = getCoinPrice(activeToCoin?.id);

  const rate = toPrice > 0 ? fromPrice / toPrice : 0;

  const computedToAmount =
    fromAmount && rate && !isSameCoin
      ? (Number(fromAmount) * rate).toFixed(6)
      : "";

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
              value={fromAmount}
              onChange={setFromAmount}
            />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <SwapIcon onClick={swapCoins} />
            </div>

            <CurrencyCard
              label="To"
              openModal={() => openModal("to")}
              selectedCoin={activeToCoin}
              value={computedToAmount}
              readOnly
            />
          </div>

          <ChartPanel
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            fromCoin={activeFromCoin}
            toCoin={activeToCoin}
            fromAmount={fromAmount}
          />
        </div>
      </div>

      <CoinModal isOpen={isModalOpen} onClose={closeModal} coins={coins} />
    </div>
  );
}
