"use client";

import Image from "next/image";

import { Coin } from "@/types/coin";
import { PlusIcon } from "@phosphor-icons/react";

type Props = {
  coins: Coin[];
  previewCoinId: string;
  selectedCoinIds: string[];
  onPreviewCoin: (coin: Coin) => void;
  onToggleCoin: (coinId: string) => void;
};

export default function CoinListPanel({
  coins,
  previewCoinId,
  selectedCoinIds,
  onPreviewCoin,
  onToggleCoin,
}: Props) {
  return (
    <div className="flex min-h-0 flex-col border-b border-black/10 p-7 dark:border-white/10 lg:border-b-0 lg:border-r">
      <div className="mt-2 min-h-0 flex-1 space-y-1.5 overflow-y-auto pr-2">
        {coins.map((coin) => {
          const isSelected = selectedCoinIds.includes(coin.id);
          const isPreviewed = previewCoinId === coin.id;

          return (
            <div
              key={coin.id}
              onMouseEnter={() => onPreviewCoin(coin)}
              className={`group flex cursor-pointer items-center justify-between rounded-2xl px-3 py-2.5 transition-all duration-200 ${
                isPreviewed
                  ? "bg-[var(--brand-purple)]/[0.08] shadow-[inset_3px_0_0_var(--brand-purple)]"
                  : "hover:bg-black/[0.025] dark:hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm dark:bg-white/[0.08]">
                  <Image
                    src={coin.image}
                    alt={coin.name}
                    width={26}
                    height={26}
                    className="h-[26px] w-[26px] rounded-full object-contain"
                  />
                </div>

                <div className="flex min-w-0 items-center gap-2">
                  <p className="truncate text-sm font-semibold">{coin.name}</p>

                  <span className="shrink-0 text-xs font-semibold uppercase text-muted-foreground">
                    {coin.symbol}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onToggleCoin(coin.id)}
                className={`flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full transition-all duration-200 ${
                  isSelected
                    ? "bg-[var(--brand-purple)]/10"
                    : "text-[var(--brand-purple)] hover:bg-[var(--brand-purple)]/10"
                }`}
              >
                {isSelected ? (
                  <Image
                    src="/images/selectedCoin.png"
                    alt="Selected"
                    width={26}
                    height={26}
                    className="h-[26px] w-[26px] object-contain"
                  />
                ) : (
                  <PlusIcon size={17} weight="bold" />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
