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
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;

  createPortfolio: (portfolio: Portfolio) => void;
  editPortfolio: (portfolio: Portfolio) => void;
  removePortfolio: (portfolioId: string) => void;
}

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set) => ({
      portfolios: [],
      currentPortfolio: null,
      hasHydrated: false, // At this moment it has not read localStorage yet.

      setHasHydrated: (value) => set({ hasHydrated: value }),

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
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
