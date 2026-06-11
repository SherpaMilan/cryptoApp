import { create } from "zustand";
import { Coin } from "@/types/coin";

type CoinSlot = "from" | "to";

interface CoinStore {
  fromCoin: Coin | null;
  toCoin: Coin | null;

  modalOpen: boolean;
  activeSlot: CoinSlot | null;

  openModal: (slot: CoinSlot) => void;
  closeModal: () => void;

  setCoin: (coin: Coin) => void;
}

export const useCoinStore = create<CoinStore>((set, get) => ({
  fromCoin: null,
  toCoin: null,

  modalOpen: false,
  activeSlot: null,

  openModal: (slot) =>
    set({
      modalOpen: true,
      activeSlot: slot,
    }),

  closeModal: () =>
    set({
      modalOpen: false,
      activeSlot: null,
    }),

  setCoin: (coin) => {
    const slot = get().activeSlot;

    if (!slot) return;

    set({
      [slot === "from" ? "fromCoin" : "toCoin"]: coin,
      modalOpen: false,
      activeSlot: null,
    });
  },
}));
