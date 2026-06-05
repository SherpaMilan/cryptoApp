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
    <div className="w-full bg-[var(--background)] py-[25px]">
      <div className="max-w-[1440px] mx-auto px-[72px]">
        <nav className="flex w-[506px] h-[53px] bg-[var(--tab-bg)] rounded-[10px] p-[4px] ">
          {tabs.map((tab) => {
            const isActive =
              tab.href === "/"
                ? pathname === "/"
                : pathname.startsWith(tab.href);

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`
                  w-1/2 flex items-center justify-center
                  rounded-[8px]
                  cursor-pointer
                  text-sm font-medium
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-[var(--tab-active-bg)] text-[var(--tab-active-text)] shadow-sm"
                      : "text-[var(--tab-inactive)] hover:bg-[var(--tab-hover)] hover:text-[var(--foreground)]"
                  }
                `}
              >
                {tab.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
