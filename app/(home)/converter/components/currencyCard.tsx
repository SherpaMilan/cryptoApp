"use client";

import { CaretDownIcon } from "@phosphor-icons/react";
import { Coin } from "@/types/coin";
import CoinImageFallback from "../utils/coinImageFallback";

type Props = {
  label: "From" | "To";
  openModal: () => void;
  isLoading?: boolean;
  readOnly?: boolean;
  showSwap?: boolean;
  selectedCoin: Coin | null;
  setActiveCoinSlot: (value: "from" | "to") => void;
};

export default function CurrencyCard({
  label,
  openModal,
  isLoading = false,
  readOnly = false,
  selectedCoin,
  setActiveCoinSlot,
}: Props) {
  return (
    <div
      className="relative bg-[var(--brand-white)] dark:bg-background rounded-2xl p-5 h-[150px] flex flex-col dark:border dark:border-border"
      aria-label={`${label} currency section`}
    >
      <p className="text-sm text-muted-foreground">{label}</p>

      <div className="flex items-center justify-between mt-8">
        <input
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          readOnly={readOnly}
          className="bg-transparent outline-none text-4xl font-medium placeholder:text-muted-foreground/50 w-full"
        />

        <button
          type="button"
          onClick={() => {
            setActiveCoinSlot(label.toLowerCase() as "from" | "to");
            openModal();
          }}
          className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/60 dark:bg-muted/30 border border-black/10 dark:border-border shadow-sm backdrop-blur-md hover:bg-white/80 dark:hover:bg-muted/50 hover:border-black/20 dark:hover:border-muted-foreground/30 transition-all duration-200 shrink-0 min-w-[100px] gap-3 cursor-pointer"
        >
          {isLoading || !selectedCoin ? (
            <div className="flex items-center gap-2 animate-pulse">
              <div className="w-5 h-5 rounded-full bg-gray-300 dark:bg-muted" />
              <div className="w-10 h-4 bg-gray-300 dark:bg-muted rounded" />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <CoinImageFallback
                  src={selectedCoin.image}
                  alt={selectedCoin.name}
                />

                <span className="text-sm font-semibold tracking-wide">
                  {selectedCoin.symbol.toUpperCase()}
                </span>
              </div>

              <CaretDownIcon size={16} className="text-muted-foreground/70" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
