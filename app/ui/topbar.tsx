"use client";
import { useCurrency } from "@/context/currencyContext";
import getMarketData from "@/utils/getMarketData";
import { useEffect, useState } from "react";
import TopbarItem from "./topbaritem";
import { formatCurrencyCompact } from "@/utils/formatCurrency";
import { MdArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";
import { MarketData } from "@/types/market";

export default function Topbar() {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const { defaultCurrency } = useCurrency();

  useEffect(() => {
    getMarketData()
      .then(setMarketData)
      .catch((err) => console.error("Error fetching market data:", err));
  }, []);

  // Skeleton loader
  if (!marketData) {
    return (
      <div className="max-w-[1440px] mx-auto flex justify-center items-center h-[56px] px-[72px] gap-8">
        {[...Array(6)].map((_, idx) => (
          <div
            key={idx}
            className="h-5 w-16 bg-gray-100 rounded animate-pulse"
          />
        ))}
      </div>
    );
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
    <div className="max-w-[1440px] mx-auto flex justify-center items-center h-[56px] px-[72px] gap-8">
      <TopbarItem
        label="Coins"
        value={marketData.data.active_cryptocurrencies}
        logo="/logos/coins.svg"
      />
      <TopbarItem
        label="Exchanges"
        value={marketData.data.markets}
        logo="/logos/exchange.svg"
      />
      <TopbarItem
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

      <TopbarItem
        value={formatCurrencyCompact(
          marketData.data.total_volume[currencyKey],
          defaultCurrency,
        )}
      />

      {/* Top Coins BTC & ETH */}
      {topCoins.map((coin) => (
        <TopbarItem
          key={coin.logo}
          logo={coin.logo}
          value={`${coin.value.toFixed(2)}%`}
        />
      ))}
    </div>
  );
}
