"use client";

import { AreaChart, Area } from "recharts";

type Props = {
  data: number[];
  isPositive: boolean;
};

export function SparklineChart({ data, isPositive }: Props) {
  //  safety check
  if (!Array.isArray(data) || data.length < 2) return null;

  // remove invalid values
  const clean = data.filter((n) => typeof n === "number" && !isNaN(n));
  if (clean.length < 2) return null;

  const min = Math.min(...clean);
  const max = Math.max(...clean);

  const formatted = clean.map((price, index) => ({
    index,
    price: max === min ? 50 : ((price - min) / (max - min)) * 100,
  }));

  const strokeColor = isPositive
    ? "var(--metric-positive)"
    : "var(--metric-negative)";

  const fillColor = isPositive
    ? "var(--metric-positive-light)"
    : "var(--metric-negative-light)";

  return (
    <AreaChart width={120} height={40} data={formatted}>
      <Area
        type="monotone"
        dataKey="price"
        stroke={strokeColor}
        fill={fillColor}
        strokeWidth={2}
      />
    </AreaChart>
  );
}
