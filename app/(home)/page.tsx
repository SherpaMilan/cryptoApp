"use client";

import Image from "next/image";
import { MdArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";
import { Coin } from "@/types/coin";
import { useCurrency } from "@/context/currencyContext";
import { useEffect, useState } from "react";

import HomePageSkeleton from "@/ui/skeletons/homeSkeleton";
import PriceChart from "@/ui/priceChart";
import VolumeChart from "@/ui/volumeChart";
import TimeRange from "@/ui/timeRange";

export default function HomePage() {
  const { defaultCurrency, isCurrencyLoaded } = useCurrency();

  const [coins, setCoins] = useState<Coin[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);

  // ---------------- FETCH COINS ----------------
  useEffect(() => {
    if (!isCurrencyLoaded) return;

    fetch(`/api/coins?currency=${defaultCurrency}&perPage=100&page=1`)
      .then((res) => res.json())
      .then((data) => {
        setCoins(data);
        setSelectedCoin(data[0]); // default selection
      })
      .catch((err) => {
        console.error("Fetch coins error:", err);
        setError("Failed to fetch coin data");
      })
      .finally(() => setLoading(false));
  }, [defaultCurrency, isCurrencyLoaded]);

  // ---------------- LOADING STATE ----------------
  if (loading || !isCurrencyLoaded) {
    return <HomePageSkeleton />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="w-full bg-[var(--brand-gray)] py-0">
      <div className="max-w-[1440px] mx-auto px-[72px]">
        <div className="text-[var(--brand-purple-dark)]">
          Select the currency to view statistics
        </div>

        {/* COIN LIST */}
        <div className="flex gap-4 mt-8 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden">
          {coins.map((coin) => {
            const isActive = selectedCoin?.id === coin.id;
            const change = coin.price_change_percentage_24h ?? 0;
            const isPositive = change > 0;

            return (
              <button
                key={coin.id}
                onClick={() => setSelectedCoin(coin)}
                className={`w-[252px] h-[78px] flex items-center p-2 rounded flex-shrink-0 text-left ${isActive ? "bg-[var(--brand-purple)] text-white" : "bg-white"}`}
              >
                <Image
                  src={coin.image}
                  alt={coin.name}
                  width={32}
                  height={32}
                />

                <div className="ml-4 flex flex-col flex-1">
                  <div className="font-bold text-sm">
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <span>
                      {coin.current_price} {defaultCurrency}
                    </span>

                    <span
                      className={`flex items-center gap-1 ${
                        isPositive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {isPositive ? (
                        <MdArrowDropUp />
                      ) : (
                        <MdOutlineArrowDropDown />
                      )}
                      {change.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {selectedCoin && (
          <div className="mt-8 flex flex-col gap-4">
            <div className="flex gap-4 h-[330px]">
              <div className="flex-1">
                <PriceChart coin={selectedCoin} />
              </div>

              <div className="flex-1">
                <VolumeChart coin={selectedCoin} />
              </div>
            </div>
            <div className="flex justify-start">
              <TimeRange />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
