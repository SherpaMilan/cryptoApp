"use client";

import { useContext, createContext, useState, useEffect } from "react";

interface CurrencyContextType {
  defaultCurrency: string;
  setDefaultCurrency: (currency: string) => void;
}

export const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined,
);

export default function CurrencyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [defaultCurrency, setDefaultCurrency] = useState(() => {
    if (typeof window === "undefined") return "USD"; // SSR safe
    return localStorage.getItem("defaultCurrency") || "USD";
  });

  useEffect(() => {
    localStorage.setItem("defaultCurrency", defaultCurrency);
  }, [defaultCurrency]);

  return (
    <CurrencyContext.Provider value={{ defaultCurrency, setDefaultCurrency }}>
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
