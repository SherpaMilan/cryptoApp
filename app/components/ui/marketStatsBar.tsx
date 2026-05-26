"use client";
import { useCurrency } from "@/context/currencyContext";
import MarketStatsBarItem from "@/components/ui/MarketStatsBarItem";
import getColorbar from "@/utils/getColorbar";
import { formatCurrencyCompact } from "@/utils/formatCurrency";
import { MdArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";
import MarketDataSkeleton from "../skeletons/MarketDataSkeleton";
import { useMarketDataQuery } from "@/hooks/useMarketDataQuery";

export default function MarketStatsBar() {
  const { defaultCurrency } = useCurrency();
  const { data: marketData, isLoading } = useMarketDataQuery();

  if (isLoading || !marketData) {
    return <MarketDataSkeleton />;
  }

  const currencyKey = defaultCurrency.toLowerCase();
  const marketCapChange = marketData.data.market_cap_change_percentage_24h_usd;

  const topCoins = [
    {
      logo: "/logos/btc.svg",
      value: marketData.data.market_cap_percentage.btc,
    },
    {
      logo: "/logos/eth.svg",
      value: marketData.data.market_cap_percentage.eth,
    },
  ];

  return (
    <div className="w-full">
      <div className="max-w-[1440px] mx-auto flex justify-center items-center h-[56px] px-[72px] gap-10 bg-[var(--brand-dark-purple)] text-sm ">
        <MarketStatsBarItem
          label="Coins"
          value={marketData.data.active_cryptocurrencies}
          logo="/logos/coins.svg"
        />
        <MarketStatsBarItem
          label="Exchanges"
          value={marketData.data.markets}
          logo="/logos/exchange.svg"
        />
        <MarketStatsBarItem
          label="Market Cap:"
          value={
            <div className="flex items-center gap-1">
              {marketCapChange >= 0 ? (
                <MdArrowDropUp className="h-5 w-5 flex-shrink-0 text-green-500" />
              ) : (
                <MdOutlineArrowDropDown className="h-5 w-5 flex-shrink-0 text-red-500" />
              )}
              {formatCurrencyCompact(
                marketData.data.total_market_cap[currencyKey],
                defaultCurrency,
              )}
            </div>
          }
        />

        <MarketStatsBarItem
          label="24h Vol:"
          value={formatCurrencyCompact(
            marketData.data.total_volume[currencyKey],
            defaultCurrency,
          )}
        />

        {/* Top Coins BTC & ETH */}

        <div className="flex items-center gap-4 text-sm text-[var(--brand-medium-gray)]">
          <span className="font-medium">Dominance:</span>

          {topCoins.map((coin) => (
            <div key={coin.logo} className="flex items-center gap-2">
              <MarketStatsBarItem
                logo={coin.logo}
                value={`${coin.value.toFixed(2)}%`}
              />

              <div className="w-[80px] h-[6px] bg-[var(--brand-medium-gray)] overflow-hidden rounded-full">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${coin.value}%`,
                    minWidth: "6px",
                    backgroundColor: getColorbar(coin.value),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
