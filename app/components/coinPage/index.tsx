"use client";

import { useCoinDetailQuery } from "@/hooks/useCoinDetailQuery";
import Image from "next/image";
import CoinPageSkeleton from "../skeletons/coinPageSkeleton";
import { AxiosError } from "axios";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";

type Props = { coinId: string };

const formatDate = (date?: string) =>
  date ? new Date(date).toUTCString() : "—";

export default function CoinPage({ coinId }: Props) {
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
    <main
      className="w-full max-w-[1440px] mx-auto bg-[var(--brand-gray)] px-[72px]"
      aria-label="Coin detail page"
    >
      <header className="flex items-center justify-between py-4 border-b border-black/5">
        <button
          onClick={() => window.history.back()}
          aria-label="Go back"
          className="hover:opacity-60"
        >
          <IoArrowBackCircleOutline size={34} />
        </button>

        <div className="flex items-center gap-2">
          <Image
            src={coin.image?.small}
            alt={`${coin.name} logo`}
            width={20}
            height={20}
          />
          <span className="text-sm font-medium">
            {coin.symbol.toUpperCase()}
          </span>
        </div>

        <div className="text-xs text-gray-500">
          Rank #{coin.market_cap_rank ?? "-"}
        </div>
      </header>

      <div className="grid grid-cols-[1fr_340px] gap-6 py-6">
        <section className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-semibold">
                ${market?.current_price?.usd?.toLocaleString()}
              </p>

              <div className="flex items-center gap-2 mt-1">
                {isPositive ? (
                  <FaArrowUp className="text-green-600 text-xs" />
                ) : (
                  <FaArrowDown className="text-red-500 text-xs" />
                )}

                <span
                  className={
                    isPositive
                      ? "text-green-600 text-sm"
                      : "text-red-500 text-sm"
                  }
                >
                  {change24h.toFixed(2)}% (24h)
                </span>
              </div>
            </div>

            <div className="text-right text-xs text-gray-500">
              Market Cap
              <div className="text-black">
                ${market?.market_cap?.usd?.toLocaleString()}
              </div>
            </div>
          </div>

          {/* CHART */}
          <div className="h-[520px] flex items-center justify-center text-xs   rounded-xl">
            Chart goes here
          </div>
        </section>

        <aside className="space-y-8 text-sm">
          <section className="space-y-4">
            <div>
              <p className="text-xs text-gray-400">Volume (24h)</p>
              <p>${market?.total_volume?.usd?.toLocaleString()}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Circulating Supply</p>
              <p>{market?.circulating_supply?.toLocaleString()}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">All Time High</p>
              <p className="font-medium">
                ${market?.ath?.usd?.toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-500">
                {formatDate(market?.ath_date?.usd)}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">All Time Low</p>
              <p className="font-medium">
                ${market?.atl?.usd?.toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-500">
                {formatDate(market?.atl_date?.usd)}
              </p>
            </div>
          </section>

          <nav>
            <p className="text-xs text-gray-400 mb-2">LINKS</p>

            <div className="flex flex-col text-sm">
              {coin.links?.homepage?.[0] && (
                <a
                  href={coin.links.homepage[0]}
                  className="py-2 border-b border-black/5 flex justify-between hover:text-black"
                >
                  Official Site <span>↗</span>
                </a>
              )}

              {coin.links?.blockchain_site?.[0] && (
                <a
                  href={coin.links.blockchain_site[0]}
                  className="py-2 border-b border-black/5 flex justify-between hover:text-black"
                >
                  Explorer <span>↗</span>
                </a>
              )}

              {coin.links?.subreddit_url && (
                <a
                  href={coin.links.subreddit_url}
                  className="py-2 flex justify-between hover:text-black"
                >
                  Community <span>↗</span>
                </a>
              )}
            </div>
          </nav>

          <section>
            <p className="text-xs text-gray-400 mb-2">ABOUT</p>
            <p className="text-xs text-gray-600 leading-relaxed line-clamp-10">
              {coin.description?.en?.slice(0, 800) ||
                "No description available."}
            </p>
          </section>
        </aside>
      </div>
    </main>
  );
}
