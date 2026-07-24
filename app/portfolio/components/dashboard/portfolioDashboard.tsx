"use client";

import { useState } from "react";

import { Coin } from "@/types/coin";

import PortfolioAssets from "../assets/portfolioAssets";
import PortfolioAnalytics from "../analytics/portfolioAnalytics";

import PortfolioViewTabs from "./portfolioViewTabs";

type Props = {
  coinIds: string[];
  onAddTransaction?: (coin: Coin) => void;
  onRemoveCoin: (coinId: string) => void;
};

export default function PortfolioDashboard({
  coinIds,
  onAddTransaction,
  onRemoveCoin,
}: Props) {
  const [activeView, setActiveView] = useState<"assets" | "analytics">(
    "assets",
  );

  return (
    <section>
      <PortfolioViewTabs activeView={activeView} onChange={setActiveView} />

      <div className="flex-1">
        {activeView === "assets" ? (
          <PortfolioAssets
            coinIds={coinIds}
            onAddTransaction={onAddTransaction}
            onRemoveCoin={onRemoveCoin}
          />
        ) : (
          <PortfolioAnalytics />
        )}
      </div>
    </section>
  );
}
