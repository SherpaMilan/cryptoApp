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
    <section className="flex min-w-0 items-center gap-3 ">
      <div className="hide-scrollbar min-w-0 flex-1 overflow-x-auto">
        <div className="flex w-max items-center gap-3">
          {portfolios.map((portfolio, index) => {
            const isActive = portfolio.id === currentPortfolio.id;
            const colorClass = portfolioColors[index % portfolioColors.length];

            return (
              <div
                key={portfolio.id}
                className={`flex h-[48px] shrink-0 items-center gap-2 rounded-full px-3 transition-all duration-200 ${
                  isActive
                    ? "bg-black/[0.04] text-foreground dark:bg-white/[0.06]"
                    : "text-foreground/65 hover:bg-black/[0.03] hover:text-foreground dark:hover:bg-white/[0.04]"
                }`}
              >
                <button
                  onClick={() => onSelectPortfolio(portfolio)}
                  className="flex min-w-0 cursor-pointer items-center gap-2"
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg ${colorClass}`}
                  >
                    {portfolio.icon}
                  </span>

                  <span
                    title={portfolio.name}
                    className={`max-w-[140px] truncate text-[15px] ${
                      isActive ? "font-semibold" : "font-medium"
                    }`}
                  >
                    {portfolio.name}
                  </span>
                </button>

                {isActive && (
                  <div className="ml-1 shrink-0">
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
        onClick={onOpenPortfolioForm}
        className="flex shrink-0  px-2 cursor-pointer items-center gap-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:translate-x-0.5 hover:text-foreground"
      >
        <PlusIcon size={16} weight="bold" />
        New Portfolio
      </button>
    </section>
  );
}
