"use client";

import { TIME_RANGES, TimeRangeKey } from "@/constants/timeRanges";

export default function TimeRange({
  value,
  onChange,
}: {
  value: TimeRangeKey;
  onChange: (val: TimeRangeKey) => void;
}) {
  return (
    <div className="bg-[rgba(120,120,255,0.08)] backdrop-blur-md rounded-md flex gap-2 p-1 border border-white/10 shadow-md">
      {(Object.keys(TIME_RANGES) as TimeRangeKey[]).map((range) => {
        const isActive = value === range;

        return (
          <div key={range} className="relative rounded-md">
            <button
              onClick={() => onChange(range)}
              className={`
                relative z-10 px-5 py-2 text-sm rounded-md transition
                ${
                  isActive
                    ? "bg-[var(--brand-purple)] text-[var(--brand-black)] shadow-[4px_4px_20px_8px_#7878FA26]"
                    : "text-[var(--brand-black)] hover:bg-[rgba(120,120,255,0.08)]"
                }
              `}
            >
              {range}
            </button>
          </div>
        );
      })}
    </div>
  );
}
