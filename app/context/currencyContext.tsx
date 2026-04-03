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
  const [defaultCurrency, setDefaultCurrency] = useState("USD");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("defaultCurrency");
    if (stored) setDefaultCurrency(stored);
    setMounted(true); // client has mounted
  }, []);

  useEffect(() => {
    localStorage.setItem("defaultCurrency", defaultCurrency);
  }, [defaultCurrency]);

  if (!mounted) return null; // prevent hydration mismatch-Render nothing until client has mounted
  return (
    <CurrencyContext.Provider value={{ defaultCurrency, setDefaultCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

//  Hook to use the context
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context)
    throw new Error("useCurrency must be used within CurrencyProvider");
  return context;
};
