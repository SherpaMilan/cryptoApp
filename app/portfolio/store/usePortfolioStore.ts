import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Portfolio = {
  id: string;
  name: string;
  icon: string;
  coinIds: string[];
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
  addCoinsToCurrentPortfolio: (coinIds: string[]) => void;
  removeCoinFromCurrentPortfolio: (coinId: string) => void;
  removeCoinsFromCurrentPortfolio: (coinIds: string[]) => void;
}

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set) => ({
      portfolios: [],
      currentPortfolio: null,
      hasHydrated: false, // At this moment it has not read localStorage yet.

      setHasHydrated: (value) => set({ hasHydrated: value }),

      createPortfolio: (portfolio) =>
        set((state) => {
          const newPortfolio = {
            ...portfolio,
            coinIds: portfolio.coinIds ?? [],
          };

          return {
            portfolios: [...state.portfolios, newPortfolio],
            currentPortfolio: newPortfolio,
          };
        }),

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
      addCoinsToCurrentPortfolio: (coinIds) =>
        set((state) => {
          if (!state.currentPortfolio) return state;

          const existingCoinIds = state.currentPortfolio.coinIds ?? [];

          const newCoinIds = coinIds.filter(
            (coinId) => !existingCoinIds.includes(coinId),
          );

          const updatedPortfolio = {
            ...state.currentPortfolio,
            coinIds: [...existingCoinIds, ...newCoinIds],
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

      removeCoinFromCurrentPortfolio: (coinId) =>
        set((state) => {
          if (!state.currentPortfolio) return state;

          const updatedCoinIds = state.currentPortfolio.coinIds.filter(
            (id) => id !== coinId,
          );

          const updatedPortfolio = {
            ...state.currentPortfolio,
            coinIds: updatedCoinIds,
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
      removeCoinsFromCurrentPortfolio: (coinIds) =>
        set((state) => {
          if (!state.currentPortfolio) return state;

          const updatedPortfolio = {
            ...state.currentPortfolio,
            coinIds: state.currentPortfolio.coinIds.filter(
              (id) => !coinIds.includes(id),
            ),
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
