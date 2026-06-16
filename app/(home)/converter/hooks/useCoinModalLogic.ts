"use client";

import { useEffect, useMemo, useState } from "react";
import { Coin } from "@/types/coin";
import { SearchCoin } from "@/types/searchCoin";

import useDebounce from "@/hooks/useDebounce";
import { useCoinSearchQuery } from "@/hooks/useCoinSearchQuery";
import { mapSearchCoinToCoin } from "../utils/mapSearchCoinToCoin";
import { useCoinStore } from "../store/useCoinStore";

type ViewMode = "all" | "watchlist" | "recent";

export function useCoinModalLogic(coins: Coin[]) {
  const [searchCoin, setSearchCoin] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("all");

  // wait for user to stop typing before triggering search logic
  const debouncedSearch = useDebounce(searchCoin, 300);

  const recentCoins = useCoinStore((s) => s.recentCoins);
  const setCoin = useCoinStore((s) => s.setCoin);

  const [watchlist, setWatchlist] = useState<string[]>(() => {
    //ssr saftey check
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("watchlist") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const isSearching = debouncedSearch.trim().length >= 3;
  const { data: remoteCoins = [] } = useCoinSearchQuery(
    isSearching ? debouncedSearch : "",
  );

  // convert api response into internal coin format
  const remoteAsCoins: Coin[] = useMemo(() => {
    return remoteCoins.map((c: SearchCoin) => mapSearchCoinToCoin(c));
  }, [remoteCoins]);

  const coinsToRender = useMemo(() => {
    // search mode always overrides tabs
    if (isSearching) {
      return remoteAsCoins.length > 0
        ? remoteAsCoins
        : coins.filter(
            (coin) =>
              coin.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
              coin.symbol.toLowerCase().includes(debouncedSearch.toLowerCase()),
          );
    }

    if (viewMode === "watchlist") {
      return coins.filter((coin) => watchlist.includes(coin.id));
    }

    if (viewMode === "recent") {
      return recentCoins;
    }

    // default view (all coins)
    return coins;
  }, [
    isSearching,
    remoteAsCoins,
    coins,
    debouncedSearch,
    viewMode,
    watchlist,
    recentCoins,
  ]);

  return {
    searchCoin,
    setSearchCoin,
    viewMode,
    setViewMode,
    watchlist,
    setWatchlist,
    coinsToRender,
    setCoin,
    isSearching,
  };
}
