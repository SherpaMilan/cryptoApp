"use client";

import { ReactNode } from "react";

type Props = {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
};

export default function ActionButton({
  onClick,
  children,
  className = "",
  icon,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[var(--brand-gray)] px-4 text-sm font-semibold text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 active:translate-y-0 cursor-pointer dark:bg-white/[0.08] dark:text-white ${className}`}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
