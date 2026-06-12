import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Coin } from "@/types/coin";

type CoinSlot = "from" | "to";

// describe coin store
interface CoinStore {
  fromCoin: Coin | null;
  toCoin: Coin | null;
  isModalOpen: boolean;
  activeSlot: CoinSlot | null;
  recentCoins: Coin[];

  openModal: (slot: CoinSlot) => void;
  closeModal: () => void;
  setCoin: (coin: Coin) => void;
  addRecentCoin: (coin: Coin) => void;
}

// create store
export const useCoinStore = create<CoinStore>()(
  persist(
    (set, get) => ({
      fromCoin: null,
      toCoin: null,
      isModalOpen: false,
      activeSlot: null,
      recentCoins: [],

      openModal: (slot) =>
        set({
          isModalOpen: true,
          activeSlot: slot,
        }),

      closeModal: () =>
        set({
          isModalOpen: false,
          activeSlot: null,
        }),

      setCoin: (coin) => {
        // what is current slot
        const whereAreWeSelecting = get().activeSlot;

        if (!whereAreWeSelecting) return;

        set({
          [whereAreWeSelecting === "from" ? "fromCoin" : "toCoin"]: coin,
          isModalOpen: false,
          activeSlot: null,
        });

        // add to recent coins
        get().addRecentCoin(coin);
      },

      addRecentCoin: (coin) =>
        set((state) => {
          const exists = state.recentCoins.find((c) => c.id === coin.id);

          if (exists) {
            return {
              recentCoins: [
                coin,
                ...state.recentCoins.filter((c) => c.id !== coin.id),
              ],
            };
          }

          return {
            recentCoins: [coin, ...state.recentCoins].slice(0, 10),
          };
        }),
    }),
    {
      name: "coin-store", // localStorage key
    },
  ),
);
