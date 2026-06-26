"use client";

import { useState } from "react";

import { Portfolio, usePortfolioStore } from "./store/usePortfolioStore";

import LandingPage from "./components/landingPage/portfolioLandingPage";
import PortfolioCreationForm from "./components/form/portfolioCreationForm";

import PortfolioSidebar from "./components/sidebar/portfolioSidebar";
import PortfolioHeader from "./components/header/portfolioHeader";
import PortfolioOverview from "./components/overview/portfolioOverview";

export default function PortfolioPage() {
  const [portfolioFormMode, setPortfolioFormMode] = useState<
    "create" | "edit" | null
  >(null);
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(
    null,
  );

  const portfolios = usePortfolioStore((state) => state.portfolios);
  const currentPortfolio = usePortfolioStore((state) => state.currentPortfolio);
  const removePortfolio = usePortfolioStore((state) => state.removePortfolio);

  if (!currentPortfolio) {
    return (
      <>
        <LandingPage
          onOpenPortfolioForm={() => setPortfolioFormMode("create")}
        />
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
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto grid min-h-screen max-w-[1440px] grid-cols-[260px_1fr] items-start gap-4 px-[72px] py-6">
        <PortfolioSidebar
          portfolios={portfolios}
          currentPortfolio={currentPortfolio}
          onDelete={removePortfolio}
          onOpenPortfolioForm={() => {
            setEditingPortfolio(null);
            setPortfolioFormMode("create");
          }}
          onEditPortfolio={(portfolio) => {
            setEditingPortfolio(portfolio);
            setPortfolioFormMode("edit");
          }}
        />

        <main className="flex min-h-[calc(100vh-48px)] min-w-0 flex-col gap-4">
          <PortfolioHeader />
          <PortfolioOverview />
        </main>

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
      </div>
    </div>
  );
}
