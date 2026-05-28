"use client";

export default function CoinPageChartSkeleton() {
  return (
    <div className="relative h-[420px] w-full rounded-2xl overflow-hidden border border-black/5 bg-white/30">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-black/5 via-transparent to-black/5" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="h-4 w-40 bg-black/10 rounded animate-pulse mb-3" />
        <div className="h-3 w-28 bg-black/10 rounded animate-pulse" />
      </div>

      <div className="absolute bottom-3 left-0 right-0 px-6 flex justify-between opacity-60">
        <div className="h-3 w-10 bg-black/10 rounded animate-pulse" />
        <div className="h-3 w-10 bg-black/10 rounded animate-pulse" />
        <div className="h-3 w-10 bg-black/10 rounded animate-pulse" />
      </div>
    </div>
  );
}
