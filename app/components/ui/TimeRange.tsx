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
    <div className="bg-[var(--time-bg)] backdrop-blur-md rounded-md flex gap-2 p-1 border border-[var(--time-border)] shadow-md">
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
                    ? "bg-[var(--brand-purple)] text-[var(--time-active-text)] shadow-[var(--time-active-shadow)]"
                    : "text-[var(--time-inactive)] hover:bg-[var(--time-hover)]"
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
