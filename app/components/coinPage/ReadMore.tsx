"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  text?: string;
  collapsedHeight?: number;
};

export default function ReadMore({ text, collapsedHeight = 120 }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    setIsOverflowing(ref.current.scrollHeight > collapsedHeight);
  }, [text, collapsedHeight]);

  if (!text) {
    return (
      <p className="text-xs text-foreground leading-relaxed">
        No description available.
      </p>
    );
  }

  return (
    <div className="relative text-xs text-foreground/70 leading-6 text-justify">
      <div
        ref={ref}
        className="transition-all duration-500 ease-in-out pr-2"
        style={{
          maxHeight: isExpanded ? 260 : collapsedHeight,
          overflowY: isExpanded ? "auto" : "hidden",
        }}
      >
        {text}
      </div>

      {!isExpanded && isOverflowing && (
        <div
          className="
            absolute bottom-8 left-0 right-0 h-10
            pointer-events-none
            bg-gradient-to-t
            from-background
            to-transparent
          "
        />
      )}

      {isOverflowing && (
        <button
          onClick={() => setIsExpanded((p) => !p)}
          className="
            mt-2 text-[11px] font-medium
            text-foreground/80
            hover:text-foreground
            cursor-pointer
          "
        >
          {isExpanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}
