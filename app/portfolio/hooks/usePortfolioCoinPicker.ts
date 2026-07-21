"use client";

import { useMemo, useState } from "react";

import { Coin } from "@/types/coin";
import { useCurrency } from "@/store/useCurrencyStore";
import { useCoinsPreviewQuery } from "@/hooks/useCoinsPreviewQuery";
import { useCoinDetailQuery } from "@/hooks/useCoinDetailQuery";

export function usePortfolioCoinPicker() {
  const [search, setSearch] = useState("");

  // Currently previewed coin in right panel
  const [previewCoinId, setPreviewCoinId] = useState<string | null>(null);

  // Coins selected to add to portfolio
  const [selectedCoinIds, setSelectedCoinIds] = useState<string[]>([]);

  // User's preferred currency
  const { defaultCurrency, isCurrencyLoaded } = useCurrency();

  // Initial coin list shown when modal opens
  const {
    data: previewCoins = [],
    isLoading,
    isError,
  } = useCoinsPreviewQuery(defaultCurrency, isCurrencyLoaded);

  // Filter visible coins from search input
  const visibleCoins = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    if (!searchValue) return previewCoins;

    return previewCoins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchValue) ||
        coin.symbol.toLowerCase().includes(searchValue),
    );
  }, [previewCoins, search]);

  // Active coin for preview panel
  const activeCoinId = previewCoinId ?? visibleCoins[0]?.id ?? null;

  // Fallback to first visible coin
  const activeCoin =
    visibleCoins.find((coin) => coin.id === activeCoinId) ?? visibleCoins[0];

  // Extra coin details (description, links, etc.)
  const { data: coinDetail, isLoading: isDetailLoading } = useCoinDetailQuery(
    activeCoinId ?? "",
  );

  // Add/remove coin selection
  function toggleCoin(coinId: string) {
    setSelectedCoinIds((current) =>
      current.includes(coinId)
        ? current.filter((id) => id !== coinId)
        : [...current, coinId],
    );
  }

  // Update preview panel coin
  function previewCoin(coin: Coin) {
    setPreviewCoinId(coin.id);
  }

  return {
    search,
    setSearch,

    visibleCoins,
    activeCoin,
    activeCoinId,

    coinDetail,
    isDetailLoading,

    selectedCoinIds,
    toggleCoin,
    previewCoin,

    isLoading,
    isError,
  };
}
