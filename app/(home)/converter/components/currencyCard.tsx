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
    <div
      className="
        relative rounded-2xl p-5 h-[150px] flex flex-col
        bg-white/80 dark:bg-zinc-900/70
        border border-black/5 dark:border-white/10
        backdrop-blur-md
      "
    >
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>

      <div className="flex items-center justify-between mt-8">
        <input
          type="text"
          placeholder="0.00"
          className="
            bg-transparent outline-none w-full
            text-2xl font-medium
            text-gray-900 dark:text-white
            placeholder:text-gray-400 dark:placeholder:text-gray-500
          "
        />

        <button
          onClick={openModal}
          className="
            flex items-center gap-3 px-3 py-2 rounded-xl
            bg-black/5 dark:bg-white/10
            border border-black/10 dark:border-white/10
            hover:bg-black/10 dark:hover:bg-white/20
            transition
          "
        >
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

                <span className="text-sm font-semibold text-gray-800 dark:text-white">
                  {selectedCoin.symbol.toUpperCase()}
                </span>
              </>
            )}
          </div>

          <CaretDownIcon
            size={16}
            className="text-gray-500 dark:text-gray-300"
          />
        </button>
      </div>
    </div>
  );
}
