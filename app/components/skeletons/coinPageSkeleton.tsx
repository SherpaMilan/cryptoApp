"use client";

const card =
  "rounded-2xl bg-white/30 backdrop-blur-xl border border-black/5 animate-pulse";

export default function CoinPageSkeleton() {
  return (
    <main className="w-full max-w-[1440px] mx-auto bg-[var(--brand-gray)] px-[72px] py-6 flex flex-col gap-6">
      <section className="grid grid-cols-3 gap-6">
        <div
          className={`${card} p-5 flex flex-col items-center justify-center gap-3`}
        >
          <div className="w-20 h-20 rounded-md bg-black/10" />
          <div className="w-24 h-3 bg-black/10 rounded" />
          <div className="w-16 h-2 bg-black/10 rounded" />
        </div>

        <div
          className={`${card} p-5 flex flex-col items-center justify-center gap-4`}
        >
          <div className="w-16 h-3 bg-black/10 rounded" />
          <div className="w-32 h-6 bg-black/10 rounded" />
          <div className="flex gap-4">
            <div className="w-12 h-3 bg-black/10 rounded" />
            <div className="w-12 h-3 bg-black/10 rounded" />
          </div>
        </div>

        <div className={`${card} p-5 flex flex-col gap-3`}>
          <div className="w-24 h-3 bg-black/10 rounded mx-auto" />

          <div className="space-y-3 mt-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="w-20 h-3 bg-black/10 rounded" />
                <div className="w-16 h-3 bg-black/10 rounded" />
              </div>
            ))}
          </div>

          <div className="mt-auto">
            <div className="h-2 w-full bg-black/10 rounded-full" />
          </div>
        </div>
      </section>

      <section className={`${card} p-5 h-[420px] flex flex-col`}>
        <div className="w-32 h-3 bg-black/10 rounded mb-4" />
        <div className="flex-1 bg-black/10 rounded-xl" />
      </section>

      <section className="grid grid-cols-3 gap-6 h-[300px]">
        <div className={`${card} col-span-2 p-5 flex flex-col gap-3`}>
          <div className="w-28 h-3 bg-black/10 rounded" />

          <div className="space-y-2 mt-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-full h-2 bg-black/10 rounded" />
            ))}
          </div>
        </div>

        <div className={`${card} p-5 flex flex-col gap-3`}>
          <div className="w-20 h-3 bg-black/10 rounded" />

          <div className="space-y-3 mt-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-28 h-3 bg-black/10 rounded" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
