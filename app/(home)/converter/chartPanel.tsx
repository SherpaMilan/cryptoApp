import { TIME_RANGES, TimeRangeKey } from "@/constants/timeRanges";
import TimeRangeSelector from "@/components/coinPage/TimeRangeSelector";
import RatioIcon from "./ratioIcon";

export default function ChartPanel({
  timeRange,
  setTimeRange,
}: {
  timeRange: TimeRangeKey;
  setTimeRange: (v: TimeRangeKey) => void;
}) {
  return (
    <div className="flex-1 rounded-2xl p-6 min-h-[420px] flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RatioIcon />
          <h2 className="text-sm font-medium">BTC/ETH</h2>
        </div>

        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">0.0623</p>
          <p className="text-sm text-muted-foreground">
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
        className="w-full flex-1 bg-[var(--brand-white)] rounded-xl flex items-center justify-center text-muted-foreground"
        role="img"
      >
        Chart Container (will integrate later)
      </div>
    </div>
  );
}
