import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Portfolio = {
  id: string;
  name: string;
  icon: string;
  coinIds: string[];
  recentlyAddedCoinIds: string[];
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
      hasHydrated: false,

      setHasHydrated: (value) => set({ hasHydrated: value }),

      createPortfolio: (portfolio) =>
        set((state) => {
          const newPortfolio: Portfolio = {
            ...portfolio,
            coinIds: portfolio.coinIds ?? [],
            recentlyAddedCoinIds: portfolio.recentlyAddedCoinIds ?? [],
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

          const portfolio = state.currentPortfolio;

          const existingCoinIds = portfolio.coinIds ?? [];
          const recentlyAddedCoinIds = portfolio.recentlyAddedCoinIds ?? [];

          const newCoinIds = coinIds.filter(
            (id) => !existingCoinIds.includes(id),
          );

          const newRecentlyAdded = coinIds.filter(
            (id) => !recentlyAddedCoinIds.includes(id),
          );

          const updatedPortfolio = {
            ...portfolio,
            coinIds: [...existingCoinIds, ...newCoinIds],
            recentlyAddedCoinIds: [
              ...recentlyAddedCoinIds,
              ...newRecentlyAdded,
            ],
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
          if (!state.currentPortfolio) {
            return state;
          }

          const updatedPortfolio: Portfolio = {
            ...state.currentPortfolio,
            coinIds: state.currentPortfolio.coinIds.filter(
              (id) => id !== coinId,
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

      removeCoinsFromCurrentPortfolio: (coinIds) =>
        set((state) => {
          if (!state.currentPortfolio || coinIds.length === 0) {
            return state;
          }

          const updatedPortfolio: Portfolio = {
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
