"use client";

import { useContext, createContext, useState, useEffect } from "react";
import { CURRENCY_SYMBOL_MAP } from "@/constants/currency";
type Currency = keyof typeof CURRENCY_SYMBOL_MAP;

interface CurrencyContextType {
  defaultCurrency: Currency;
  setDefaultCurrency: (currency: Currency) => void;
  isCurrencyLoaded: boolean;
  currencyKey: string;
  currencySymbol: string;
}

export const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined,
);

export default function CurrencyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [defaultCurrency, setDefaultCurrency] = useState<Currency>("USD");
  const [isCurrencyLoaded, setIsCurrencyLoaded] = useState(false);

  useEffect(() => {
    const storedCurrency = localStorage.getItem(
      "defaultCurrency",
    ) as Currency | null;

    if (storedCurrency && CURRENCY_SYMBOL_MAP[storedCurrency]) {
      setDefaultCurrency(storedCurrency);
    }

    setIsCurrencyLoaded(true);
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    localStorage.setItem("defaultCurrency", defaultCurrency);
  }, [defaultCurrency]);

  const currencyKey = defaultCurrency.toLowerCase();
  const currencySymbol = CURRENCY_SYMBOL_MAP[defaultCurrency] ?? "";
  return (
    <CurrencyContext.Provider
      value={{
        defaultCurrency,
        setDefaultCurrency,
        isCurrencyLoaded,
        currencyKey,
        currencySymbol,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

// Hook
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return context;
};
