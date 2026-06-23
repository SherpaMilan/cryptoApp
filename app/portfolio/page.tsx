"use client";

import { useState } from "react";
import { usePortfolioStore } from "./store/usePortfolioStore";
import LandingPage from "./components/portfolioLandingPage";
import PortfolioDashboard from "./components/portfolioDashboard";
import PortfolioCreationForm from "./components/portfolioCreationForm";

export default function PortfolioPage() {
  const [portfolioFormMode, setPortfolioFormMode] = useState<
    "create" | "edit" | null
  >(null);

  const currentPortfolio = usePortfolioStore((state) => state.currentPortfolio);
  const removePortfolio = usePortfolioStore((state) => state.removePortfolio);

  return (
    <>
      {currentPortfolio ? (
        <PortfolioDashboard
          portfolio={currentPortfolio}
          onDelete={removePortfolio}
          onOpenPortfolioForm={() => setPortfolioFormMode("create")}
          onEditPortfolio={() => setPortfolioFormMode("edit")}
        />
      ) : (
        <LandingPage
          onOpenPortfolioForm={() => setPortfolioFormMode("create")}
        />
      )}

      {portfolioFormMode && (
        <PortfolioCreationForm
          mode={portfolioFormMode}
          portfolio={currentPortfolio}
          onClose={() => setPortfolioFormMode(null)}
        />
      )}
    </>
  );
}
