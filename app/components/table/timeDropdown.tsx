import { useEffect, useRef, useState } from "react";
import { TimeFrame, OPTIONS } from "@/constants/timeChanges";

type Props = {
  timeFrame: TimeFrame;
  setTimeFrame: (value: TimeFrame) => void;
};

export default function TimeDropdown({ timeFrame, setTimeFrame }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleSelect = (value: TimeFrame) => {
    setTimeFrame(value);
    setOpen(false);
  };

  // CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block text-left">
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-[72px] px-2 py-1 text-xs rounded-md bg-white border shadow-sm hover:bg-gray-50 transition"
      >
        <span>{timeFrame}</span>

        <svg
          className={`w-3 h-3 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 mt-1 w-[72px] bg-white border rounded-md shadow-lg z-50 overflow-hidden">
          {OPTIONS.map((option) => {
            const active = option === timeFrame;

            return (
              <button
                key={option}
                onClick={() => handleSelect(option as TimeFrame)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-gray-100 transition ${
                  active ? "text-black font-semibold" : "text-gray-600"
                }`}
              >
                <span>{option}</span>

                {active && (
                  <svg
                    className="w-3 h-3 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
