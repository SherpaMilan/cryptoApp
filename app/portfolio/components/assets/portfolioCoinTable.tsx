"use client";

import { useState } from "react";

import { Coin } from "@/types/coin";
import { useCoinsPreviewQuery } from "@/hooks/useCoinsPreviewQuery";
import { useCurrency } from "@/store/useCurrencyStore";
import PortfolioPagination from "../pagination/portfolioPagination";
import PortfolioCoinRow from "./portfolioCoinRow";
import PortfolioCoinTableHeader from "./portfolioCoinTableHeader";

type Props = {
  coinIds: string[];
  onAddTransaction?: (coin: Coin) => void;
  onRemoveCoin: (coinId: string) => void;
};

const COINS_PER_PAGE = 5;

export default function PortfolioCoinTable({
  coinIds,
  onAddTransaction,
  onRemoveCoin,
}: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const { currencyKey, isCurrencyLoaded } = useCurrency();

  const { data: liveCoins = [] } = useCoinsPreviewQuery(
    currencyKey,
    isCurrencyLoaded,
  );

  const portfolioCoinIds = new Set(coinIds);

  const livePortfolioCoins = liveCoins.filter((coin) =>
    portfolioCoinIds.has(coin.id),
  );

  const totalCoins = livePortfolioCoins.length;

  const totalPages = Math.max(1, Math.ceil(totalCoins / COINS_PER_PAGE));

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * COINS_PER_PAGE;

  const endIndex = startIndex + COINS_PER_PAGE;

  const coinsForCurrentPage = livePortfolioCoins.slice(startIndex, endIndex);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <>
      <div className="min-h-[330px] flex-1 overflow-x-auto">
        <table className="w-full">
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
        <PortfolioPagination
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={livePortfolioCoins.length}
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          pageNumbers={pageNumbers}
          onChangePage={setCurrentPage}
        />
      )}
    </>
  );
}
