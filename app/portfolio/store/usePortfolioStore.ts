import { Coin } from "@/types/coin";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Portfolio = {
  id: string;
  name: string;
  icon: string;
  coins?: Coin[];
};

interface PortfolioStore {
  portfolios: Portfolio[];
  currentPortfolio: Portfolio | null;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;

  createPortfolio: (portfolio: Portfolio) => void;
  editPortfolio: (portfolio: Portfolio) => void;
  removePortfolio: (portfolioId: string) => void;
  setCurrentPortfolio: (portfolio: Portfolio) => void;
  addCoinsToCurrentPortfolio: (coins: Coin[]) => void;
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

      setCurrentPortfolio: (portfolio) =>
        set({
          currentPortfolio: portfolio,
        }),

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
      addCoinsToCurrentPortfolio: (coins) =>
        set((state) => {
          if (!state.currentPortfolio) return state;

          const existingCoins = state.currentPortfolio.coins ?? [];

          const newCoins = coins.filter(
            (coin) =>
              !existingCoins.some((existing) => existing.id === coin.id),
          );

          const updatedPortfolio = {
            ...state.currentPortfolio,
            coins: [...existingCoins, ...newCoins],
          };

          return {
            currentPortfolio: updatedPortfolio,
            portfolios: state.portfolios.map((portfolio) =>
              portfolio.id === updatedPortfolio.id
                ? updatedPortfolio
                : portfolio,
            ),
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
