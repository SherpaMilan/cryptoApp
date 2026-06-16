"use client";

import Image from "next/image";
import { CaretDownIcon } from "@phosphor-icons/react";
import { Coin } from "@/types/coin";
import { useState } from "react";

type Props = {
  label: "From" | "To";
  openModal: () => void;
  isLoading?: boolean;
  selectedCoin: Coin | null;
  value: string;
  onChange?: (value: string) => void; //  optional
  readOnly?: boolean;
};

export default function CurrencyCard({
  label,
  openModal,
  selectedCoin,
  value,
  onChange,
  readOnly,
}: Props) {
  const DECIMAL_REGEX = /^\d*\.?\d*$/;
  const MAX_AMOUNT = 1_000_000;
  const [error, setError] = useState<string | null>(null);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly || !onChange) return;

    const input = e.target.value;

    // 1. allow only valid decimal format
    if (!DECIMAL_REGEX.test(input)) return;

    // 2. empty input allowed
    if (input === "") {
      setError(null);
      onChange("");
      return;
    }

    const num = Number(input);

    // 3. clamp max value (only show warning, don't force change)
    if (num > MAX_AMOUNT) {
      setError(
        `Maximum allowed is ${MAX_AMOUNT.toLocaleString()} ${selectedCoin?.symbol?.toUpperCase()}`,
      );
    } else {
      setError(null);
    }

    // 4. valid input
    onChange(input);
  };

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

      <div className="flex items-start justify-between mt-8 gap-4">
        <input
          value={value ?? ""}
          onChange={readOnly ? undefined : handleAmountChange}
          readOnly={readOnly}
          inputMode="decimal"
          type="text"
          placeholder="0.00"
          className="
            bg-transparent outline-none w-full
            text-2xl font-medium
            text-gray-900 dark:text-white
            placeholder:text-gray-400 dark:placeholder:text-gray-500
          "
        />

        <div className="flex flex-col items-end">
          <button
            onClick={openModal}
            className="
              flex items-center
              px-3 py-2 rounded-xl
              bg-black/5 dark:bg-white/10
              border border-black/10 dark:border-white/10
              hover:bg-black/10 dark:hover:bg-white/20
              transition
            "
          >
            <div className="flex items-center gap-2 pr-3">
              {selectedCoin?.image && (
                <Image
                  src={selectedCoin.image}
                  alt={selectedCoin.name}
                  width={24}
                  height={24}
                />
              )}

              <span className="text-sm font-bold text-gray-900 dark:text-white whitespace-nowrap">
                {selectedCoin?.symbol?.toUpperCase()}
              </span>
            </div>

            <CaretDownIcon
              size={16}
              className="ml-4 shrink-0 text-gray-500 dark:text-gray-300"
            />
          </button>

          {error && (
            <div className="mt-2 flex items-center justify-end whitespace-nowrap text-xs font-bold text-[var(--brand-red)]">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
