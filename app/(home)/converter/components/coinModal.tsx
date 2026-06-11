"use client";

import { useEffect, useMemo, useState } from "react";
import { Coin } from "@/types/coin";
import Image from "next/image";
import { StarIcon } from "@phosphor-icons/react";
import CoinFilterTabs from "./coinFilterTabs";
import useDebounce from "@/hooks/useDebounce";
import { useCoinSearchQuery } from "@/hooks/useCoinSearchQuery";
import { SearchCoin } from "@/types/searchCoin";
import { mapSearchCoinToCoin } from "../utils/mapSearchCoinToCoin";

export default function CoinModal({
  open,
  setOpen,
  coins,
  onSelectCoin,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  coins: Coin[];
  onSelectCoin: (coin: Coin) => void;
}) {
  const [searchCoin, setSearchCoin] = useState("");
  const [viewMode, setViewMode] = useState<"all" | "watchlist">("all");

  const [watchlist, setWatchlist] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("watchlist") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const debouncedSearch = useDebounce(searchCoin, 300);

  // ----------------------------
  // 1. LOCAL FILTER (Coin only)
  // ----------------------------
  const localFiltered = useMemo(() => {
    const q = searchCoin.toLowerCase();

    let result = coins.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q),
    );

    if (viewMode === "watchlist") {
      result = result.filter((c) => watchlist.includes(c.id));
    }

    return result;
  }, [coins, searchCoin, viewMode, watchlist]);

  const hasLocalResults = localFiltered.length > 0;

  const shouldSearchAPI = searchCoin.trim().length >= 3 && !hasLocalResults;

  // ----------------------------
  // 2. API SEARCH (SearchCoin[])
  // ----------------------------
  const { data: remoteCoins = [] } = useCoinSearchQuery(
    shouldSearchAPI ? debouncedSearch : "",
  );

  // ----------------------------
  // 3. NORMALIZE API → Coin
  // ----------------------------
  const remoteAsCoins: Coin[] = useMemo(() => {
    return remoteCoins.map((c: SearchCoin) => mapSearchCoinToCoin(c));
  }, [remoteCoins]);

  // ----------------------------
  // FINAL LIST
  // ----------------------------
  const coinsToRender = shouldSearchAPI ? remoteAsCoins : localFiltered;

  const noResults = searchCoin.trim().length >= 3 && coinsToRender.length === 0;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-[400px] h-[560px] bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="px-4 pt-4 pb-3">
          <h2 className="text-lg font-semibold">Select Coin</h2>
          <p className="text-sm text-muted-foreground">
            Choose a coin for conversion
          </p>
        </div>

        {/* SEARCH */}
        <div className="px-4 pb-3">
          <input
            value={searchCoin}
            onChange={(e) => setSearchCoin(e.target.value)}
            placeholder="Search coin..."
            className="w-full px-4 py-3 rounded-xl border bg-white/80"
          />
        </div>

        <CoinFilterTabs viewMode={viewMode} setViewMode={setViewMode} />

        {noResults && (
          <p className="text-xs text-red-500 px-4 mt-2">
            We searched. We tried. We found nothing.
          </p>
        )}

        {/* LIST */}
        <div className="flex-1 overflow-y-auto px-3">
          {coinsToRender.map((coin, index) => (
            <div key={coin.id}>
              <div className="flex items-center justify-between py-3 px-2">
                {/* SELECT COIN */}
                <button
                  type="button"
                  onClick={() => {
                    onSelectCoin(coin); // ALWAYS Coin now
                    setOpen(false);
                    setSearchCoin("");
                  }}
                  className="flex items-center gap-3 flex-1 text-left"
                >
                  <Image
                    src={coin.image || "/placeholder.png"}
                    alt={coin.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />

                  <span className="text-sm">
                    {coin.name}{" "}
                    <span className="text-purple-500 font-medium">
                      ({coin.symbol.toUpperCase()})
                    </span>
                  </span>
                </button>

                {/* WATCHLIST */}
                <button
                  type="button"
                  onClick={() => {
                    setWatchlist((prev) => {
                      if (prev.includes(coin.id)) {
                        return prev.filter((id) => id !== coin.id);
                      }
                      return [...prev, coin.id];
                    });
                  }}
                >
                  <StarIcon
                    size={18}
                    className={
                      watchlist.includes(coin.id)
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-400"
                    }
                  />
                </button>
              </div>

              {index !== coinsToRender.length - 1 && (
                <div className="border-b border-black/10 mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
