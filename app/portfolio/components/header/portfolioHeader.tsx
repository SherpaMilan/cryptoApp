import { MinusIcon } from "@phosphor-icons/react";
import AddButton from "../buttons/addButton";

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

        <div className="flex items-center gap-3">
          <AddButton>Add Coin</AddButton>

          <button
            className="
      inline-flex
      h-10
      w-[120px]
      items-center
      justify-center
      gap-2
      rounded-xl
      border
      border-white/40
      bg-white/55
      backdrop-blur-xl
      text-sm
      font-semibold
      text-foreground
      shadow-[0_8px_24px_rgba(15,23,42,0.08)]
      transition-all
      duration-200
      hover:-translate-y-0.5
      hover:bg-white/75
      hover:shadow-[0_12px_30px_rgba(15,23,42,0.12)]
      active:translate-y-0
      dark:border-white/10
      dark:bg-white/[0.08]
      dark:hover:bg-white/[0.12]
    "
          >
            <MinusIcon size={16} weight="bold" />
            Remove
          </button>
        </div>
      </div>
    </section>
  );
}
