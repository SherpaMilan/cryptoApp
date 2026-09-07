"use client";

import { PlusIcon } from "@phosphor-icons/react";

import { Portfolio } from "@/portfolio/store/usePortfolioStore";
import ActionMenu from "../sidebar/actionMenu";

const portfolioColors = [
  "bright-amber",
  "soft-cyan",
  "antique-white",
  "papaya-whip",
  "pink-mist",
  "mint-leaf",
  "cherry-blossom",
];

type Props = {
  portfolios: Portfolio[];
  currentPortfolio: Portfolio;
  onSelectPortfolio: (portfolio: Portfolio) => void;
  onOpenPortfolioForm: () => void;
  onEditPortfolio: (portfolio: Portfolio) => void;
  onDeletePortfolio: (portfolioId: string) => void;
};

export default function PortfolioTabs({
  portfolios,
  currentPortfolio,
  onSelectPortfolio,
  onOpenPortfolioForm,
  onEditPortfolio,
  onDeletePortfolio,
}: Props) {
  return (
    <section className="flex min-w-0 items-center gap-4">
      <div className="hide-scrollbar min-w-0 flex-1 overflow-x-auto">
        <div className="flex w-max items-center gap-1.5 rounded-2xl border border-black/[0.06] bg-black/[0.02] p-1 dark:border-white/[0.07] dark:bg-white/[0.025]">
          {portfolios.map((portfolio, index) => {
            const isActive = portfolio.id === currentPortfolio.id;
            const colorClass = portfolioColors[index % portfolioColors.length];

            return (
              <div
                key={portfolio.id}
                className={`group flex h-[44px] shrink-0 items-center rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-background shadow-[0_2px_10px_rgba(0,0,0,0.07)] dark:bg-white/[0.08]"
                    : "hover:bg-black/[0.035] dark:hover:bg-white/[0.04]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelectPortfolio(portfolio)}
                  className={`flex h-full min-w-0 cursor-pointer items-center gap-2.5 px-3 ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-base shadow-sm ${colorClass}`}
                  >
                    {portfolio.icon}
                  </span>

                  <span
                    title={portfolio.name}
                    className={`max-w-[140px] truncate text-[13px] ${
                      isActive ? "font-semibold" : "font-medium"
                    }`}
                  >
                    {portfolio.name}
                  </span>
                </button>

                {isActive && (
                  <div className="mr-1 shrink-0">
                    <ActionMenu
                      editLabel="Edit"
                      deleteLabel="Delete"
                      onEdit={() => onEditPortfolio(portfolio)}
                      onDelete={() => onDeletePortfolio(portfolio.id)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={onOpenPortfolioForm}
        className="group flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border border-black/[0.06] bg-background px-3.5 py-2.5 text-xs font-semibold text-muted-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-black/[0.1] hover:text-foreground hover:shadow-md dark:border-white/[0.08] dark:bg-white/[0.025]"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[var(--brand-purple)]/10 text-[var(--brand-purple)] transition-transform duration-200 group-hover:rotate-90">
          <PlusIcon size={13} weight="bold" />
        </span>
        New Portfolio
      </button>
    </section>
  );
}
