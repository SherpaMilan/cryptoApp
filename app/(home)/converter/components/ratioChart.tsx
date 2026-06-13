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

function formatDate(v: unknown) {
  if (typeof v !== "number" && typeof v !== "string") return "";

  const d = new Date(v);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");

  return `${day}-${month}`;
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
              if (!value) return "";

              return new Date(value).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              });
            }}
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;

              const d = payload[0].payload as ChartPoint;

              const date = new Date(String(label)).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              });

              return (
                <div className="bg-white/95 dark:bg-zinc-900/95 border border-black/10 dark:border-white/10 rounded-lg shadow-lg px-3 py-2 min-w-[160px]">
                  <div className="text-[11px] text-gray-500 mb-2">{date}</div>

                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    1 {fromSymbol?.toUpperCase()} ={" "}
                    <span className="text-[var(--brand-purple)] font-semibold">
                      {d.ratio.toFixed(4)}
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
