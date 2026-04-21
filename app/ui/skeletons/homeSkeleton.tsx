export default function HomePageSkeleton() {
  return (
    <div className="w-full bg-[var(--brand-gray)] py-6">
      <div className="max-w-[1440px] mx-auto px-[72px] animate-pulse">
        <div className="h-5 w-1/3 bg-white rounded mb-6" />

        <div className="flex gap-4 overflow-hidden mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-[252px] h-[78px] bg-white rounded" />
          ))}
        </div>

        <div className="flex gap-4 h-[330px] mb-4">
          <div className="flex-1 bg-white rounded" />
          <div className="flex-1 bg-white rounded" />
        </div>

        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-8 w-12 bg-white rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
