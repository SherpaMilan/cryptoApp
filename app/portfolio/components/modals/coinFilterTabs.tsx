import {
  ChartLineDownIcon,
  ChartLineUpIcon,
  CoinsIcon,
} from "@phosphor-icons/react";

type Props = {
  coinCount: number;
  activeFilter: "top" | "gainers" | "losers";
  onChangeFilter: (filter: "top" | "gainers" | "losers") => void;
};

export default function CoinFilterTabs({
  coinCount,
  activeFilter,
  onChangeFilter,
}: Props) {
  const baseClass =
    "cursor-pointer select-none flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all duration-200 hover:-translate-y-[1px] active:scale-[0.98]";

  const activeClass =
    "border border-[var(--brand-purple)] bg-[var(--brand-purple)] text-white shadow-[0_8px_20px_rgba(124,58,237,0.25)]";

  const inactiveClass =
    "border border-black/10 bg-white/70 text-muted-foreground hover:border-[var(--brand-purple)]/20 hover:bg-[var(--brand-purple)]/5 hover:text-foreground dark:border-white/10 dark:bg-white/[0.03]";

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => onChangeFilter("top")}
        className={`${baseClass} ${
          activeFilter === "top" ? activeClass : inactiveClass
        }`}
      >
        <CoinsIcon size={18} />
        Top {coinCount}
      </button>

      <button
        type="button"
        onClick={() => onChangeFilter("gainers")}
        className={`${baseClass} ${
          activeFilter === "gainers" ? activeClass : inactiveClass
        }`}
      >
        <ChartLineUpIcon size={18} />
        Gainers
      </button>

      <button
        type="button"
        onClick={() => onChangeFilter("losers")}
        className={`${baseClass} ${
          activeFilter === "losers" ? activeClass : inactiveClass
        }`}
      >
        <ChartLineDownIcon size={18} />
        Losers
      </button>
    </div>
  );
}
