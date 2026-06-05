"use client";

import { useState } from "react";

import { TimeFrame } from "@/constants/timeChanges";
import { Coin } from "@/types/coin";

import TimeDropdown from "@/components/table/TimeDropdown";
import CoinTableRow from "@/components/table/CoinTableRow";

const tdClass = "px-4 py-4";
const thClass =
  "px-4 py-2 sticky top-0 z-20 bg-background/95 backdrop-blur-md  text-foreground";

type Props = {
  coins: Coin[];
};

export default function CoinTable({ coins }: Props) {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("24h");

  const getChange = (coin: Coin) => {
    switch (timeFrame) {
      case "1h":
        return coin.price_change_percentage_1h_in_currency;
      case "7d":
        return coin.price_change_percentage_7d_in_currency;
      case "24h":
      default:
        return coin.price_change_percentage_24h_in_currency;
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-[72px] text-foreground">
      <h2 className="mt-6 text-sm font-bold sticky text-foreground">
        Market Overview
      </h2>

      <div className="mt-6 overflow-x-auto max-h-[720px] relative">
        <table className="w-full table-fixed border-separate border-spacing-y-2 ">
          <thead>
            <tr className="text-left text-sm text-foreground">
              <th className={`w-[40px] ${thClass}`}>#</th>
              <th className={`w-[220px] ${thClass}`}>Coins</th>
              <th className={`w-[120px] ${thClass}`}>Price</th>

              <th className={`w-[160px] ${thClass}`}>
                <div className="flex items-center gap-2">
                  Change
                  <TimeDropdown
                    timeFrame={timeFrame}
                    setTimeFrame={setTimeFrame}
                  />
                </div>
              </th>

              <th className={`w-[260px] ${thClass}`}>
                24h Volume / Market Cap
              </th>

              <th className={`w-[260px] ${thClass}`}>Supply / Total</th>

              <th className={`w-[120px] ${thClass}`}>7D Trend</th>
            </tr>
          </thead>

          <tbody>
            {coins.map((coin, index) => {
              const change = getChange(coin) ?? 0;
              const isPositive = change >= 0;

              return (
                <CoinTableRow
                  key={coin.id}
                  coin={coin}
                  index={index}
                  change={change}
                  isPositive={isPositive}
                  tdClass={tdClass}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
