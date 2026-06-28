"use client";

import ActionMenu from "../sidebar/actionMenu";
import AddButton from "../buttons/addButton";
import { Portfolio } from "@/portfolio/store/usePortfolioStore";

const portfolioColors = [
  "bg-violet-500/15 text-violet-600 dark:text-violet-300",
  "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  "bg-sky-500/15 text-sky-600 dark:text-sky-300",
  "bg-orange-500/15 text-orange-600 dark:text-orange-300",
  "bg-pink-500/15 text-pink-600 dark:text-pink-300",
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
    <section className="flex items-center justify-between gap-4">
      <div className="hide-scrollbar flex max-w-[900px] min-w-0 flex-1 items-center gap-3 overflow-x-auto">
        {portfolios.map((portfolio, index) => {
          const isActive = portfolio.id === currentPortfolio.id;
          const colorClass = portfolioColors[index % portfolioColors.length];

          return (
            <div
              key={portfolio.id}
              className={`
                flex h-[48px] shrink-0 items-center gap-2 rounded-full
                px-3 transition-all duration-200

                ${
                  isActive
                    ? "bg-black/[0.04] text-foreground dark:bg-white/[0.06]"
                    : "text-foreground/65 hover:bg-black/[0.03] hover:text-foreground dark:hover:bg-white/[0.04]"
                }
              `}
            >
              <button
                onClick={() => onSelectPortfolio(portfolio)}
                className="flex min-w-0 cursor-pointer items-center gap-2"
              >
                <span
                  className={`
                    flex h-8 w-8 shrink-0 items-center justify-center
                    rounded-full text-lg
                    ${colorClass}
                  `}
                >
                  {portfolio.icon}
                </span>

                <span
                  title={portfolio.name}
                  className={`
                    max-w-[140px] truncate text-[15px]
                    ${isActive ? "font-semibold" : "font-medium"}
                  `}
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

      <AddButton
        onClick={onOpenPortfolioForm}
        className="h-[48px] w-[150px] shrink-0"
      >
        Add Portfolio
      </AddButton>
    </section>
  );
}
