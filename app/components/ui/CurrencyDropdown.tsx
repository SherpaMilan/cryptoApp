"use client";

import { useCurrency } from "@/context/currencyContext";
import { useEffect, useRef, useState } from "react";
import {
  HiMiniCurrencyDollar,
  HiMiniCurrencyEuro,
  HiMiniCurrencyPound,
} from "react-icons/hi2";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TbCoinBitcoinFilled } from "react-icons/tb";
import CurrencyDropdownSkeleton from "../skeletons/CurrencyDropdownSkeleton";

export const CURRENCIES = ["USD", "EUR", "BTC", "GBP", "AUD"] as const;
export type Currency = (typeof CURRENCIES)[number];

export default function CurrencyDropdown() {
  const { defaultCurrency, setDefaultCurrency, isCurrencyLoaded } =
    useCurrency();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const el = dropdownRef.current;
      if (el && !el.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isCurrencyLoaded) {
    return <CurrencyDropdownSkeleton />;
  }

  const getIcon = (currency: Currency) => {
    const baseClass = "w-5 h-5";

    switch (currency) {
      case "EUR":
        return <HiMiniCurrencyEuro className={baseClass} />;
      case "GBP":
        return <HiMiniCurrencyPound className={baseClass} />;
      case "BTC":
        return <TbCoinBitcoinFilled className={baseClass} />;
      default:
        return <HiMiniCurrencyDollar className={baseClass} />;
    }
  };

  return (
    <div ref={dropdownRef} className="relative inline-block cursor-pointer">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center h-[48px] bg-[var(--brand-purple-light)] text-[var(--brand-purple-dark)] rounded-[15px] px-3 py-1.5"
      >
        {getIcon(defaultCurrency)}
        <span className="pl-1">{defaultCurrency}</span>
        <MdKeyboardArrowDown className="ml-1" />
      </button>

      {open && (
        <ul className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-md z-50 py-1">
          {CURRENCIES.map((currency, index) => (
            <div key={currency}>
              <li
                onClick={() => {
                  setDefaultCurrency(currency);
                  setOpen(false);
                }}
                className="
                  flex items-center gap-2
                  px-3 py-2
                  text-sm text-gray-700
                  hover:bg-gray-100
                  cursor-pointer
                "
              >
                {getIcon(currency)}
                <span className="uppercase">{currency}</span>
              </li>

              {index !== CURRENCIES.length - 1 && (
                <div className="mx-3 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
              )}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
