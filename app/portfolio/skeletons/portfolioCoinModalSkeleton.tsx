export default function PortfolioCoinModalSkeleton() {
  return (
    <>
      <div className="flex flex-col p-7">
        <div className="h-12 animate-pulse rounded-2xl bg-muted/70" />

        <div className="mt-5 flex gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-4 w-14 animate-pulse rounded-full bg-muted/70"
            />
          ))}
        </div>

        <div className="mt-6 space-y-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-2xl px-3 py-3"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 animate-pulse rounded-full bg-muted/70" />

                <div className="space-y-2">
                  <div className="h-4 w-28 animate-pulse rounded bg-muted/70" />
                  <div className="h-3 w-16 animate-pulse rounded bg-muted/50" />
                </div>
              </div>

              <div className="h-8 w-8 animate-pulse rounded-full bg-muted/70" />
            </div>
          ))}
        </div>
      </div>

      <div className="p-7">
        <div className="space-y-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex justify-between">
              <div className="h-4 w-24 animate-pulse rounded bg-muted/70" />
              <div className="h-4 w-20 animate-pulse rounded bg-muted/70" />
            </div>
          ))}

          <div className="pt-2">
            <div className="h-4 w-24 animate-pulse rounded bg-muted/70" />

            <div className="mt-4 h-[180px] animate-pulse rounded-2xl bg-muted/50" />
          </div>

          <div className="pt-2">
            <div className="h-4 w-20 animate-pulse rounded bg-muted/70" />

            <div className="mt-3 space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-muted/50" />
              <div className="h-3 w-[90%] animate-pulse rounded bg-muted/50" />
              <div className="h-3 w-[75%] animate-pulse rounded bg-muted/50" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
