"use client";

import { useMemo, useState } from "react";
import { Coin } from "@/types/coin";
import Image from "next/image";
import { StarIcon } from "@phosphor-icons/react";

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

  const filteredCoins = useMemo(() => {
    const searched = searchCoin.toLowerCase();

    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searched) ||
        coin.symbol.toLowerCase().includes(searched),
    );
  }, [coins, searchCoin]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={() => setOpen(false)}
    >
      <div
        className="
          w-[400px]
          h-[560px]
          bg-white/5
          backdrop-blur-xl
          border border-white/20
          rounded-2xl
          shadow-2xl
          overflow-hidden
          flex flex-col
        "
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
            type="text"
            placeholder="Search coin..."
            className="
              w-full
              bg-[var(--brand-white)]
              px-4 py-3
              rounded-xl
              text-sm
              outline-none
              border border-black/10
              shadow-sm
              placeholder:text-muted-foreground
              focus:border-[var(--brand-purple)]
              transition
            "
          />
        </div>

        {/* LIST */}
        <div className="flex-1 overflow-y-auto px-3">
          {filteredCoins.map((coin, index) => (
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
                  <StarIcon size={18} />
                </button>
              </div>

              {index !== filteredCoins.length - 1 && (
                <div className="border-b border-black/10 mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
