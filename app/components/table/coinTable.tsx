import Image from "next/image";
import { useState } from "react";
import TimeDropdown from "./timeDropdown";
import { TimeFrame } from "@/constants/timeChanges";

export default function CoinTable() {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("24h");

  const mockCoins = [
    {
      rank: 1,
      name: "Bitcoin",
      symbol: "BTC",
      price: 78975,
      change1h: -0.59,
      change24h: 0.73,
      change7d: 1.35,
      volume24h: 7.14,
      marketcap: 10,
      circulatingSupply: 19.7,
      totalSupply: 21,
      image:
        "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png",
    },
    {
      rank: 2,
      name: "Ethereum",
      symbol: "ETH",
      price: 2340,
      change1h: -0.21,
      change24h: 1.23,
      change7d: 0.73,
      volume24h: 5.21,
      marketcap: 8.3,
      circulatingSupply: 120,
      totalSupply: 120,
      image:
        "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png",
    },
  ];

  const ProgressBar = ({ value }: { value: number }) => (
    <div className="w-full h-1.5 bg-gray-200 rounded overflow-hidden">
      <div
        className="h-1.5 bg-teal-500 rounded"
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  );

  const getChange = (coin: (typeof mockCoins)[number]) => {
    if (timeFrame === "1h") return coin.change1h;
    if (timeFrame === "24h") return coin.change24h;
    return coin.change7d;
  };

  return (
    <div className="w-full bg-[var(--brand-gray)] px-[72px] max-w-[1440px] mx-auto">
      {/* TITLE */}
      <h2 className="mt-6 text-sm font-bold text-gray-500">Market Overview</h2>

      {/* TABLE WRAPPER */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2">
          {/* HEADER */}
          <thead>
            <tr className="text-left text-gray-500 text-sm">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Coins</th>
              <th className="px-4 py-2">Price</th>

              <th className="px-4 py-2">
                <div className="flex items-center gap-1">
                  Change
                  <div className="w-[80px]">
                    <TimeDropdown
                      timeFrame={timeFrame}
                      setTimeFrame={setTimeFrame}
                    />
                  </div>
                </div>
              </th>

              <th className="px-4 py-2">Trading Activity (24h)</th>

              <th className="px-4 py-2">Supply in Circulation</th>

              <th className="px-4 py-2">7D Performance</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {mockCoins.map((coin) => {
              const change = getChange(coin);

              return (
                <tr key={coin.rank} className="bg-white shadow-sm rounded-xl">
                  {/* Rank */}
                  <td className="px-4 py-4">{coin.rank}</td>

                  {/* Coin */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                        <Image
                          src={coin.image}
                          alt={coin.name}
                          width={24}
                          height={24}
                        />
                      </div>

                      <span className="font-medium">
                        {coin.name}{" "}
                        <span className="text-gray-400 text-xs">
                          ({coin.symbol})
                        </span>
                      </span>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-4">${coin.price}</td>

                  {/* Change */}
                  <td className="px-4 py-4">
                    <span
                      className={change > 0 ? "text-green-500" : "text-red-500"}
                    >
                      {change}%
                    </span>
                  </td>

                  {/* Volume */}
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>{coin.volume24h}B</span>
                        <span>{coin.marketcap}B</span>
                      </div>
                      <ProgressBar
                        value={(coin.volume24h / coin.marketcap) * 100}
                      />
                    </div>
                  </td>

                  {/* Supply */}
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>{coin.circulatingSupply}T</span>
                        <span>{coin.totalSupply}T</span>
                      </div>
                      <ProgressBar
                        value={
                          (coin.circulatingSupply / coin.totalSupply) * 100
                        }
                      />
                    </div>
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
