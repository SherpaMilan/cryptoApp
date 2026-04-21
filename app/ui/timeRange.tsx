"use client";

import { useState } from "react";

export default function TimeRange() {
  const timeRanges = ["1D", "7D", "14D", "1M", "1Y", "5Y"];
  const [selected, setSelected] = useState("1D");

  return (
    <div className="bg-[var(--brand-purple-light)] h-full rounded-md flex gap-2 p-1">
      {timeRanges.map((range) => {
        const isActive = selected === range;

        return (
          <div key={range} className="relative rounded-md">
            <button
              onClick={() => setSelected(range)}
              className={`
                relative z-10 px-5 py-2 text-sm rounded-md transition
                ${
                  isActive
                    ? "bg-[var(--brand-purple)] text-[var(--brand-black)] shadow-[4px_4px_20px_8px_#7878FA26]"
                    : "text-[var(--brand-purple)] hover:bg-[rgba(120,120,255,0.08)]"
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
