"use client";

import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { usePathname } from "next/navigation";
import { VscLayers } from "react-icons/vsc";
import { IoLayersSharp } from "react-icons/io5";
import CurrencyDropdown from "@/components/ui/CurrencyDropdown";
import Search from "./Search";
import Theme from "./Theme";

const links = [
  {
    name: "Portfolio",
    href: "/portfolio",
    defaultIcon: VscLayers,
    boldIcon: IoLayersSharp,
  },
];

export default function Navbar() {
  // usePathname provides current URL path of the page you’re on.
  const pathname = usePathname();

  return (
    <div className="max-w-[1440px] mx-auto flex justify-between items-center h-[70px] px-[72px] box-border bg-background text-foreground">
      <nav className="w-full flex items-center justify-between">
        <div className="flex-1 flex items-center h-[48px]">
          <Logo />
        </div>

        <div className="flex flex-1 items-center justify-center h-[48px] gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = isActive ? link.boldIcon : link.defaultIcon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  text-[17px]
                  flex items-center gap-2 px-3 py-2 rounded-xl
                  transition-all duration-200 ease-out

                  ${
                    isActive
                      ? "font-semibold text-black dark:text-white"
                      : "text-foreground/70"
                  }

                  hover:bg-black/5 dark:hover:bg-white/10
                  hover:text-black dark:hover:text-white
                  hover:scale-[1.03]
                `}
              >
                <Icon className="w-[22px] h-[22px] transition-transform duration-200 group-hover:scale-110" />
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="flex flex-1 justify-end items-center h-[48px] space-x-4">
          <Search />
          <CurrencyDropdown />
          <Theme />
        </div>
      </nav>
    </div>
  );
}
