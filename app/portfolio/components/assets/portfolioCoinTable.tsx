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
  onOpenTransactionModal?: (coin: Coin) => void;
  onRemoveCoin: (coinId: string) => void;
};

const COINS_PER_PAGE = 5;

export default function PortfolioCoinTable({
  coinIds,
  onOpenTransactionModal,
  onRemoveCoin,
}: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const { currencyKey, isCurrencyLoaded } = useCurrency();

  const { data: portfolioCoins = [] } = useCoinsPreviewQuery(
    currencyKey,
    isCurrencyLoaded && coinIds.length > 0,
    coinIds,
  );

  const totalCoins = portfolioCoins.length;
  const totalPages = Math.max(1, Math.ceil(totalCoins / COINS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * COINS_PER_PAGE;
  const endIndex = startIndex + COINS_PER_PAGE;

  const coinsForCurrentPage = portfolioCoins.slice(startIndex, endIndex);

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
                onOpenTransactionModal={onOpenTransactionModal}
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
          totalItems={totalCoins}
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          pageNumbers={pageNumbers}
          onChangePage={setCurrentPage}
        />
      )}
    </>
  );
}
