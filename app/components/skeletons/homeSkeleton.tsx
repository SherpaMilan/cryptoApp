export default function HomePageSkeleton() {
  return (
    <div className="w-full bg-white py-6">
      <div className="max-w-[1440px] mx-auto px-[72px]">
        {/* Title */}
        <div className="h-5 w-1/3 rounded mb-6 animate-shimmer" />

        {/* Horizontal cards */}
        <div className="flex gap-4 overflow-hidden mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-[252px] h-[78px] rounded animate-shimmer"
            />
          ))}
        </div>

        {/* Charts */}
        <div className="flex gap-4 h-[330px] mb-4">
          <div className="flex-1 rounded animate-shimmer" />
          <div className="flex-1 rounded animate-shimmer" />
        </div>

        {/* Bottom chips */}
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-8 w-12 rounded animate-shimmer" />
          ))}
        </div>
      </div>
    </div>
  );
}
