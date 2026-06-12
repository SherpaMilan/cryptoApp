"use client";

type ViewMode = "all" | "watchlist" | "recent";

type Props = {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
};

const tabs: ViewMode[] = ["all", "watchlist", "recent"];

export default function CoinFilterTabs({ viewMode, setViewMode }: Props) {
  return (
    <div className="px-4 pb-2">
      <div className="relative flex items-center bg-white/70 backdrop-blur-md border border-black/10 rounded-xl p-1 shadow-sm">
        <div
          className={`absolute top-1 bottom-1 w-1/3 rounded-lg bg-[var(--brand-purple)] shadow-md transition-all duration-300 ease-out ${
            viewMode === "all"
              ? "left-1"
              : viewMode === "watchlist"
                ? "left-1/3"
                : "left-2/3"
          }`}
        />

        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setViewMode(tab)}
            className={`
              relative z-10 flex-1 py-2 text-xs font-medium capitalize transition-colors duration-200
              ${
                viewMode === tab
                  ? "text-white font-semibold"
                  : "text-gray-700 hover:text-gray-900"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
