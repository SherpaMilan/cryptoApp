"use client";

import {
  Area,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { CHART_COLORS } from "@/constants/chartColors";

type ChartPoint = {
  timestamp: number;
  ratio: number;
};

type Props = {
  data: ChartPoint[];
  fromSymbol?: string;
  toSymbol?: string;
};

function formatDate(value: unknown) {
  if (typeof value !== "number") return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
  });
}

export default function RatioChart({ data, fromSymbol, toSymbol }: Props) {
  const isDark =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const colors = isDark ? CHART_COLORS.dark : CHART_COLORS.light;

  return (
    <div className="w-full h-[300px] relative overflow-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
        >
          <XAxis
            dataKey="timestamp"
            type="number"
            scale="time"
            domain={["dataMin", "dataMax"]}
            tickFormatter={formatDate}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            minTickGap={30}
            tick={{
              fontSize: 11,
              fill: "var(--chart-muted)",
            }}
          />

          <YAxis hide domain={["auto", "auto"]} />

          <defs>
            <linearGradient id="fillRatio" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.primary} stopOpacity={0.35} />
              <stop
                offset="95%"
                stopColor={colors.primary}
                stopOpacity={0.02}
              />
            </linearGradient>
          </defs>

          <Tooltip
            labelFormatter={(value) => {
              const date = new Date(Number(value));

              if (Number.isNaN(date.getTime())) {
                return "Invalid date";
              }

              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              });
            }}
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;

              const point = payload[0].payload as ChartPoint;

              const date = new Date(Number(label));

              const formattedDate = Number.isNaN(date.getTime())
                ? "Invalid date"
                : date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  });

              return (
                <div className="bg-white/95 dark:bg-zinc-900/95 border border-black/10 dark:border-white/10 rounded-lg shadow-lg px-3 py-2 min-w-[160px]">
                  <div className="text-[11px] text-gray-500 mb-2">
                    {formattedDate}
                  </div>

                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    1 {fromSymbol?.toUpperCase()} ={" "}
                    <span className="text-[var(--brand-purple)] font-semibold">
                      {point.ratio.toFixed(4)}
                    </span>{" "}
                    {toSymbol?.toUpperCase()}
                  </div>
                </div>
              );
            }}
          />

          <Area
            dataKey="ratio"
            type="natural"
            stroke={colors.primary}
            fill="url(#fillRatio)"
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
