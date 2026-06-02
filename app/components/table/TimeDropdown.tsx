"use client";

import { useEffect, useRef, useState } from "react";
import { TimeFrame, OPTIONS } from "@/constants/timeChanges";

type Props = {
  timeFrame: TimeFrame;
  setTimeFrame: (value: TimeFrame) => void;
};

export default function TimeDropdown({ timeFrame, setTimeFrame }: Props) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);

  const ref = useRef<HTMLDivElement | null>(null);

  const handleSelect = (value: TimeFrame) => {
    setTimeFrame(value);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlighted((p) => (p < OPTIONS.length - 1 ? p + 1 : 0));
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlighted((p) => (p > 0 ? p - 1 : OPTIONS.length - 1));
      }

      if (e.key === "Enter") {
        e.preventDefault();
        handleSelect(OPTIONS[highlighted] as TimeFrame);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, highlighted]);

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        onClick={() => {
          setOpen((prev) => {
            const next = !prev;
            if (next) setHighlighted(0);
            return next;
          });
        }}
        className="
          flex items-center justify-between
          w-[72px] px-2 py-1
          text-xs
          rounded-md
          bg-card
          text-foreground
          border border-border
          hover:bg-card-hover
          transition
          cursor-pointer
        "
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

      {open && (
        <div
          className="
            absolute left-0 mt-1
            w-[72px]
            bg-card/95 backdrop-blur-md
            border border-border
            rounded-md
            shadow-lg
            z-50
            overflow-hidden
          "
        >
          {OPTIONS.map((option, index) => {
            const active = option === timeFrame;
            const isHighlighted = index === highlighted;

            return (
              <button
                key={option}
                onClick={() => handleSelect(option as TimeFrame)}
                onMouseEnter={() => setHighlighted(index)}
                className={`
                  w-full flex items-center justify-between
                  px-3 py-2 text-xs
                  transition
                  cursor-pointer
                  ${isHighlighted ? "bg-card-hover" : "hover:bg-card-hover"}
                  ${active ? "text-foreground font-semibold" : "text-foreground/70"}
                `}
              >
                <span>{option}</span>

                {active && (
                  <svg
                    className="w-3 h-3 text-green-400"
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
