"use client";

import { usePortfolioStore } from "./store/usePortfolioStore";
import LandingPage from "./components/portfolioLandingPage";
import PortfolioDashboard from "./components/portfolioDashboard";

export default function PortfolioPage() {
  const currentPortfolio = usePortfolioStore((state) => state.currentPortfolio);
  const removePortfolio = usePortfolioStore((state) => state.removePortfolio);

  if (currentPortfolio) {
    return (
      <PortfolioDashboard
        portfolio={currentPortfolio}
        onDelete={removePortfolio}
      />
    );
  }

  return <LandingPage />;
}
