"use client";

import Image from "next/image";
import { MdArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";

import { Coin } from "@/types/coin";
import MetricBar from "./metricBar";
import { SparklineChart } from "../charts/sparklineChart";
import { formatCurrencyCompact } from "@/utils/formatCurrency";

type Props = {
  coin: Coin;
  index: number;
  change: number;
  isPositive: boolean;
  currency: string;
  tdClass: string;
};

export default function CoinTableRow({
  coin,
  index,
  change,
  isPositive,
  currency,
  tdClass,
}: Props) {
  const absChange = Math.abs(change);

  const textColor = isPositive
    ? "text-[var(--brand-green)]"
    : "text-[var(--brand-red)]";

  return (
    <tr className="rounded-xl bg-white shadow-sm transition-all duration-200 hover:scale-[1.01] hover:shadow-lg hover:bg-gray-50 cursor-pointer">
      <td className={tdClass}>{index + 1}</td>

      <td className={tdClass}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full overflow-hidden bg-white flex items-center justify-center">
            <Image src={coin.image} alt={coin.name} width={28} height={28} />
          </div>

          <div className="flex min-w-0 flex-wrap items-center gap-1">
            <span className="font-medium">{coin.name}</span>
            <span className="text-xs uppercase">({coin.symbol})</span>
          </div>
        </div>
      </td>

      <td className={`${tdClass} text-[15px]`}>
        ${coin.current_price?.toFixed(2) ?? "0.00"}
      </td>

      <td className={`${tdClass} text-[14px] ${textColor}`}>
        <div className="flex items-center">
          {isPositive ? (
            <MdArrowDropUp className="h-5 w-5" />
          ) : (
            <MdOutlineArrowDropDown className="h-5 w-5" />
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
          currentLabel={formatCurrencyCompact(coin.total_volume, currency)}
          maxLabel={formatCurrencyCompact(coin.market_cap, currency)}
          isPositive={isPositive}
        />
      </td>

      <td className={tdClass}>
        <MetricBar
          current={coin.circulating_supply}
          max={coin.total_supply}
          currentLabel={formatCurrencyCompact(
            coin.circulating_supply,
            currency,
          )}
          maxLabel={formatCurrencyCompact(coin.total_supply, currency)}
          isPositive={isPositive}
        />
      </td>

      <td className={tdClass}>
        <div className="flex justify-end">
          <div className="w-[120px] h-[40px] overflow-hidden">
            <SparklineChart
              data={coin.sparkline_in_7d?.price ?? []}
              isPositive={change >= 0}
            />
          </div>
        </div>
      </td>
    </tr>
  );
}
