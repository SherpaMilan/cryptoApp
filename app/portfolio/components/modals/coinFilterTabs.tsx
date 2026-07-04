export default function CoinFilterTabs() {
  return (
    <div className=" mt-2 flex flex-wrap gap-2">
      <button className="rounded-full bg-[var(--brand-purple)] px-4 py-2 text-xs font-semibold text-white">
        Trending
      </button>

      <button className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:border-[var(--brand-purple)]/20 hover:bg-[var(--brand-purple)]/5 dark:border-white/10">
        Gainers
      </button>

      <button className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:border-[var(--brand-purple)]/20 hover:bg-[var(--brand-purple)]/5 dark:border-white/10">
        Losers
      </button>

      <button className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:border-[var(--brand-purple)]/20 hover:bg-[var(--brand-purple)]/5 dark:border-white/10">
        New
      </button>
    </div>
  );
}
