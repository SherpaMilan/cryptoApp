"use client";

import { useState } from "react";
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";

import CoinListPanel from "./coinListPanel";
import CoinPreviewPanel from "./coinPreviewPanel";
import CoinModalFooter from "./coinModalFooter";
import PortfolioCoinModalSkeleton from "@/portfolio/skeletons/portfolioCoinModalSkeleton";

import { useCurrency } from "@/store/useCurrencyStore";
import { useCoinsPreviewQuery } from "@/hooks/useCoinsPreviewQuery";
import { useCoinDetailQuery } from "@/hooks/useCoinDetailQuery";
import CoinFilterTabs from "./coinFilterTabs";

type Props = {
  onClose: () => void;
};

export default function AddCoinModal({ onClose }: Props) {
  const [search, setSearch] = useState("");
  const [previewCoinId, setPreviewCoinId] = useState<string | null>(null);
  const [selectedCoinIds, setSelectedCoinIds] = useState<string[]>([]);

  const { defaultCurrency, isCurrencyLoaded } = useCurrency();

  const {
    data: previewCoins = [],
    isLoading,
    isError,
  } = useCoinsPreviewQuery(defaultCurrency, isCurrencyLoaded);

  const visibleCoins = previewCoins.filter((coin) => {
    const searchValue = search.toLowerCase().trim();

    return (
      coin.name.toLowerCase().includes(searchValue) ||
      coin.symbol.toLowerCase().includes(searchValue)
    );
  });

  const activeCoinId = previewCoinId ?? visibleCoins[0]?.id ?? null;

  const activeCoin =
    visibleCoins.find((coin) => coin.id === activeCoinId) ?? visibleCoins[0];

  const { data: coinDetail } = useCoinDetailQuery(activeCoinId ?? "");

  function toggleCoin(coinId: string) {
    setSelectedCoinIds((current) =>
      current.includes(coinId)
        ? current.filter((id) => id !== coinId)
        : [...current, coinId],
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-6 backdrop-blur-sm">
      <div className="flex max-h-[94vh] w-full max-w-[1000px] flex-col overflow-hidden rounded-[30px] border border-black/10 bg-background shadow-[0_30px_120px_rgba(0,0,0,0.35)] dark:border-white/10">
        <div className="border-b border-black/10 px-7 pt-6 pb-4 dark:border-white/10">
          <div className="flex items-start justify-between">
            <h2 className="mt-2 text-2xl font-bold tracking-tight">
              Add Coins
            </h2>

            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/[0.04] text-muted-foreground transition hover:bg-black/[0.08] hover:text-foreground dark:bg-white/[0.06]"
            >
              <XIcon size={20} />
            </button>
          </div>

          <div className="relative overflow-hidden rounded-[22px] bg-[var(--brand-purple)]/[0.04]">
            <MagnifyingGlassIcon
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--brand-purple)]"
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or symbol..."
              className="h-14 w-full bg-transparent pl-14 pr-4 text-sm font-medium outline-none"
            />
          </div>

          <CoinFilterTabs />
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[0.92fr_1.08fr]">
          {isLoading ? (
            <PortfolioCoinModalSkeleton />
          ) : isError ? (
            <div className="col-span-full flex items-center justify-center p-10 text-sm text-muted-foreground">
              Could not load coins. Please try again.
            </div>
          ) : (
            <>
              <CoinListPanel
                coins={visibleCoins}
                previewCoinId={activeCoinId ?? ""}
                selectedCoinIds={selectedCoinIds}
                onPreviewCoin={(coin) => setPreviewCoinId(coin.id)}
                onToggleCoin={toggleCoin}
              />

              {activeCoin && (
                <CoinPreviewPanel
                  coin={{
                    ...activeCoin,
                    description: coinDetail?.description,
                  }}
                />
              )}
            </>
          )}
        </div>

        <CoinModalFooter selectedCount={selectedCoinIds.length} />
      </div>
    </div>
  );
}
