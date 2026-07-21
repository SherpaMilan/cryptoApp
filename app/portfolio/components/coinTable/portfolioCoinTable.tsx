"use client";

import { useState } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

import { Coin } from "@/types/coin";
import { useCoinsPreviewQuery } from "@/hooks/useCoinsPreviewQuery";
import { useCurrency } from "@/store/useCurrencyStore";

import PortfolioCoinRow from "./portfolioCoinRow";
import PortfolioCoinTableHeader from "./portfolioCoinTableHeader";

type Props = {
  coinIds: string[];
  onAddTransaction?: (coin: Coin) => void;
  onRemoveCoin: (coinId: string) => void;
};

const COINS_PER_PAGE = 5;

const paginationButtonClass =
  "flex h-8 min-w-8 cursor-pointer items-center justify-center rounded-lg px-2 text-xs font-bold transition-all duration-200 hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-white/10";

export default function PortfolioCoinTable({
  coinIds,
  onAddTransaction,
  onRemoveCoin,
}: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const { currencyKey, isCurrencyLoaded } = useCurrency();

  // Fetch the latest coin data in the selected currency.
  const { data: liveCoins = [] } = useCoinsPreviewQuery(
    currencyKey,
    isCurrencyLoaded,
  );

  // Convert saved portfolio coin IDs into a Set for quick lookup.
  const portfolioCoinIds = new Set(coinIds);

  // Match portfolio coin IDs with the currently available live market data.
  const livePortfolioCoins = liveCoins.filter((coin) =>
    portfolioCoinIds.has(coin.id),
  );

  const totalCoins = livePortfolioCoins.length;
  const totalPages = Math.max(1, Math.ceil(totalCoins / COINS_PER_PAGE));

  // Use the final available page if the current page no longer exists.
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * COINS_PER_PAGE;
  const endIndex = startIndex + COINS_PER_PAGE;
  const coinsForCurrentPage = livePortfolioCoins.slice(startIndex, endIndex);
  function changePage(page: number) {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
  }

  const pageNumbers: number[] = [];

  for (let page = 1; page <= totalPages; page++) {
    pageNumbers.push(page);
  }

  return (
    <section className="mt-8 overflow-hidden rounded-[24px] shadow-[0_20px_60px_rgba(15,23,42,0.05)] backdrop-blur-2xl dark:bg-white/[0.035]">
      <div className="flex items-center justify-between px-6 py-5">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Portfolio Assets
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px]">
          <PortfolioCoinTableHeader />

          <tbody>
            {coinsForCurrentPage.map((coin) => (
              <PortfolioCoinRow
                key={coin.id}
                coin={coin}
                onAddTransaction={onAddTransaction}
                onRemoveCoin={onRemoveCoin}
              />
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-black/5 px-6 py-4 dark:border-white/10">
          <p className="text-xs font-medium text-muted-foreground">
            Showing {startIndex + 1}–
            {Math.min(endIndex, livePortfolioCoins.length)} of{" "}
            {livePortfolioCoins.length}
          </p>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => changePage(safeCurrentPage - 1)}
              disabled={safeCurrentPage === 1}
              aria-label="Previous page"
              className={paginationButtonClass}
            >
              <CaretLeftIcon size={15} weight="bold" />
            </button>

            {pageNumbers.map((page) => {
              const isActive = safeCurrentPage === page;

              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => changePage(page)}
                  aria-label={`Go to page ${page}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`${paginationButtonClass} ${
                    isActive
                      ? "bg-[var(--brand-purple)] text-white hover:bg-[var(--brand-purple)] dark:hover:bg-[var(--brand-purple)]"
                      : ""
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => changePage(safeCurrentPage + 1)}
              disabled={safeCurrentPage === totalPages}
              aria-label="Next page"
              className={paginationButtonClass}
            >
              <CaretRightIcon size={15} weight="bold" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
