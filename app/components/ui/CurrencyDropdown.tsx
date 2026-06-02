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
        className="
          flex items-center gap-1
          h-[48px]
          px-3
          rounded-[15px]
          bg-card
          text-foreground
          transition
        "
      >
        {getIcon(defaultCurrency)}
        <span className="pl-1 text-sm font-medium uppercase">
          {defaultCurrency}
        </span>
        <MdKeyboardArrowDown className="ml-1 text-foreground/60" />
      </button>

      {open && (
        <ul
          onMouseLeave={() => setOpen(false)}
          className="
            absolute top-full left-0 mt-2 w-full
            bg-card/95 backdrop-blur-sm 
            rounded-lg
            shadow-md
            z-50
            py-1
            overflow-hidden
          "
        >
          {CURRENCIES.map((currency, index) => (
            <li key={currency} className="relative">
              <button
                onClick={() => {
                  setDefaultCurrency(currency);
                  setOpen(false);
                }}
                className="
                  w-full flex items-center gap-2
                  px-3 py-2
                  text-sm text-foreground
                  hover:bg-card-hover
                  transition
                  cursor-pointer
                "
              >
                {getIcon(currency)}
                <span className="uppercase">{currency}</span>
              </button>

              {index !== CURRENCIES.length - 1 && (
                <div className="absolute bottom-0 left-6 right-6 h-px bg-border/30" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
