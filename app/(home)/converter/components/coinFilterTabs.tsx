"use client";

type Props = {
  viewMode: "all" | "watchlist";
  setViewMode: (mode: "all" | "watchlist") => void;
};

export default function CoinFilterTabs({ viewMode, setViewMode }: Props) {
  return (
    <div className="px-4 pb-2">
      <div className="inline-flex bg-black/5 rounded-lg p-[3px] gap-[2px]">
        <button
          onClick={() => setViewMode("all")}
          className={`
            px-3 py-1.5 text-xs rounded-md transition
            ${
              viewMode === "all"
                ? "bg-[var(--brand-purple)] text-white border-0"
                : "text-muted-foreground hover:bg-black/5"
            }
          `}
        >
          All
        </button>

        <button
          onClick={() => setViewMode("watchlist")}
          className={`
            px-3 py-1.5 text-xs rounded-md transition
            ${
              viewMode === "watchlist"
                ? "bg-[var(--brand-purple)] text-white border-0"
                : "text-muted-foreground hover:bg-black/5"
            }
          `}
        >
          Watchlist
        </button>
      </div>
    </div>
  );
}
