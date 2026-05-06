import Image from "next/image";
import { useState } from "react";
import TimeDropdown from "./timeDropdown";
import { TimeFrame } from "@/constants/timeChanges";
import MetricBar from "./metricBar";
import { formatCurrencyCompact } from "@/utils/formatCurrency";
import { useCurrency } from "@/context/currencyContext";

const metricTheme = {
  up: {
    text: "text-[var(--brand-green)]",
    fill: "bg-[var(--brand-green)]",
    track: "bg-green-100",
  },
  down: {
    text: "text-[var(--brand-red)]",
    fill: "bg-[var(--brand-red)]",
    track: "bg-red-100",
  },
  neutral: {
    text: "text-gray-500",
    fill: "bg-gray-400",
    track: "bg-gray-100",
  },
};

const getTrend = (value: number | undefined) => {
  const v = value ?? 0;
  if (v > 0) return "up";
  if (v < 0) return "down";
  return "neutral";
};

export default function CoinTable() {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("24h");
  const { defaultCurrency } = useCurrency();

  const mockCoins = [
    {
      id: "bitcoin",
      symbol: "btc",
      name: "Bitcoin",
      image:
        "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png",
      current_price: 81270,
      market_cap: 1627580884252,
      total_volume: 44262977139,
      price_change_percentage_1h_in_currency: 0.35,
      price_change_percentage_24h_in_currency: 2.94,
      price_change_percentage_7d_in_currency: 6.67,
      circulating_supply: 20023771,
      total_supply: 21000000,
    },
  ];

  const getChange = (coin: (typeof mockCoins)[number]) => {
    switch (timeFrame) {
      case "1h":
        return coin.price_change_percentage_1h_in_currency;
      case "24h":
        return coin.price_change_percentage_24h_in_currency;
      case "7d":
        return coin.price_change_percentage_7d_in_currency;
      default:
        return coin.price_change_percentage_24h_in_currency;
    }
  };

  const sortedCoins = [...mockCoins].sort(
    (a, b) => b.market_cap - a.market_cap,
  );

  return (
    <div className="w-full bg-[var(--brand-gray)] px-[72px] max-w-[1440px] mx-auto">
      <h2 className="mt-6 text-sm font-bold text-gray-500">Market Overview</h2>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full table-fixed border-separate border-spacing-y-2">
          {/* HEADER */}
          <thead>
            <tr className="text-left text-gray-500 text-sm">
              <th className="w-[60px] px-4 py-2">#</th>

              <th className="w-[220px] px-4 py-2">Coins</th>

              <th className="w-[120px] px-4 py-2">Price</th>
              <th className="w-[160px] px-4 py-2 align-middle">
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <span className="text-gray-500 text-sm">Change</span>

                  <div className="shrink-0">
                    <TimeDropdown
                      timeFrame={timeFrame}
                      setTimeFrame={setTimeFrame}
                    />
                  </div>
                </div>
              </th>

              <th className="w-[260px] px-4 py-2">Volume / Market Cap</th>

              <th className="w-[260px] px-4 py-2">Supply / Total</th>

              <th className="w-[120px] px-4 py-2">7D</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {sortedCoins.map((coin, index) => {
              const priceChange = getChange(coin);
              const trend = getTrend(priceChange);
              const theme = metricTheme[trend];

              return (
                <tr key={coin.id} className="bg-white shadow-sm rounded-xl">
                  {/* Rank */}
                  <td className="px-4 py-4">{index + 1}</td>

                  {/* Coin */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        width={24}
                        height={24}
                      />
                      <div className="min-w-0">
                        <div className="font-medium truncate">{coin.name}</div>
                        <div className="text-xs text-gray-400">
                          {coin.symbol}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-4">${coin.current_price}</td>

                  {/* Change */}
                  <td className={`px-4 py-4 ${theme.text}`}>
                    {priceChange?.toFixed(2)}%
                  </td>

                  {/* Volume */}
                  <td className="px-4 py-4">
                    <MetricBar
                      current={coin.total_volume}
                      max={coin.market_cap}
                      currentLabel={formatCurrencyCompact(
                        coin.total_volume,
                        defaultCurrency,
                      )}
                      maxLabel={formatCurrencyCompact(
                        coin.market_cap,
                        defaultCurrency,
                      )}
                      theme={theme}
                    />
                  </td>

                  {/* Supply */}
                  <td className="px-4 py-4">
                    <MetricBar
                      current={coin.circulating_supply}
                      max={coin.total_supply}
                      currentLabel={formatCurrencyCompact(
                        coin.circulating_supply,
                        defaultCurrency,
                      )}
                      maxLabel={formatCurrencyCompact(
                        coin.total_supply,
                        defaultCurrency,
                      )}
                      theme={theme}
                    />
                  </td>

                  {/* Chart */}
                  <td className="px-4 py-4">
                    <div className="h-10 w-full bg-gradient-to-r from-teal-200 to-teal-400 rounded-md" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
