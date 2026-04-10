export default function MarketDataSkeleton() {
  return (
      <div className="max-w-[1440px] mx-auto flex justify-center items-center h-[56px] px-[72px] gap-8">
        {[...Array(6)].map((_, idx) => (
          <div
            key={idx}
            className="h-5 w-16 bg-gray-100 rounded animate-pulse"
          />
        ))}
      </div>
    );
}