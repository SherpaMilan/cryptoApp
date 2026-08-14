"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckIcon, TrashIcon, XIcon } from "@phosphor-icons/react";

import { usePortfolioStore } from "@/portfolio/store/usePortfolioStore";
import { useCoinsPreviewQuery } from "@/hooks/useCoinsPreviewQuery";
import { useCurrency } from "@/store/useCurrencyStore";

type Props = {
  coinIds: string[];
  onClose: () => void;
};

export default function RemoveCoinModal({ coinIds, onClose }: Props) {
  const [selectedCoins, setSelectedCoins] = useState<string[]>([]);
  const { currencyKey, isCurrencyLoaded } = useCurrency();
  const { data: coins = [] } = useCoinsPreviewQuery(
    currencyKey,
    isCurrencyLoaded,
  );

  const removeCoins = usePortfolioStore(
    (state) => state.removeCoinsFromCurrentPortfolio,
  );

  const portfolioCoins = coins.filter((coin) => coinIds.includes(coin.id));

  function toggleCoin(coinId: string) {
    setSelectedCoins((current) =>
      current.includes(coinId)
        ? current.filter((id) => id !== coinId)
        : [...current, coinId],
    );
  }

  function handleRemove() {
    if (selectedCoins.length === 0) return;

    removeCoins(selectedCoins);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 backdrop-blur-md">
      <div className="w-full max-w-md overflow-hidden rounded-[30px] border border-black/5 bg-white/90 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-neutral-900/90">
        <div className="flex items-start justify-between px-6 pb-4 pt-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Manage Assets</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Select coins you want to remove from your portfolio.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2  cursor-pointer text-muted-foreground transition hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10"
          >
            <XIcon size={18} />
          </button>
        </div>

        <div className="max-h-[380px] space-y-2 overflow-y-auto px-6 py-2">
          {portfolioCoins.map((coin) => {
            const selected = selectedCoins.includes(coin.id);

            return (
              <button
                key={coin.id}
                onClick={() => toggleCoin(coin.id)}
                className={`group flex w-full items-center cursor-pointer justify-between rounded-2xl border px-4 py-3.5 transition-all duration-200 ${
                  selected
                    ? "border-[var(--brand-purple)] bg-[var(--brand-purple)]/10 shadow-sm"
                    : "border-black/5 bg-white/50 hover:-translate-y-[1px] hover:bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full border transition ${
                        selected
                          ? "border-[var(--brand-purple)] bg-[var(--brand-purple)]/10"
                          : "border-black/5 bg-black/5 dark:border-white/10 dark:bg-white/10"
                      }`}
                    >
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                    </div>

                    {selected && (
                      <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--brand-purple)] text-white shadow">
                        <CheckIcon size={12} weight="bold" />
                      </div>
                    )}
                  </div>

                  <div className="text-left">
                    <p className="font-semibold">{coin.name}</p>

                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {coin.symbol}
                    </p>
                  </div>
                </div>

                {selected && (
                  <span className="text-xs font-semibold text-[var(--brand-purple)]">
                    Selected
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t border-black/5 px-6 py-5 dark:border-white/10">
          <p className="text-sm text-muted-foreground">
            {selectedCoins.length} selected
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-black/5 dark:hover:bg-white/10"
            >
              Cancel
            </button>

            <button
              disabled={selectedCoins.length === 0}
              onClick={handleRemove}
              className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <TrashIcon size={16} weight="bold" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
