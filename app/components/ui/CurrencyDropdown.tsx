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
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDropdown = (event: MouseEvent) => {
      const el = dropdownContainerRef.current;
      if (el && !el.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDropdown);
    return () => document.removeEventListener("mousedown", handleDropdown);
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
      case "USD":
      case "AUD":
      default:
        return <HiMiniCurrencyDollar className={baseClass} />;
    }
  };

  return (
    <div
      ref={dropdownContainerRef}
      className="relative inline-block cursor-pointer"
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center h-[48px] bg-[var(--brand-purple-light)] text-[var(--brand-purple-dark)] rounded-[15px] px-3 py-1.5"
      >
        {getIcon(defaultCurrency)}
        <span className="pl-1">{defaultCurrency}</span>
        <MdKeyboardArrowDown className="ml-1" />
      </button>

      {open && (
        <ul className="absolute top-full left-0 mt-1 w-full bg-[var(--brand-purple-light)] shadow-md rounded-md z-10">
          {CURRENCIES.map((currency) => (
            <li
              key={currency}
              onClick={() => {
                setOpen(false);
                setDefaultCurrency(currency);
              }}
              className="group px-3 py-1.5 text-sm hover:bg-[var(--brand-purple)] flex items-center gap-2 uppercase text-[var(--brand-purple-dark)]"
            >
              <span className="group-hover:text-white">
                {getIcon(currency)}
              </span>
              <span className="group-hover:text-white">{currency}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
