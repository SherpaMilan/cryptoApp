"use client";

import Image from "next/image";
import { CaretDownIcon } from "@phosphor-icons/react";
import { Coin } from "@/types/coin";

type Props = {
  label: "From" | "To";
  openModal: () => void;
  isLoading?: boolean;
  selectedCoin: Coin | null;
};

export default function CurrencyCard({
  label,
  openModal,
  isLoading = false,
  selectedCoin,
}: Props) {
  return (
    <div className="relative bg-[var(--brand-white)] rounded-2xl p-5 h-[150px] flex flex-col">
      <p className="text-sm text-muted-foreground">{label}</p>

      <div className="flex items-center justify-between mt-8">
        <input
          type="text"
          placeholder="0.00"
          className="bg-transparent outline-none text-4xl font-medium w-full"
        />

        <button
          onClick={openModal}
          className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/60 border border-black/10"
        >
          {/* LEFT SIDE (coin display OR skeleton) */}
          <div className="flex items-center gap-2">
            {isLoading || !selectedCoin ? (
              <>
                <div className="w-5 h-5 rounded-full bg-gray-300 animate-pulse" />
                <div className="w-10 h-4 bg-gray-300 rounded animate-pulse" />
              </>
            ) : (
              <>
                {selectedCoin.image && (
                  <Image
                    src={selectedCoin.image}
                    alt={selectedCoin.name}
                    width={24}
                    height={24}
                  />
                )}

                <span className="text-sm font-semibold">
                  {selectedCoin.symbol.toUpperCase()}
                </span>
              </>
            )}
          </div>

          {/* ALWAYS VISIBLE */}
          <CaretDownIcon size={16} />
        </button>
      </div>
    </div>
  );
}
