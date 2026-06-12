import { TIME_RANGES, TimeRangeKey } from "@/constants/timeRanges";
import TimeRangeSelector from "@/components/coinPage/TimeRangeSelector";
import RatioIcon from "./ratioIcon";
import { Coin } from "@/types/coin";

type Props = {
  timeRange: TimeRangeKey;
  setTimeRange: (v: TimeRangeKey) => void;
  fromCoin: Coin | null;
  toCoin: Coin | null;
};

export default function ChartPanel({
  timeRange,
  setTimeRange,
  fromCoin,
  toCoin,
}: Props) {
  return (
    <div
      className="
        flex-1 rounded-2xl p-6 min-h-[420px]
        flex flex-col gap-4

        bg-white/70 dark:bg-zinc-900/60
        border border-black/5 dark:border-white/10
        backdrop-blur-md
      "
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RatioIcon />

          <h2 className="text-sm font-medium text-gray-900 dark:text-white">
            {fromCoin?.symbol.toUpperCase() || "—"}/
            {toCoin?.symbol.toUpperCase() || "—"}
          </h2>
        </div>

        <div className="flex flex-col text-right">
          <p className="text-sm text-gray-600 dark:text-gray-300">0.0623</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Past {TIME_RANGES[timeRange]}
          </p>
        </div>
      </div>

      <TimeRangeSelector
        ranges={Object.keys(TIME_RANGES)}
        selected={timeRange}
        onChange={setTimeRange}
      />

      <div
        className="
          w-full flex-1 rounded-xl
          bg-black/5 dark:bg-white/5
          border border-black/5 dark:border-white/10
          flex items-center justify-center
          text-gray-500 dark:text-gray-400
        "
        role="img"
      >
        Chart Container (will integrate later)
      </div>
    </div>
  );
}
