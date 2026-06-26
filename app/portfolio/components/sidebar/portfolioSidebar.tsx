"use client";

import { PlusIcon } from "@phosphor-icons/react";
import ActionMenu from "./actionMenu";
import { Portfolio } from "@/portfolio/store/usePortfolioStore";

type Props = {
  portfolios: Portfolio[];
  currentPortfolio: Portfolio;
  onDelete: (portfolioId: string) => void;
  onOpenPortfolioForm: () => void;
  onEditPortfolio: (portfolio: Portfolio) => void;
};

export default function PortfolioSidebar({
  portfolios,
  onDelete,
  onOpenPortfolioForm,
  onEditPortfolio,
}: Props) {
  return (
    <aside className="sticky top-6 min-h-[620px] rounded-[28px] border border-black/10 bg-white/35 p-4 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.04]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase text-slate-600 dark:text-white/50">
          Portfolios
        </h2>

        <button
          title="New Portfolio"
          onClick={onOpenPortfolioForm}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-black/10 bg-white/60 transition hover:bg-white active:scale-95 dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/[0.1]"
        >
          <PlusIcon size={17} weight="bold" />
        </button>
      </div>

      <ul className="mt-4 max-h-[500px] space-y-2 overflow-y-auto">
        {portfolios.map((portfolio) => (
          <li
            key={portfolio.id}
            className="flex items-center justify-between rounded-2xl border border-black/10 bg-white/65 px-3 py-3 dark:border-white/10 dark:bg-white/[0.06]"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm text-lg dark:border-white/10 dark:bg-white/[0.08]">
                {portfolio.icon}
              </div>

              <p
                title={portfolio.name}
                className="truncate text-sm font-semibold text-slate-950 dark:text-white"
              >
                {portfolio.name}
              </p>
            </div>

            <ActionMenu
              editLabel="Edit"
              deleteLabel="Delete"
              onEdit={() => onEditPortfolio(portfolio)}
              onDelete={() => onDelete(portfolio.id)}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
}
