"use client";

import { TimeRangeKey } from "@/constants/timeRanges";

type Props = {
  ranges: string[];
  selected: TimeRangeKey;
  onChange: (range: TimeRangeKey) => void;
};

export default function TimeRangeSelector({
  ranges,
  selected,
  onChange,
}: Props) {
  return (
    <div className="flex gap-2 mb-4">
      {ranges.map((range) => {
        const isActive = selected === range;

        return (
          <button
            key={range}
            onClick={() => onChange(range as TimeRangeKey)}
            className={`px-3 py-1 rounded text-xs cursor-pointer transition ${
              isActive
                ? "bg-foreground text-background shadow-sm"
                : "bg-card/40 text-foreground hover:bg-card/70"
            }`}
          >
            {range}
          </button>
        );
      })}
    </div>
  );
}
