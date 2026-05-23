"use client";

import { useCoinDetailQuery } from "@/hooks/useCoinDetailQuery";
import Image from "next/image";
import CoinPageSkeleton from "../skeletons/coinPageSkeleton";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

type Props = {
  coinId: string;
};

const card =
  "rounded-2xl bg-white/40 backdrop-blur-xl border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]";

export default function CoinPage({ coinId }: Props) {
  const { data: coin, isLoading, error } = useCoinDetailQuery(coinId);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isLoading) return <CoinPageSkeleton />;

  const axiosError = error as AxiosError<{ error: string }>;
  const status = axiosError?.response?.status;

  if (status === 404) {
    return (
      <div className="text-center py-16 text-gray-500">Coin not found</div>
    );
  }

  if (status === 429) {
    return (
      <div className="text-center py-16 text-red-500">
        Too many requests. Try again later.
      </div>
    );
  }

  if (error || !coin) {
    return (
      <div className="text-center py-16 text-red-500">
        Something went wrong.
      </div>
    );
  }

  const market = coin.market_data;

  const supplyPercent = market?.max_supply
    ? (market.circulating_supply / market.max_supply) * 100
    : 0;

  return (
    <main className="w-full max-w-[1440px] mx-auto bg-[var(--brand-gray)] px-[72px] py-6 flex flex-col gap-6 text-[var(--brand-black)]">
      {/* 🔥 PREMIUM STICKY HEADER */}
      <div
        className={`
          sticky top-0 z-50 transition-all duration-300
          ${
            scrolled
              ? "backdrop-blur-xl bg-white/60 shadow-md py-2"
              : "bg-transparent py-4"
          }
        `}
      >
        <div className="flex items-center justify-between transition-all duration-300">
          {/* LEFT: BACK + COIN */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="
                text-sm font-medium text-gray-700
                transition-all duration-200
                hover:text-black hover:scale-[1.05]
                hover:drop-shadow-[0_0_10px_rgba(0,0,0,0.25)]
              "
            >
              ← Back
            </button>

            <div className="flex items-center gap-2">
              <Image
                src={coin.image?.small}
                alt={coin.name}
                width={22}
                height={22}
              />

              <span className="text-sm font-semibold">
                {coin.name} ({coin.symbol.toUpperCase()})
              </span>
            </div>
          </div>

          {/* RIGHT: MINI PRICE (appears cleaner on scroll) */}
          <div
            className={`text-sm font-medium transition-all duration-300 ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
          >
            ${market?.current_price?.usd?.toLocaleString()}
          </div>
        </div>
      </div>

      {/* TOP SECTION */}
      <section className="grid grid-cols-3 gap-6">
        {/* COIN CARD */}
        <div className={`${card} p-5 flex flex-col items-center gap-3`}>
          <Image
            src={coin.image?.small}
            alt={coin.name}
            width={40}
            height={40}
          />
          <h2 className="text-sm font-medium">{coin.name}</h2>
          <p className="text-xs text-gray-500 uppercase">{coin.symbol}</p>
        </div>

        {/* PRICE */}
        <div className={`${card} p-5 flex flex-col items-center text-center`}>
          <h2 className="text-sm font-medium">Price</h2>

          <p className="text-lg font-semibold">
            ${market?.current_price?.usd?.toLocaleString()}
          </p>

          <p
            className={
              market?.price_change_percentage_24h >= 0
                ? "text-green-600"
                : "text-red-500"
            }
          >
            {market?.price_change_percentage_24h?.toFixed(2)}% (24h)
          </p>

          <div className="flex gap-3 text-xs text-gray-500 mt-2">
            <span>ATH ${market?.ath?.usd?.toLocaleString()}</span>
            <span>ATL ${market?.atl?.usd?.toLocaleString()}</span>
          </div>
        </div>

        {/* MARKET DATA */}
        <div className={`${card} p-5 flex flex-col gap-3`}>
          <h2 className="text-sm font-medium text-center">Market Data</h2>

          <div className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between">
              <span>Market Cap</span>
              <span>${market?.market_cap?.usd?.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span>Volume</span>
              <span>${market?.total_volume?.usd?.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span>Supply</span>
              <span>
                {market?.circulating_supply?.toLocaleString()} {coin.symbol}
              </span>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="mt-auto space-y-2">
            <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-black/30 transition-all duration-300"
                style={{ width: `${supplyPercent}%` }}
              />
            </div>

            <div className="flex justify-between text-[10px] text-gray-500">
              <span>{supplyPercent.toFixed(1)}%</span>
              <span>Circulating</span>
            </div>
          </div>
        </div>
      </section>

      {/* CHART */}
      <section className={`${card} p-5 h-[320px] flex flex-col`}>
        <h2 className="text-sm font-medium mb-3">Price Chart</h2>

        <div className="flex-1 bg-black/5 rounded-xl flex items-center justify-center text-xs text-gray-400">
          Chart goes here
        </div>
      </section>

      {/* DESCRIPTION + LINKS */}
      <section className="grid grid-cols-3 gap-6 h-[240px]">
        <div className={`${card} col-span-2 p-5`}>
          <h2 className="text-sm font-medium mb-2">Description</h2>
          <p className="text-xs text-gray-600 overflow-auto">
            {coin.description?.en?.slice(0, 900) || "No description available."}
          </p>
        </div>

        <div className={`${card} p-5`}>
          <h2 className="text-sm font-medium mb-3">Links</h2>

          <div className="flex flex-col gap-2 text-xs text-gray-600">
            {coin.links?.homepage?.[0] && (
              <a className="hover:text-black" href={coin.links.homepage[0]}>
                Official Site
              </a>
            )}
            {coin.links?.blockchain_site?.[0] && (
              <a
                className="hover:text-black"
                href={coin.links.blockchain_site[0]}
              >
                Explorer
              </a>
            )}
            {coin.links?.subreddit_url && (
              <a className="hover:text-black" href={coin.links.subreddit_url}>
                Community
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
