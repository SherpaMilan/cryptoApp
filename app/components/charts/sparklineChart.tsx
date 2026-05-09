"use client";

import { AreaChart, Area } from "recharts";

type Props = {
  data: number[];
  isPositive: boolean;
};

export function SparklineChart({ data, isPositive }: Props) {
  if (!data?.length) return null;

  // Find range of values (used for scaling)
  const min = Math.min(...data);
  const max = Math.max(...data);

  const formatted = data.map((price, index) => ({
    index,

    // Normalize values to 0–100 range so the chart
    // always fits nicely in fixed height (sparkline effect)
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
