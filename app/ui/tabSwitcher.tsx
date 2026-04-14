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
    <div className="w-full bg-[var(--brand-gray)]  py-[30px] ">
      <div className="max-w-[1440px] mx-auto px-[72px] ">
        <nav className="flex w-[506px] h-[53px] bg-[var(--brand-white)] rounded-[6px] p-[4px]  ">
          {tabs.map((tab) => {
            const isActive =
              tab.href == "/"
                ? pathname === "/"
                : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`w-1/2 flex items-center justify-center rounded-[6px] cursor-pointer ${
                  isActive
                    ? "bg-[var(--brand-purple)] font-bold text-[var(--brand-white)]"
                    : ""
                }`}
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
