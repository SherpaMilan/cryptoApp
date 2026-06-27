"use client";

import { useCurrency } from "@/store/useCurrencyStore";
import MarketStatsBarItem from "@/components/ui/MarketStatsBarItem";
import getColorbar from "@/utils/getColorbar";
import { formatCurrencyCompact } from "@/utils/formatCurrency";
import { MdArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";
import MarketDataSkeleton from "../skeletons/MarketDataSkeleton";
import { useMarketDataQuery } from "@/hooks/useMarketDataQuery";
import {
  CoinsIcon,
  SwapIcon,
  CurrencyBtcIcon,
  CurrencyEthIcon,
} from "@phosphor-icons/react";
import { STATS_BAR_ICON_PROPS } from "@/constants/statsbarIcons";

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
      icon: <CurrencyBtcIcon {...STATS_BAR_ICON_PROPS} />,
      value: marketData.data.market_cap_percentage.btc,
    },
    {
      icon: <CurrencyEthIcon {...STATS_BAR_ICON_PROPS} />,
      value: marketData.data.market_cap_percentage.eth,
    },
  ];

  return (
    <div className="w-full relative overflow-hidden">
      <div className="relative max-w-[1440px] mx-auto flex justify-center items-center h-[56px] px-[72px] gap-10 backdrop-blur-2xl border-b border-dotted border-gray-300 text-sm">
        <MarketStatsBarItem
          label="Coins"
          value={marketData.data.active_cryptocurrencies}
          logo={<CoinsIcon {...STATS_BAR_ICON_PROPS} />}
        />

        <MarketStatsBarItem
          label="Exchanges"
          value={marketData.data.markets}
          logo={<SwapIcon {...STATS_BAR_ICON_PROPS} />}
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

        <div className="flex items-center gap-4 text-sm text-foreground">
          <span className="text-[12px] uppercase">Dominance:</span>

          {topCoins.map((coin, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <MarketStatsBarItem
                logo={coin.icon}
                value={`${coin.value.toFixed(2)}%`}
              />

              <div className="w-[80px] h-[6px] bg-gray-200 overflow-hidden rounded-full">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${coin.value}%`,
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
