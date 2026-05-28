"use client";

export default function CoinPageSkeleton() {
  return (
    <main
      className="w-full max-w-[1440px] mx-auto bg-[var(--brand-gray)] px-[72px] animate-pulse"
      aria-label="Loading coin page"
    >
      <header className="flex items-center justify-between py-4 border-b border-black/5">
        <div className="w-10 h-10 bg-black/5 rounded-lg" />

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-black/5 rounded-full" />
          <div className="w-12 h-4 bg-black/5 rounded" />
        </div>

        <div className="w-16 h-4 bg-black/5 rounded" />
      </header>

      <div className="grid grid-cols-[1fr_340px] gap-6 py-6">
        <section className="space-y-6">
          <div className="flex items-end justify-between">
            <div className="space-y-3">
              <div className="w-40 h-10 bg-black/5 rounded" />
              <div className="w-24 h-4 bg-black/5 rounded" />
            </div>

            <div className="space-y-2 text-right">
              <div className="w-20 h-3 bg-black/5 rounded ml-auto" />
              <div className="w-28 h-4 bg-black/5 rounded ml-auto" />
            </div>
          </div>

          <div className="h-[520px] bg-black/5 rounded-xl" />
        </section>

        <aside className="space-y-8 text-sm">
          <section className="space-y-5">
            <div className="space-y-2">
              <div className="w-24 h-3 bg-black/5 rounded" />
              <div className="w-32 h-4 bg-black/5 rounded" />
            </div>

            <div className="space-y-2">
              <div className="w-28 h-3 bg-black/5 rounded" />
              <div className="w-32 h-4 bg-black/5 rounded" />
            </div>

            <div className="space-y-2">
              <div className="w-28 h-3 bg-black/5 rounded" />
              <div className="w-32 h-4 bg-black/5 rounded" />
              <div className="w-40 h-3 bg-black/5 rounded" />
            </div>

            <div className="space-y-2">
              <div className="w-28 h-3 bg-black/5 rounded" />
              <div className="w-32 h-4 bg-black/5 rounded" />
              <div className="w-40 h-3 bg-black/5 rounded" />
            </div>
          </section>

          <section className="space-y-3">
            <div className="w-16 h-3 bg-black/5 rounded" />

            <div className="space-y-2">
              <div className="w-full h-8 bg-black/5 rounded" />
              <div className="w-full h-8 bg-black/5 rounded" />
              <div className="w-full h-8 bg-black/5 rounded" />
            </div>
          </section>

          <section className="space-y-3">
            <div className="w-16 h-3 bg-black/5 rounded" />

            <div className="space-y-2">
              <div className="w-full h-3 bg-black/5 rounded" />
              <div className="w-full h-3 bg-black/5 rounded" />
              <div className="w-5/6 h-3 bg-black/5 rounded" />
              <div className="w-4/6 h-3 bg-black/5 rounded" />
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
