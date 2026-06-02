"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoSearch } from "react-icons/go";
import { useCoinSearchQuery } from "@/hooks/useCoinSearchQuery";
import useDebounce from "@/hooks/useDebounce";
import { Coin } from "@/types/coin";
import Image from "next/image";

const MAX_RESULTS = 10;

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { data: searchResults } = useCoinSearchQuery(debouncedSearchQuery);
  const coinsList = searchResults ?? [];

  const visibleCoins = coinsList.slice(0, MAX_RESULTS);

  const hasSearched = debouncedSearchQuery.length > 0;
  const noResults = hasSearched && visibleCoins.length === 0;

  return (
    <div className="relative w-[280px]">
      <div
        className={`
          relative h-[48px] rounded-[15px] flex items-center
          bg-card
          transition
          ${noResults ? "border-red-400" : ""}
        `}
      >
        <GoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/60" />

        <input
          type="text"
          placeholder="Search coins..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="w-full h-full pl-10 pr-3 bg-transparent rounded-[15px] focus:outline-none text-sm text-foreground"
        />
      </div>

      {noResults && (
        <p className="text-xs text-red-500 mt-1 ml-1">
          No coins found. Try another search!
        </p>
      )}

      {open && visibleCoins.length > 0 && (
        <ul
          className="
            absolute top-full left-0 mt-2 w-full
            bg-card/95 backdrop-blur-sm
            rounded-lg shadow-md
            z-50
            overflow-hidden
          "
        >
          <div className="max-h-[220px] overflow-y-auto py-1">
            {visibleCoins.map((coin: Coin) => (
              <li key={coin.id} className="relative">
                <button
                  onClick={() => {
                    router.push(`/coin/${coin.id}`);
                    setSearchQuery("");
                    setOpen(false);
                  }}
                  className="
                    relative w-full flex items-center justify-between
                    px-3 py-2 text-left cursor-pointer transition
                    hover:bg-card-hover
                  "
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Image
                      width={20}
                      height={20}
                      src={coin.thumb}
                      alt={coin.name}
                      className="w-4 h-4 rounded-full"
                    />

                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium text-foreground truncate">
                        {coin.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase">
                        {coin.symbol}
                      </span>
                    </div>
                  </div>

                  <span className="text-muted-foreground text-sm font-semibold">
                    ›
                  </span>

                  <div className="absolute bottom-0 left-6 right-6 h-px bg-border/40" />
                </button>
              </li>
            ))}
          </div>
        </ul>
      )}
    </div>
  );
}
