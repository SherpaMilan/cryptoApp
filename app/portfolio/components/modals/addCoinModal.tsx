"use client";

import { useMemo, useState } from "react";
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";

import CoinListPanel from "./coinListPanel";
import CoinPreviewPanel from "./coinPreviewPanel";
import CoinModalFooter from "./coinModalFooter";
import PortfolioCoinModalSkeleton from "@/portfolio/skeletons/portfolioCoinModalSkeleton";

import { useCurrency } from "@/store/useCurrencyStore";
import { useCoinsPreviewQuery } from "@/hooks/useCoinsPreviewQuery";
import { useCoinDetailQuery } from "@/hooks/useCoinDetailQuery";
import { usePortfolioStore } from "@/portfolio/store/usePortfolioStore";
import { useCoinSearchQuery } from "@/hooks/useCoinSearchQuery";
import { MIN_SEARCH_LENGTH } from "@/constants/search";
import CoinFilterTabs, { type CoinFilter } from "./coinFilterTabs";

type Props = {
  onClose: () => void;
};
const EMPTY_COIN_IDS: string[] = [];

export default function AddCoinModal({ onClose }: Props) {
  const [search, setSearch] = useState("");
  const [previewedCoinId, setPreviewedCoinId] = useState<string | null>(null);
  const [selectedCoinIds, setSelectedCoinIds] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<CoinFilter>("top");

  const { defaultCurrency, currencyKey, currencySymbol, isCurrencyLoaded } =
    useCurrency();

  const recentlyAddedCoinIds = usePortfolioStore(
    (state) => state.currentPortfolio?.recentlyAddedCoinIds ?? EMPTY_COIN_IDS,
  );

  const {
    data: topCoins = [],
    isLoading: isLoadingTopCoins,
    isError: isTopCoinsError,
  } = useCoinsPreviewQuery(defaultCurrency, isCurrencyLoaded);

  const {
    data: searchResults = [],
    isLoading: isLoadingSearch,
    isError: isSearchError,
  } = useCoinSearchQuery(search);

  const searchedCoinIds = searchResults.map((coin) => coin.id);

  const {
    data: searchedCoins = [],
    isLoading: isLoadingSearchedCoins,
    isError: isSearchedCoinsError,
  } = useCoinsPreviewQuery(
    defaultCurrency,
    isCurrencyLoaded && searchedCoinIds.length > 0,
    searchedCoinIds,
  );

  const {
    data: recentlyAddedCoins = [],
    isLoading: isLoadingRecentlyAdded,
    isError: isRecentlyAddedError,
  } = useCoinsPreviewQuery(
    defaultCurrency,
    isCurrencyLoaded && recentlyAddedCoinIds.length > 0,
    recentlyAddedCoinIds,
  );

  const isSearching = search.trim().length > MIN_SEARCH_LENGTH;

  const displayedCoins = useMemo(() => {
    if (isSearching) return searchedCoins;

    if (activeFilter === "recentlyAdded") {
      return recentlyAddedCoins;
    }

    return [...topCoins].sort((a, b) => {
      const aChange = a.price_change_percentage_24h_in_currency ?? 0;
      const bChange = b.price_change_percentage_24h_in_currency ?? 0;

      if (activeFilter === "losers") {
        return aChange - bChange;
      }

      if (activeFilter === "gainers") {
        return bChange - aChange;
      }

      return 0;
    });
  }, [topCoins, searchedCoins, recentlyAddedCoins, isSearching, activeFilter]);

  const coinBeingPreviewed =
    displayedCoins.find((coin) => coin.id === previewedCoinId) ??
    displayedCoins[0];

  const { data: coinDetail } = useCoinDetailQuery(coinBeingPreviewed?.id ?? "");

  const isLoading = isSearching
    ? isLoadingSearch || isLoadingSearchedCoins
    : activeFilter === "recentlyAdded"
      ? isLoadingRecentlyAdded
      : isLoadingTopCoins;

  const hasError = isSearching
    ? isSearchError || isSearchedCoinsError
    : activeFilter === "recentlyAdded"
      ? isRecentlyAddedError
      : isTopCoinsError;

  const noMatchingCoins =
    isSearching && !isLoadingSearch && searchResults.length === 0;

  function handleCoinSelection(coinId: string) {
    setSelectedCoinIds((selected) =>
      selected.includes(coinId)
        ? selected.filter((id) => id !== coinId)
        : [...selected, coinId],
    );
  }

  const addCoinsToPortfolio = usePortfolioStore(
    (state) => state.addCoinsToCurrentPortfolio,
  );

  function handleAddCoins() {
    addCoinsToPortfolio(selectedCoinIds);
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
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/[0.04] text-muted-foreground transition hover:bg-black/[0.08] hover:text-foreground dark:bg-white/[0.06]"
            >
              <XIcon size={20} />
            </button>
          </div>

          <div className="relative mt-4 overflow-hidden rounded-[22px] bg-[var(--brand-purple)]/[0.04]">
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

          {!isSearching && (
            <CoinFilterTabs
              coinCount={topCoins.length}
              activeFilter={activeFilter}
              onChangeFilter={setActiveFilter}
            />
          )}
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[50%_50%]">
          {isLoading ? (
            <PortfolioCoinModalSkeleton />
          ) : hasError ? (
            <div className="col-span-full flex items-center justify-center p-10 text-sm text-muted-foreground">
              {isSearching
                ? "Could not search coins. Please try again."
                : "Could not load coins. Please try again."}
            </div>
          ) : noMatchingCoins ? (
            <div className="col-span-full flex flex-col items-center justify-center p-12 text-center">
              <p className="text-base font-semibold text-foreground">
                No coins found
              </p>

              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                “{search}” is not available. Try another name or symbol.
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
                  description={coinDetail?.description?.en}
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
