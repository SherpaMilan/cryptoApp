"use client";

import Image from "next/image";
import { MdArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";
import { useState } from "react";

import { Coin } from "@/types/coin";
import { useCurrency } from "@/context/currencyContext";

import HomePageSkeleton from "@/components/skeletons/homeSkeleton";
import { PriceChart } from "@/components/charts/priceChart";
import { VolumeChart } from "@/components/charts/volumeChart";

import { useCoinsQuery } from "@/hooks/useCoinsQuery";
import type { TimeRangeKey } from "@/constants/timeRanges";
import TimeRangeComponent from "@/components/ui/timeRange";
import CoinTable from "@/components/table/coinTable";

export default function HomePage() {
  const { defaultCurrency, isCurrencyLoaded } = useCurrency();

  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRangeKey>("6M");

  // ---------------- COINS ----------------
  const {
    // Rename query data → coinsList
    data: coinsList,
    isLoading,
    error,
  } = useCoinsQuery(defaultCurrency, isCurrencyLoaded);

  const activeCoin = selectedCoin ?? coinsList?.[0] ?? null;
  if (isLoading || !isCurrencyLoaded) {
    return <HomePageSkeleton />;
  }

  if (error) {
    return <div className="text-red-500">Failed to load coins list</div>;
  }

  return (
    <div className="w-full bg-[var(--brand-gray)]">
      <div className="max-w-[1440px] mx-auto px-[72px]">
        <div className="font-bold text-gray-500">
          Select the currency to view statistics
        </div>

        {/* COIN LIST */}
        <div className="flex gap-4 mt-6 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden">
          {coinsList?.map((coin) => {
            const isActive = activeCoin?.id === coin.id;
            const change = coin.price_change_percentage_24h ?? 0;
            const isPositive = change > 0;

            return (
              <button
                key={coin.id}
                onClick={() => setSelectedCoin(coin)}
                className={`cursor-pointer w-[252px] h-[78px] flex items-center p-2 rounded flex-shrink-0 text-left ${
                  isActive ? "bg-[var(--brand-purple)] text-white" : "bg-white"
                }`}
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
        {activeCoin && (
          <div className="mt-6 flex flex-col gap-2 rounded-xl">
            <div className="flex gap-6 ">
              <div className="flex-1 h-full min-h-0">
                <PriceChart coin={activeCoin} timeRange={timeRange} />
              </div>

              <div className="flex-1 h-full min-h-0">
                <VolumeChart coin={activeCoin} timeRange={timeRange} />
              </div>
            </div>

            <div className="flex justify-start pl-1">
              <TimeRangeComponent value={timeRange} onChange={setTimeRange} />
            </div>
          </div>
        )}
      </div>

      <CoinTable />
    </div>
  );
}
