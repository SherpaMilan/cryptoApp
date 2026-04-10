"use client";

import { useContext, createContext, useState, useEffect } from "react";

interface CurrencyContextType {
  defaultCurrency: string;
  setDefaultCurrency: (currency: string) => void;
  isCurrencyLoaded: boolean;
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
  const[isCurrencyLoaded,setIsCurrencyLoaded] = useState(false);
  
  useEffect(() => {
    const storedCurrency = localStorage.getItem("defaultCurrency");
    if (storedCurrency) {
      setDefaultCurrency(storedCurrency);
    }
    setIsCurrencyLoaded(true);
  }, []);   // eslint-disable-next-line react-hooks/exhaustive-deps


  useEffect(() => {
    localStorage.setItem("defaultCurrency", defaultCurrency);
  }, [defaultCurrency]);

  return (
    <CurrencyContext.Provider value={{ defaultCurrency, setDefaultCurrency, isCurrencyLoaded
     }}>
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
