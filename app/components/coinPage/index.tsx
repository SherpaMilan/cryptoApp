"use client";

import { useCoinDetailQuery } from "@/hooks/useCoinDetailQuery";
import Image from "next/image";
import CoinPageSkeleton from "../skeletons/coinPageSkeleton";
import { AxiosError } from "axios";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { useCurrency } from "@/context/currencyContext";
import ExpandableDescription from "./expandableDescription";

type Props = { coinId: string };

const formatDate = (date?: string) =>
  date ? new Date(date).toUTCString() : "—";

export default function CoinPage({ coinId }: Props) {
  const { currencyKey, currencySymbol } = useCurrency();
  const { data: coin, isLoading, error } = useCoinDetailQuery(coinId);

  if (isLoading) return <CoinPageSkeleton />;

  const axiosError = error as AxiosError<{ error: string }>;
  const status = axiosError?.response?.status;

  if (status === 404)
    return <div className="text-center py-16">Coin not found</div>;

  if (status === 429)
    return <div className="text-center py-16 text-red-500">Rate limited</div>;

  if (error || !coin)
    return <div className="text-center py-16 text-red-500">Error</div>;

  const market = coin.market_data;

  const change24h = market?.price_change_percentage_24h ?? 0;
  const isPositive = change24h >= 0;

  return (
    <main className="w-full max-w-[1440px] mx-auto bg-[var(--brand-gray)] px-[72px]">
      <header className="flex items-center justify-between py-5 border-b border-black/10">
        <button
          onClick={() => window.history.back()}
          className="text-black hover:opacity-60"
        >
          <IoArrowBackCircleOutline size={34} />
        </button>

        <div className="flex items-center gap-3">
          <Image
            src={coin.image?.small}
            alt={coin.name}
            width={22}
            height={22}
          />
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-black">
              {coin.name}
            </span>
            <span className="text-xs text-gray-500 uppercase">
              {coin.symbol}
            </span>
          </div>
        </div>

        <div
          className={`text-xs font-bold px-3 py-1 rounded-full ${
            coin.market_cap_rank === 1 ? "bg-red-500 text-white" : "text-black"
          }`}
        >
          Rank #{coin.market_cap_rank ?? "-"}
        </div>
      </header>

      <div className="grid grid-cols-[1fr_340px] gap-6 py-6">
        <section className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-bold text-black">
                {currencySymbol}{" "}
                {market?.current_price?.[currencyKey]?.toLocaleString() ??
                  "0.00"}
              </p>

              <div className="flex items-center gap-2 mt-2">
                {isPositive ? (
                  <FaArrowUp className="text-[var(--brand-green)] text-xs" />
                ) : (
                  <FaArrowDown className="text-[var(--brand-red)] text-xs" />
                )}

                <span
                  className={`text-sm font-medium ${
                    isPositive
                      ? "text-[var(--brand-green)]"
                      : "text-[var(--brand-red)]"
                  }`}
                >
                  {change24h.toFixed(2)}% (24h)
                </span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-500">Market Cap</p>
              <p className="text-black font-semibold">
                {currencySymbol}{" "}
                {market?.market_cap?.[currencyKey]?.toLocaleString() ?? "0"}
              </p>
            </div>
          </div>

          {/* CHART */}
          <div className="h-[520px] flex items-center justify-center text-xs rounded-xl border border-black/5 bg-white/40">
            Chart goes here
          </div>
        </section>

        <aside className="space-y-8 text-sm">
          <section className="space-y-4">
            <div>
              <p className="text-xs text-gray-500">Volume (24h)</p>
              <p className="text-black font-medium">
                {currencySymbol}{" "}
                {market?.total_volume?.[currencyKey]?.toLocaleString() ?? "0"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Circulating Supply</p>
              <p className="text-black font-medium">
                {market?.circulating_supply?.toLocaleString()}
              </p>
            </div>

            <div className="rounded-xl p-4 border border-[var(--brand-green)]/20 bg-[var(--brand-green)]/5">
              <p className="text-xs text-[var(--brand-green)] font-semibold">
                All Time High
              </p>

              <p className="text-lg font-bold text-[var(--brand-green)]">
                {currencySymbol}{" "}
                {market?.ath?.[currencyKey]?.toLocaleString() ?? "0"}
              </p>

              <p className="text-[10px] text-gray-500">
                {formatDate(market?.ath_date?.[currencyKey])}
              </p>
            </div>

            <div className="rounded-xl p-4 border border-[var(--brand-red)]/20 bg-[var(--brand-red)]/5">
              <p className="text-xs text-[var(--brand-red)] font-semibold">
                All Time Low
              </p>

              <p className="text-lg font-bold text-[var(--brand-red)]">
                {currencySymbol}{" "}
                {market?.atl?.[currencyKey]?.toLocaleString() ?? "0"}
              </p>

              <p className="text-[10px] text-gray-500">
                {formatDate(market?.atl_date?.[currencyKey])}
              </p>
            </div>
          </section>

          <nav>
            <p className="text-xs text-[var(--brand-black)] mb-2">LINKS</p>

            <div className="flex flex-col text-sm">
              {coin.links?.homepage?.[0] && (
                <a className="py-2 border-b border-black/5 flex justify-between hover:opacity-70">
                  Official Site <span>↗</span>
                </a>
              )}

              {coin.links?.blockchain_site?.[0] && (
                <a className="py-2 border-b border-black/5 flex justify-between hover:opacity-70">
                  Explorer <span>↗</span>
                </a>
              )}

              {coin.links?.subreddit_url && (
                <a className="py-2 flex justify-between hover:opacity-70">
                  Community <span>↗</span>
                </a>
              )}
            </div>
          </nav>

          <section>
            <p className="text-xs text-black mb-2">ABOUT</p>
            <ExpandableDescription text={coin.description?.en} />
          </section>
        </aside>
      </div>
    </main>
  );
}
