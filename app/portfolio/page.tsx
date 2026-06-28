"use client";

import { useState } from "react";

import { Portfolio, usePortfolioStore } from "./store/usePortfolioStore";

import LandingPage from "./components/landingPage/portfolioLandingPage";
import PortfolioCreationForm from "./components/form/portfolioCreationForm";

import PortfolioOverview from "./components/overview/portfolioOverview";
import PortfolioTabs from "./components/tabs/portfolioTabs";

export default function PortfolioPage() {
  const [portfolioFormMode, setPortfolioFormMode] = useState<
    "create" | "edit" | null
  >(null);

  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(
    null,
  );

  const hasHydrated = usePortfolioStore((state) => state.hasHydrated);
  const portfolios = usePortfolioStore((state) => state.portfolios);
  const currentPortfolio = usePortfolioStore((state) => state.currentPortfolio);
  const removePortfolio = usePortfolioStore((state) => state.removePortfolio);
  const setCurrentPortfolio = usePortfolioStore(
    (state) => state.setCurrentPortfolio,
  );

  if (!hasHydrated) return null;

  if (!currentPortfolio) {
    return (
      <>
        <LandingPage
          onOpenPortfolioForm={() => setPortfolioFormMode("create")}
        />

        {portfolioFormMode && (
          <PortfolioCreationForm
            mode={portfolioFormMode}
            portfolio={null}
            onClose={() => setPortfolioFormMode(null)}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex min-h-screen max-w-[1440px] flex-col gap-5 px-[72px] py-6">
        <PortfolioTabs
          portfolios={portfolios}
          currentPortfolio={currentPortfolio}
          onSelectPortfolio={setCurrentPortfolio}
          onOpenPortfolioForm={() => {
            setEditingPortfolio(null);
            setPortfolioFormMode("create");
          }}
          onEditPortfolio={(portfolio) => {
            setEditingPortfolio(portfolio);
            setPortfolioFormMode("edit");
          }}
          onDeletePortfolio={removePortfolio}
        />

        <PortfolioOverview portfolioName={currentPortfolio.name} />

        {portfolioFormMode && (
          <PortfolioCreationForm
            mode={portfolioFormMode}
            portfolio={portfolioFormMode === "edit" ? editingPortfolio : null}
            onClose={() => {
              setPortfolioFormMode(null);
              setEditingPortfolio(null);
            }}
          />
        )}
      </main>
    </div>
  );
}
