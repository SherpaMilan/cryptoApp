"use client";

import Image from "next/image";
import { StarIcon } from "@phosphor-icons/react";
import { Coin } from "@/types/coin";
import { useCoinModalLogic } from "../hooks/useCoinModalLogic";
import CoinFilterTabs from "./coinFilterTabs";
import CoinSearchInput from "./coinSearchInput";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  coins: Coin[];
};

export default function CoinModal({ isOpen, onClose, coins }: Props) {
  const {
    searchCoin,
    setSearchCoin,
    viewMode,
    setViewMode,
    watchlist,
    setWatchlist,
    coinsToRender,
    setCoin,
    isSearching,
  } = useCoinModalLogic(coins);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="w-[400px] h-[560px] bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 pt-4 pb-3">
          <p className="text-lg font-semibold">Select coins</p>
        </div>

        <CoinSearchInput value={searchCoin} onChange={setSearchCoin} />

        {!isSearching && (
          <CoinFilterTabs viewMode={viewMode} setViewMode={setViewMode} />
        )}

        <div className="flex-1 overflow-y-auto px-3">
          {coinsToRender.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-sm text-gray-400">
              <p>No coins found</p>
              <p className="text-xs text-gray-500 mt-1">
                Try a different keyword
              </p>
            </div>
          ) : (
            coinsToRender.map((coin) => (
              <div
                key={coin.id}
                className="flex items-center justify-between py-3 px-2"
              >
                {/* select coin */}
                <button
                  onClick={() => {
                    setCoin(coin);
                    onClose();
                    setSearchCoin("");
                  }}
                  className="flex items-center gap-3"
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
                    <span className="text-purple-500">
                      ({coin.symbol.toUpperCase()})
                    </span>
                  </span>
                </button>

                {/* watchlist toggle */}
                <button
                  onClick={() => {
                    setWatchlist((prev) =>
                      prev.includes(coin.id)
                        ? prev.filter((id) => id !== coin.id)
                        : [...prev, coin.id],
                    );
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
