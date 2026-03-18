"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { name: "Coins", href: "/" },
  { name: "Converter", href: "/converter" },
];

export default function TabSwitcher() {
  const pathname = usePathname();

  return (
    <div className="w-full flex  py-12 bg-[#F3F5F9] ">
      <div className="flex w-[506px] h-[53px] bg-[var(--brand-white)] rounded-[6px] p-[4px] ">
            
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`w-1/2 flex items-center justify-center rounded-[6px] cursor-pointer
                ${isActive ? "bg-[var(--brand-purple)] text-[var(--brand-white)]" : ""}`}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}