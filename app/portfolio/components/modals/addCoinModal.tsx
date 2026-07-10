"use client";

import { useState } from "react";
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";

import CoinListPanel from "./coinListPanel";
import CoinPreviewPanel from "./coinPreviewPanel";
import CoinModalFooter from "./coinModalFooter";
import CoinFilterTabs from "./coinFilterTabs";
import PortfolioCoinModalSkeleton from "@/portfolio/skeletons/portfolioCoinModalSkeleton";

import { useCurrency } from "@/store/useCurrencyStore";
import { useCoinsPreviewQuery } from "@/hooks/useCoinsPreviewQuery";
import { useCoinDetailQuery } from "@/hooks/useCoinDetailQuery";
import { usePortfolioStore } from "@/portfolio/store/usePortfolioStore";

type Props = {
  onClose: () => void;
};
type CoinFilter = "top" | "gainers" | "losers";

export default function AddCoinModal({ onClose }: Props) {
  const [search, setSearch] = useState("");
  const [previewedCoinId, setPreviewedCoinId] = useState<string | null>(null);
  const [selectedCoinIds, setSelectedCoinIds] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<CoinFilter>("top");
  const { defaultCurrency, currencyKey, currencySymbol, isCurrencyLoaded } =
    useCurrency();

  const {
    data: coins = [],
    isLoading,
    isError,
  } = useCoinsPreviewQuery(defaultCurrency, isCurrencyLoaded);

  const displayedCoins = coins
    .filter((coin) => {
      const searchValue = search.toLowerCase().trim();

      return (
        coin.name.toLowerCase().includes(searchValue) ||
        coin.symbol.toLowerCase().includes(searchValue)
      );
    })
    .sort((a, b) => {
      if (activeFilter === "losers") {
        return (
          (a.price_change_percentage_24h_in_currency ?? Infinity) -
          (b.price_change_percentage_24h_in_currency ?? Infinity)
        );
      }
      if (activeFilter === "gainers") {
        return (
          (b.price_change_percentage_24h_in_currency ?? -Infinity) -
          (a.price_change_percentage_24h_in_currency ?? -Infinity)
        );
      }

      return 0;
    });
  const noMatchingCoins =
    search.trim().length > 0 && displayedCoins.length === 0;

  const coinBeingPreviewed =
    displayedCoins.find((coin) => coin.id === previewedCoinId) ??
    displayedCoins[0];

  const { data: coinDetail } = useCoinDetailQuery(coinBeingPreviewed?.id ?? "");

  function handleCoinSelection(coinId: string) {
    setSelectedCoinIds((selectedCoins) =>
      selectedCoins.includes(coinId)
        ? selectedCoins.filter((id) => id !== coinId)
        : [...selectedCoins, coinId],
    );
  }
  const addCoinsToPortfolio = usePortfolioStore(
    (state) => state.addCoinsToCurrentPortfolio,
  );

  function handleAddCoins() {
    const coinsToAdd = coins.filter((coin) =>
      selectedCoinIds.includes(coin.id),
    );

    addCoinsToPortfolio(coinsToAdd);
    onClose();
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
              className="flex h-10 w-10  cursor-pointer items-center justify-center rounded-full bg-black/[0.04] text-muted-foreground transition hover:bg-black/[0.08] hover:text-foreground dark:bg-white/[0.06]"
            >
              <XIcon size={20} />
            </button>
          </div>

          <div className="relative overflow-hidden rounded-[22px] bg-[var(--brand-purple)]/[0.04]">
            <MagnifyingGlassIcon
              size={18}
              className="absolute top-1/2 left-5 -translate-y-1/2 text-[var(--brand-purple)]"
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or symbol..."
              className="h-14 w-full bg-transparent pr-4 pl-14 text-sm font-medium outline-none"
            />
          </div>

          <CoinFilterTabs
            coinCount={coins.length}
            activeFilter={activeFilter}
            onChangeFilter={setActiveFilter}
          />
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[50%_50%]">
          {isLoading ? (
            <PortfolioCoinModalSkeleton />
          ) : isError ? (
            <div className="col-span-full flex items-center justify-center p-10 text-sm text-muted-foreground">
              Could not load coins. Please try again.
            </div>
          ) : noMatchingCoins ? (
            <div className="col-span-full flex flex-col items-center justify-center p-12 text-center">
              <p className="text-base font-semibold text-foreground">
                No coins found
              </p>

              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                “{search}” is not available in the current coin list. Try
                another name or symbol.
              </p>
            </div>
          ) : (
            <>
              <CoinListPanel
                coins={displayedCoins}
                previewCoinId={coinBeingPreviewed?.id ?? ""}
                selectedCoinIds={selectedCoinIds}
                onPreviewCoin={(coin) => setPreviewedCoinId(coin.id)}
                onToggleCoin={handleCoinSelection}
              />

              {coinBeingPreviewed && (
                <CoinPreviewPanel
                  coin={coinBeingPreviewed}
                  description={coinDetail?.description.en}
                  currencyKey={currencyKey}
                  currencySymbol={currencySymbol}
                />
              )}
            </>
          )}
        </div>

        <CoinModalFooter
          selectedCount={selectedCoinIds.length}
          onAddCoins={handleAddCoins}
        />
      </div>
    </div>
  );
}
