export default function MarketStatsBarSkeleton() {
  return (
    <div className="w-full bg-[var(--brand-dark-purple)]">
      <div className="max-w-[1440px] mx-auto flex justify-center  items-center h-[56px] px-[72px] gap-8">
        <div className="flex items-center gap-1.5 animate-pulse">
          <div className="w-4 h-4 rounded-sm bg-gray-300" />
          <div className="w-10 h-3 rounded bg-gray-300" />
          <div className="w-8 h-3 rounded bg-gray-300 ml-1" />
        </div>

        <div className="flex items-center gap-1.5 animate-pulse">
          <div className="w-4 h-4 rounded-sm bg-gray-300" />
          <div className="w-12 h-3 rounded bg-gray-300" />
          <div className="w-8 h-3 rounded bg-gray-300 ml-1" />
        </div>

        <div className="flex items-center gap-1.5 animate-pulse">
          <div className="w-28 h-3 rounded bg-gray-300" />
        </div>

        <div className="animate-pulse">
          <div className="w-32 h-3 rounded bg-gray-300" />
        </div>

        <div className="flex items-center gap-1.5 animate-pulse">
          <div className="w-4 h-4 rounded-full bg-gray-300" />
          <div className="w-10 h-3 rounded bg-gray-300" />
        </div>

        <div className="flex items-center gap-1.5 animate-pulse">
          <div className="w-4 h-4 rounded-full bg-gray-300" />
          <div className="w-10 h-3 rounded bg-gray-300" />
        </div>
      </div>
    </div>
  );
}
