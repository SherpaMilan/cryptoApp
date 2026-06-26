import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Portfolio = {
  id: string;
  name: string;
  icon: string;
};

interface PortfolioStore {
  portfolios: Portfolio[];
  currentPortfolio: Portfolio | null;
  createPortfolio: (portfolio: Portfolio) => void;
  editPortfolio: (portfolio: Portfolio) => void;
  removePortfolio: (portfolioId: string) => void;
}

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set) => ({
      portfolios: [],
      currentPortfolio: null,

      createPortfolio: (portfolio) =>
        set((state) => ({
          portfolios: [...state.portfolios, portfolio],
          currentPortfolio: portfolio,
        })),

      editPortfolio: (editedPortfolio) =>
        set((state) => ({
          portfolios: state.portfolios.map((portfolio) =>
            portfolio.id === editedPortfolio.id ? editedPortfolio : portfolio,
          ),
          currentPortfolio:
            state.currentPortfolio?.id === editedPortfolio.id
              ? editedPortfolio
              : state.currentPortfolio,
        })),

      removePortfolio: (portfolioId) =>
        set((state) => {
          const remainingPortfolios = state.portfolios.filter(
            (portfolio) => portfolio.id !== portfolioId,
          );

          return {
            portfolios: remainingPortfolios,
            currentPortfolio:
              state.currentPortfolio?.id === portfolioId
                ? (remainingPortfolios[0] ?? null)
                : state.currentPortfolio,
          };
        }),
    }),
    {
      name: "portfolio-storage",
    },
  ),
);
