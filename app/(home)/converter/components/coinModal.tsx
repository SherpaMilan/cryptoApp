"use client";

import { useEffect, useMemo, useState } from "react";
import { Coin } from "@/types/coin";
import Image from "next/image";
import { StarIcon } from "@phosphor-icons/react";
import CoinFilterTabs from "./coinFilterTabs";

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

  const [watchlist, setWatchlist] = useState<Coin[]>(() => {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem("watchlist");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const displayedCoins = useMemo(() => {
    const searched = searchCoin.toLowerCase();

    let filtered = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searched) ||
        coin.symbol.toLowerCase().includes(searched),
    );

    // if watchlist tab → show only saved coins
    if (viewMode === "watchlist") {
      filtered = filtered.filter((coin) =>
        watchlist.some((w) => w.id === coin.id),
      );
    }

    return filtered;
  }, [coins, searchCoin, viewMode, watchlist]);

  if (!open) return null;

  return (
    //Dark background overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={() => setOpen(false)}
    >
      {/* Prevent closing coin modal when clicking inside */}
      <div
        className="w-[400px] h-[560px] bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 pt-4 pb-3">
          <h2 className="text-lg font-semibold">Select Coin</h2>
          <p className="text-sm text-muted-foreground">
            Choose a coin for conversion
          </p>
        </div>

        <div className="px-4 pb-3">
          <input
            value={searchCoin}
            onChange={(e) => setSearchCoin(e.target.value)}
            type="text"
            placeholder="Search coin..."
            className="w-full bg-[var(--brand-white)] px-4 py-3 rounded-xl text-sm outline-none border border-black/10 shadow-sm placeholder:text-muted-foreground focus:border-[var(--brand-purple)] transition"
          />
        </div>

        <CoinFilterTabs viewMode={viewMode} setViewMode={setViewMode} />

        <div className="flex-1 overflow-y-auto px-3">
          {displayedCoins.map((coin, index) => (
            <div key={coin.id}>
              <div className="flex items-center justify-between py-3 px-2">
                <button
                  type="button"
                  onClick={() => {
                    onSelectCoin(coin);
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 flex-1 text-left cursor-pointer"
                >
                  <Image
                    src={coin.image}
                    alt={coin.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />

                  <span className="text-sm">
                    {coin.name}{" "}
                    <span className="text-[var(--brand-purple)] font-medium">
                      ({coin.symbol.toUpperCase()})
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  className="p-2 rounded-lg hover:bg-black/5 transition"
                >
                  <StarIcon
                    size={18}
                    onClick={() => {
                      setWatchlist((prev) => {
                        const exists = prev.find(
                          (watchlistCoin) => watchlistCoin.id === coin.id,
                        );
                        // if already in watchlist → remove it when click again
                        if (exists) {
                          return prev.filter(
                            (watchlistCoin) => watchlistCoin.id !== coin.id,
                          );
                        }
                        // else add
                        return [...prev, coin];
                      });
                    }}
                    className={
                      watchlist.find((c) => c.id === coin.id)
                        ? "text-yellow-500 fill-yellow-500 cursor-pointer"
                        : "text-gray-400 cursor-pointer"
                    }
                  />
                </button>
              </div>

              {index !== displayedCoins.length - 1 && (
                <div className="border-b border-black/10 mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
