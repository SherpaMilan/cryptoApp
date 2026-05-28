"use client";

import { useState } from "react";

import { useCoinDetailQuery } from "@/hooks/useCoinDetailQuery";
import { useCurrency } from "@/context/currencyContext";
import { TIME_RANGES, TimeRangeKey } from "@/constants/timeRanges";

import CoinPageSkeleton from "@/components/skeletons/CoinPageSkeleton";

import CoinHeader from "@/components/coinPage/CoinHeader";
import PriceBlock from "@/components/coinPage/PriceBlock";
import TimeRangeSelector from "@/components/coinPage/TimeRangeSelector";
import { CoinPageChart } from "@/components/coinPage/CoinPageChart";
import ReadMore from "@/components/coinPage/ReadMore";
import StatsPanel from "@/components/coinPage/StatsPanel";
import LinksSection from "@/components/coinPage/Links";

export default function CoinPage({ coinId }: { coinId: string }) {
  const { currencyKey, currencySymbol } = useCurrency();
  const { data: coin, isLoading } = useCoinDetailQuery(coinId);
  const [timeRange, setTimeRange] = useState<TimeRangeKey>("1Y");

  if (isLoading) return <CoinPageSkeleton />;
  if (!coin) return <div>Error</div>;

  const m = coin.market_data;

  const price = m?.current_price?.[currencyKey] ?? 0;
  const marketCap = m?.market_cap?.[currencyKey] ?? 0;
  const volume = m?.total_volume?.[currencyKey] ?? 0;
  const supply = m?.circulating_supply ?? 0;

  const change24h = m?.price_change_percentage_24h ?? 0;

  const ath = m?.ath?.[currencyKey] ?? 0;
  const atl = m?.atl?.[currencyKey] ?? 0;

  const athDate = m?.ath_date?.[currencyKey] ?? "—";
  const atlDate = m?.atl_date?.[currencyKey] ?? "—";

  const links = coin.links;
  const description = coin.description?.en;

  return (
    <main className="w-full max-w-[1440px] mx-auto bg-[var(--brand-gray)] px-[72px]">
      <CoinHeader
        name={coin.name}
        symbol={coin.symbol}
        image={coin.image?.small}
        rank={coin.market_cap_rank}
      />

      <div className="grid grid-cols-[1fr_340px] gap-6 py-6">
        <section className="space-y-6">
          <PriceBlock
            price={price}
            change24h={change24h}
            currencySymbol={currencySymbol}
            marketCap={marketCap}
          />

          <TimeRangeSelector
            ranges={Object.keys(TIME_RANGES)}
            selected={timeRange}
            onChange={setTimeRange}
          />

          <CoinPageChart coinId={coin.id} timeRange={timeRange} />

          <div className="pt-2">
            <p className="text-xs mb-2 text-[var(--brand-black)] uppercase">
              About
            </p>
            <ReadMore text={description} />
          </div>
        </section>

        <aside className="space-y-8">
          <StatsPanel
            volume={volume}
            supply={supply}
            currencySymbol={currencySymbol}
            ath={ath}
            atl={atl}
            athDate={athDate}
            atlDate={atlDate}
          />

          <LinksSection links={links} />
        </aside>
      </div>
    </main>
  );
}
