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
      {ranges.map((range) => (
        <button
          key={range}
          onClick={() => onChange(range as TimeRangeKey)}
          className={`px-3 py-1 rounded text-xs cursor-pointer ${
            selected === range
              ? "bg-black text-white"
              : "bg-black/5 text-gray-600 hover:bg-black/10"
          }`}
        >
          {range}
        </button>
      ))}
    </div>
  );
}
