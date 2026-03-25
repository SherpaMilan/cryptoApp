"use client";

import { useState } from "react";

import { HiCurrencyDollar, HiMiniCurrencyYen } from "react-icons/hi2";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RiMoneyEuroCircleFill, RiMoneyPoundCircleFill } from "react-icons/ri";

export default function CurrencyDropdown() {
  const [open, setOpen] = useState(false);

  const currency = "USD"; //  FIX (static for now)

  const currencies = ["USD", "EUR", "JPY", "GBP", "AUD"];

  const getIcon = (cur: string) => {
    const baseClass = "w-5 h-5";

    switch (cur) {
      case "EUR":
        return <RiMoneyEuroCircleFill className={baseClass} />;
      case "GBP":
        return <RiMoneyPoundCircleFill className={baseClass} />;
      case "JPY":
        return <HiMiniCurrencyYen className={baseClass} />;
      case "AUD":
      case "USD":
      default:
        return <HiCurrencyDollar className={baseClass} />;
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center bg-[var(--brand-purple-light)] text-[var(--brand-purple)] rounded-[15px] px-3 py-1.5 cursor-pointer"
      >
        {getIcon(currency)}
        <span className="pl-1">{currency}</span>
        <MdKeyboardArrowDown className="ml-1" />
      </button>

      {open && (
        <ul className="absolute top-full left-0 mt-1 w-full bg-[var(--brand-purple-light)] shadow-md rounded-md z-10">
          {currencies.map((cur) => (
            <li
              key={cur}
              className="group px-3 py-1.5 text-sm hover:bg-[var(--brand-purple)] cursor-pointer flex items-center gap-2 uppercase text-[var(--brand-purple)]"
              onClick={() => setOpen(false)} //  only close dropdown
            >
              <span className="group-hover:text-white">{getIcon(cur)}</span>
              <span className="group-hover:text-white">{cur}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
