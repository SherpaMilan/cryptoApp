import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Portfolio = {
  id: string;
  name: string;
  icon: string;
};

interface PortfolioStore {
  currentPortfolio: Portfolio | null;
  createPortfolio: (portfolio: Portfolio) => void;
  removePortfolio: () => void;
}

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set) => ({
      currentPortfolio: null,

      createPortfolio: (portfolio) =>
        set({
          currentPortfolio: portfolio,
        }),

      removePortfolio: () =>
        set({
          currentPortfolio: null,
        }),
    }),
    {
      name: "portfolio-storage",
    },
  ),
);
