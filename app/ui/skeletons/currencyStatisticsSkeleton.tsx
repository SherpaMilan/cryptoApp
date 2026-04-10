export default function CurrencyStatisticsSkeleton() {
  return (
    <div className="w-full bg-[var(--brand-gray)] py-[30px]">
      <div className="max-w-[1440px] mx-auto px-[72px]">
        <div className="text-[var(--brand-purple)] mb-9">
          Select the currency to view statistics
        </div>

        <div className="flex gap-4 mt-4 overflow-x-auto whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="w-[252px] h-[78px] flex flex-row items-center p-2 rounded bg-[var(--brand-white)] flex-shrink-0 animate-pulse"
            >
              <div className="w-[28px] h-[28px] rounded-full bg-gray-300" />

              <div className="flex flex-col justify-between ml-4 gap-2 flex-1">
                <div className="h-4 w-[120px] bg-gray-300 rounded" />

                <div className="flex items-center gap-2">
                  <div className="h-3 w-[80px] bg-gray-300 rounded" />
                  <div className="h-3 w-[50px] bg-gray-300 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
