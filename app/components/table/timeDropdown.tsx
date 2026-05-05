import { useState } from "react";
import { TimeFrame, OPTIONS } from "@/constants/timeChanges";

type Props = {
  timeFrame: TimeFrame;
  setTimeFrame: (value: TimeFrame) => void;
};

export default function TimeDropdown({ timeFrame, setTimeFrame }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-700 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:bg-white/20 transition-all"
      >
        <span>{timeFrame}</span>

        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* BACKDROP */}
      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}

      {/* DROPDOWN */}
      {open && (
        <div className="absolute left-0 mt-2 z-50 w-max min-w-[70px] rounded-2xl bg-white/15 backdrop-blur-3xl border border-white/25 shadow-[0_20px_60px_rgba(0,0,0,0.18)] overflow-hidden">
          {OPTIONS.map((opt) => {
            const active = timeFrame === opt;

            return (
              <div
                key={opt}
                onClick={() => {
                  setTimeFrame(opt as TimeFrame);
                  setOpen(false);
                }}
                className={`flex items-center justify-between px-3 py-2 text-xs cursor-pointer whitespace-nowrap transition ${active ? "bg-white/30 text-gray-900 font-medium" : "text-gray-700 hover:bg-white/20"}`}
              >
                <span>{opt}</span>

                {active && (
                  <svg
                    className="w-3 h-3 text-teal-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 5.29a1 1 0 010 1.415l-7.07 7.07a1 1 0 01-1.415 0l-3.535-3.536a1 1 0 011.414-1.414l2.828 2.828 6.364-6.364a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
