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
import CurrencyDropdownSkeleton from "./skeletons/currencyDropdownSkeleton";

export default function CurrencyDropdown() {
  const { defaultCurrency, setDefaultCurrency, isCurrencyLoaded } =
    useCurrency();
  const [open, setOpen] = useState(false);
  const currencies = ["USD", "EUR", "BTC", "GBP", "AUD"];
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDropdown = (event: MouseEvent) => {
      const dropdownContainer = dropdownContainerRef.current;
      if (
        dropdownContainer &&
        !dropdownContainer.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDropdown);
    // return cleanup function
    return () => {
      document.removeEventListener("mousedown", handleDropdown);
    };
  }, []);

  if (!isCurrencyLoaded) {
  return <CurrencyDropdownSkeleton />;
  }
  const getIcon = (currency: string) => {
    const baseClass = "w-5 h-5";

    switch (currency) {
      case "EUR":
        return <HiMiniCurrencyEuro className={baseClass} />;
      case "GBP":
        return <HiMiniCurrencyPound className={baseClass} />;
      case "BTC":
        return <TbCoinBitcoinFilled className={baseClass} />;
      case "AUD":
      case "USD":
      default:
        return <HiMiniCurrencyDollar className={baseClass} />;
    }
  };

  return (
    <div className="relative inline-block" ref={dropdownContainerRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center bg-[var(--brand-purple-light)] text-[var(--brand-purple)] rounded-[15px] px-3 py-1.5 cursor-pointer"
      >
        {getIcon(defaultCurrency)}
        <span className="pl-1">{defaultCurrency}</span>
        <MdKeyboardArrowDown className="ml-1" />
      </button>

      {open && (
        <ul className="absolute top-full left-0 mt-1 w-full bg-[var(--brand-purple-light)] shadow-md rounded-md z-10">
          {currencies.map((currency) => (
            <li
              key={currency}
              className="group px-3 py-1.5 text-sm hover:bg-[var(--brand-purple)] cursor-pointer flex items-center gap-2 uppercase text-[var(--brand-purple)]"
              onClick={() => {
                setOpen(false);
                setDefaultCurrency(currency);
              }}
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
