"use client";

import { ChartLineUpIcon, CoinsIcon } from "@phosphor-icons/react";

import { PortfolioView } from "../overview/types";

type Props = {
  activeView: PortfolioView;
  onChange: (view: PortfolioView) => void;
};

export default function PortfolioViewTabs({ activeView, onChange }: Props) {
  return (
    <div className="inline-flex items-center gap-1 rounded-xl border border-black/[0.06] bg-black/[0.025] p-1 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:border-white/[0.08] dark:bg-white/[0.035]">
      <button
        type="button"
        onClick={() => onChange("assets")}
        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all duration-200 ${
          activeView === "assets"
            ? "bg-background text-foreground shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <CoinsIcon
          size={15}
          weight={activeView === "assets" ? "fill" : "regular"}
        />
        Assets
      </button>

      <button
        type="button"
        onClick={() => onChange("analytics")}
        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all duration-200 ${
          activeView === "analytics"
            ? "bg-background text-foreground shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <ChartLineUpIcon
          size={15}
          weight={activeView === "analytics" ? "fill" : "regular"}
        />
        Analytics
      </button>
    </div>
  );
}
