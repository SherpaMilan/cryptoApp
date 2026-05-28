"use client";

import { FaArrowUp, FaArrowDown } from "react-icons/fa6";

type Props = {
  price: number;
  change24h: number;
  currencySymbol: string;
  marketCap: number;
};

export default function PriceBlock({
  price,
  change24h,
  currencySymbol,
  marketCap,
}: Props) {
  const isPositive = change24h >= 0;

  return (
    <div className="flex items-end justify-between">
      <div>
        <p className="text-4xl font-bold">
          {currencySymbol} {price.toLocaleString()}
        </p>

        <div className="flex items-center gap-2 mt-2">
          {isPositive ? (
            <FaArrowUp className="text-green-500 text-xs" />
          ) : (
            <FaArrowDown className="text-red-500 text-xs" />
          )}

          <span className={isPositive ? "text-green-500" : "text-red-500"}>
            {change24h.toFixed(2)}% (24h)
          </span>
        </div>
      </div>

      <div className="text-right">
        <p className="text-xs text-gray-500">Market Cap</p>
        <p className="font-semibold">
          {currencySymbol} {marketCap.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
