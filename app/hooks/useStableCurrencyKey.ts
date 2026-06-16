import { useEffect, useState } from "react";
import { useCurrency } from "@/context/currencyContext";

export function useStableCurrencyKey(delay = 300) {
  const { currencyKey } = useCurrency();
  const [stableCurrency, setStableCurrency] = useState(currencyKey);

  useEffect(() => {
    const t = setTimeout(() => {
      setStableCurrency(currencyKey);
    }, delay);

    return () => clearTimeout(t);
  }, [currencyKey, delay]);

  return stableCurrency;
}
