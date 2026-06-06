"use client";

import Image from "next/image";
import { CaretDownIcon } from "@phosphor-icons/react";
import { Coin } from "@/types/coin";

type Props = {
  label: "From" | "To";
  openModal: () => void;
  selectedCoin: Coin | null;
  isLoading?: boolean;
  readOnly?: boolean;
  showSwap?: boolean;
};

export default function CurrencyCard({
  label,
  openModal,
  selectedCoin,
  isLoading = false,
  readOnly = false,
}: Props) {
  return (
    <div
      className="relative bg-[var(--brand-white)] rounded-2xl p-5 h-[150px] flex flex-col"
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
          onClick={openModal}
          className="
            flex items-center justify-between
            px-3 py-2
            rounded-xl
            bg-white/60
            border border-black/10
            shadow-sm
            backdrop-blur-md
            hover:bg-white/80
            hover:border-black/20
            transition-all duration-200
            shrink-0
            min-w-[100px]
            gap-3
          "
        >
          {isLoading || !selectedCoin ? (
            <div className="flex items-center gap-2 animate-pulse">
              <div className="w-5 h-5 rounded-full bg-gray-300" />
              <div className="w-10 h-4 bg-gray-300 rounded" />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <Image
                  src={selectedCoin.image}
                  alt={selectedCoin.name}
                  width={22}
                  height={22}
                  className="rounded-full"
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
