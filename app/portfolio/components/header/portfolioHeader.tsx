import { MinusIcon } from "@phosphor-icons/react";
import AddButton from "../buttons/actionButton";

export default function PortfolioHeader() {
  return (
    <section className="rounded-2xl border border-black/10 bg-white/45 px-5 py-2 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-center justify-end gap-3">
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
            text-sm
            font-semibold
            text-foreground
            transition-colors
            hover:bg-white/75
            dark:border-white/10
            dark:bg-white/[0.08]
            dark:hover:bg-white/[0.12]
          "
        >
          <MinusIcon size={16} weight="bold" />
          Remove
        </button>
      </div>
    </section>
  );
}
