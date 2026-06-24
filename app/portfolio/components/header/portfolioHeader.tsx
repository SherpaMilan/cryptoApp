import { MinusIcon, PlusIcon } from "@phosphor-icons/react";

export default function PortfolioHeader() {
  return (
    <section className="rounded-[24px] border border-black/10 bg-white/45 px-5 py-3 shadow-[0_18px_60px_rgba(15,23,42,0.05)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-10">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Assets
            </p>

            <p className="mt-1 text-lg font-semibold text-foreground">0</p>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Holdings
            </p>

            <p className="mt-1 text-lg font-semibold text-foreground">$0.00</p>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              P/L
            </p>

            <p className="mt-1 text-lg font-semibold text-foreground">$0.00</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-foreground px-3 text-xs font-semibold text-background transition hover:opacity-90">
            <PlusIcon size={14} weight="bold" />
            Add
          </button>

          <button className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-black/10 bg-white/60 px-3 text-xs font-semibold text-foreground transition hover:bg-white dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/[0.1]">
            <MinusIcon size={14} weight="bold" />
            Remove
          </button>
        </div>
      </div>
    </section>
  );
}
