"use client";

import { useState } from "react";

type SwapIconProps = {
  className?: string;
  onClick?: () => void;
};

export default function SwapIcon({ className = "", onClick }: SwapIconProps) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(true);
    onClick?.();

    setTimeout(() => {
      setActive(false);
    }, 200);
  };

  return (
    <svg
      onClick={handleClick}
      onMouseDown={(e) => e.preventDefault()}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      className={`
        cursor-pointer select-none
        transition-all duration-200 ease-in-out
        hover:scale-110 active:scale-95
        hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.35)]
        ${className}
      `}
      fill="none"
    >
      <circle
        cx="24"
        cy="24"
        r="23"
        fill={active ? "var(--brand-purple)" : "var(--brand-white)"}
        stroke="var(--brand-purple)"
        strokeWidth="2"
      />

      {/* ARROWS */}
      <path
        d="M22.5 28L18.5 32L14.5 28M18.5 32L18.5 18C18.5 16.8954 19.3954 16 20.5 16"
        stroke={active ? "var(--brand-white)" : "var(--brand-purple)"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M33.5 20L29.5 16L25.5 20M29.5 16L29.5 31C29.5 32.1046 28.6046 33 27.5 33"
        stroke={active ? "var(--brand-white)" : "var(--brand-purple)"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
