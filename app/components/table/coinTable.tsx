import Image from "next/image";
import { useState } from "react";
import TimeDropdown from "./timeDropdown";
import { TimeFrame } from "@/constants/timeChanges";
import MetricBar from "./metricBar";
import { formatCurrencyCompact } from "@/utils/formatCurrency";
import { useCurrency } from "@/context/currencyContext";
import { MdArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";
import { Coin } from "@/types/coin";
import { SparklineChart } from "../charts/sparklineChart";
const tdClass = "px-4 py-4";
const thClass = "px-4 py-2";

type Props = {
  coins: Coin[];
};

export default function CoinTable({ coins }: Props) {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("24h");
  const { defaultCurrency } = useCurrency();

  const getChange = (coin: (typeof coins)[number]) => {
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

  return (
    <div className="w-full max-w-[1440px] mx-auto bg-[var(--brand-gray)] px-[72px] ">
      <h2 className="mt-6 text-sm font-bold text-[var(--brand-purple-text)]">
        Market Overview
      </h2>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full table-fixed border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-sm text-[var(--brand-purple-text)]">
              <th className={`w-[40px] ${thClass}`}>#</th>

              <th className={`w-[220px] ${thClass}`}>Coins</th>

              <th className={`w-[120px] ${thClass}`}>Price</th>

              <th className={`w-[160px] align-middle ${thClass}`}>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <span className="text-sm">Change</span>

                  <div className="shrink-0">
                    <TimeDropdown
                      timeFrame={timeFrame}
                      setTimeFrame={setTimeFrame}
                    />
                  </div>
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
              const priceChange = getChange(coin);

              const change = priceChange ?? 0;
              const isPositive = change >= 0;
              const absChange = Math.abs(change);

              const textColor = isPositive
                ? "text-[var(--brand-green)]"
                : "text-[var(--brand-red)]";

              return (
                <tr
                  key={coin.id}
                  className="rounded-xl bg-white shadow-sm transition-all duration-200 ease-out hover:scale-[1.01] hover:shadow-lg hover:bg-gray-50 cursor-pointer"
                >
                  <td className={tdClass}>{index + 1}</td>

                  <td className={tdClass}>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full overflow-hidden bg-white flex items-center justify-center">
                        <Image
                          src={coin.image}
                          alt={coin.name}
                          width={28}
                          height={28}
                          className="object-cover"
                        />
                      </div>

                      <div className="flex min-w-0 flex-wrap items-center gap-1">
                        <span className="font-medium break-words">
                          {coin.name}
                        </span>

                        <span className="shrink-0 text-xs uppercase">
                          ({coin.symbol})
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className={`${tdClass} text-[15px]`}>
                    ${coin.current_price.toFixed(2)}
                  </td>

                  <td className={`${tdClass} text-[14px] ${textColor}`}>
                    <div className="flex items-center">
                      {isPositive ? (
                        <MdArrowDropUp className="h-5 w-5 flex-shrink-0" />
                      ) : (
                        <MdOutlineArrowDropDown className="h-5 w-5 flex-shrink-0" />
                      )}

                      <span>
                        {isPositive ? "+" : "-"}
                        {absChange.toFixed(2)}%
                      </span>
                    </div>
                  </td>

                  <td className={tdClass}>
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
                      isPositive={isPositive}
                    />
                  </td>

                  <td className={tdClass}>
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
                      isPositive={isPositive}
                    />
                  </td>

                  <td className={tdClass}>
                    <div className="flex items-center justify-end">
                      <div className="w-[120px] h-[40px] overflow-hidden">
                        <SparklineChart
                          data={coin.sparkline_in_7d.price}
                          isPositive={change >= 0}
                        />
                      </div>
                    </div>
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
