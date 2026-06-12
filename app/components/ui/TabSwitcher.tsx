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
    <div className="w-full py-6 bg-transparent">
      <div className="max-w-[1440px] mx-auto px-6">
        <nav
          className="
            w-[520px] h-[54px]
            mx-auto
            flex items-center
            p-1
            rounded-2xl

            bg-white/60 dark:bg-zinc-900/60
            backdrop-blur-xl
            border border-black/5 dark:border-white/10

            shadow-sm
          "
        >
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
                  flex-1 h-full
                  flex items-center justify-center
                  rounded-xl
                  text-sm font-medium
                  transition-all duration-200

                  ${
                    isActive
                      ? `
                        bg-[var(--brand-purple)]/80
                        text-gray-900 dark:text-white
                        shadow-sm
                      `
                      : `
                        text-gray-500 dark:text-gray-400
                        hover:text-gray-900 dark:hover:text-white
                        hover:bg-black/5 dark:hover:bg-white/5
                      `
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
