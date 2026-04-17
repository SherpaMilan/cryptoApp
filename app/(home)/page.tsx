"use client";
import Image from "next/image";
import { MdArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";
import { Coin } from "@/types/coin";
import { useCurrency } from "@/context/currencyContext";
import { useEffect, useState } from "react";
import CurrencyStatisticsSkeleton from "@/ui/skeletons/currencyStatisticsSkeleton";

export default function HomePage() {
  const { defaultCurrency, isCurrencyLoaded } = useCurrency();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isCurrencyLoaded) return; // Wait until currency is loaded before fetching coins
    fetch(`/api/coins?currency=${defaultCurrency}&perPage=100&page=1`)
      .then((res) => res.json())
      .then(setCoins)
      .catch((err) => {
        console.error("Error fetching coins:", err);
        setError("Failed to fetch coin data");
      })
      .finally(() => setLoading(false));
  }, [defaultCurrency, isCurrencyLoaded]);

  if (loading) {
    return <CurrencyStatisticsSkeleton />;
  }
  if (error) return <div className="text-[var(--brand-red)]">{error}</div>;

  return (
    <div className="w-full bg-[var(--brand-gray)] py-[30px]">
      <div className="max-w-[1440px] mx-auto px-[72px]">
        <div className="text-[var(--brand-purple-dark)] mb-9">
          Select the currency to view statistics
        </div>

        <div className="flex gap-4 mt-4 overflow-x-auto overflow-y-hidden whitespace-nowrap [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          {coins.map((coin) => {
            // double check if null, if so set to 0
            const change = coin.price_change_percentage_24h ?? 0;
            const isPositive = change > 0;
            return (
              <div
                key={coin.id}
                className="w-[252px] h-[78px] flex flex-row items-center p-2 rounded bg-[var(--brand-white)] cursor-pointer flex-shrink-0"
              >
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <Image
                    src={coin.image}
                    alt={coin.name}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between ml-4 gap-2 flex-1">
                  <div className="font-bold font-sm">
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <span>
                      {coin.current_price} {defaultCurrency}
                    </span>

                    <span
                      className={`flex items-center gap-1 ${
                        isPositive
                          ? "text-[var(--brand-green)] font-bold"
                          : "text-[var(--brand-red)] font-bold"
                      }`}
                    >
                      {isPositive ? (
                        <MdArrowDropUp className="h-5 w-5 flex-shrink-0" />
                      ) : (
                        <MdOutlineArrowDropDown className="h-5 w-5 flex-shrink-0" />
                      )}
                      <span className="leading-none">{change.toFixed(2)}%</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
