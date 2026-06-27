import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CURRENCY_SYMBOL_MAP } from "@/constants/currency";

type Currency = keyof typeof CURRENCY_SYMBOL_MAP;

interface CurrencyStore {
  defaultCurrency: Currency;
  isCurrencyLoaded: boolean;
  setDefaultCurrency: (currency: Currency) => void;
  setIsCurrencyLoaded: (value: boolean) => void;
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set) => ({
      defaultCurrency: "USD",
      isCurrencyLoaded: false,

      setDefaultCurrency: (currency) =>
        set({
          defaultCurrency: currency,
        }),

      setIsCurrencyLoaded: (value) =>
        set({
          isCurrencyLoaded: value,
        }),
    }),
    {
      name: "currency-storage",
      onRehydrateStorage: () => (state) => {
        state?.setIsCurrencyLoaded(true);
      },
    },
  ),
);

export const useCurrency = () => {
  const defaultCurrency = useCurrencyStore((state) => state.defaultCurrency);
  const setDefaultCurrency = useCurrencyStore(
    (state) => state.setDefaultCurrency,
  );
  const isCurrencyLoaded = useCurrencyStore((state) => state.isCurrencyLoaded);

  const currencyKey = defaultCurrency.toLowerCase();
  const currencySymbol = CURRENCY_SYMBOL_MAP[defaultCurrency] ?? "";

  return {
    defaultCurrency,
    setDefaultCurrency,
    isCurrencyLoaded,
    currencyKey,
    currencySymbol,
  };
};
