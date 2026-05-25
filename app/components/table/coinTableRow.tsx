"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";

import { Coin } from "@/types/coin";
import MetricBar from "./metricBar";
import { SparklineChart } from "../charts/sparklineChart";
import { formatCurrencyCompact } from "@/utils/formatCurrency";
import { useCurrency } from "@/context/currencyContext";

type Props = {
  coin: Coin;
  index: number;
  change: number;
  isPositive: boolean;
  tdClass: string;
};

export default function CoinTableRow({
  coin,
  index,
  change,
  isPositive,
  tdClass,
}: Props) {
  const { currencySymbol, currencyKey } = useCurrency();
  const router = useRouter();

  const absChange = Math.abs(change);

  const textColor = isPositive
    ? "text-[var(--brand-green)]"
    : "text-[var(--brand-red)]";

  return (
    <tr
      onClick={() => router.push(`/coin/${coin.id}`)}
      className="bg-white shadow-sm transition-all duration-200 cursor-pointer
                 hover:bg-gray-50 hover:shadow-md hover:scale-[1.01]"
    >
      <td className={tdClass}>{index + 1}</td>
      <td className={tdClass}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full overflow-hidden bg-white flex items-center justify-center">
            <Image src={coin.image} alt={coin.name} width={28} height={28} />
          </div>

          <div className="flex items-center gap-1 min-w-0">
            <span className="font-medium text-[var(--brand-black)]">
              {coin.name}
            </span>
            <span className="text-xs uppercase text-gray-500">
              ({coin.symbol})
            </span>
          </div>
        </div>
      </td>

      <td className={`${tdClass} text-[15px]`}>
        {currencySymbol}&nbsp;
        {coin.current_price?.toFixed(2) ?? "0.00"}
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
          currentLabel={formatCurrencyCompact(
            coin.total_volume,
            currencyKey,
            currencySymbol,
          )}
          maxLabel={formatCurrencyCompact(
            coin.market_cap,
            currencyKey,
            currencySymbol,
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
            currencyKey,
            currencySymbol,
          )}
          maxLabel={formatCurrencyCompact(
            coin.total_supply,
            currencyKey,
            currencySymbol,
          )}
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
