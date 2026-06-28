"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/components/ui/Logo";
import Search from "../ui/Search";
import Theme from "../ui/Theme";
import CurrencyDropdown from "@/components/ui/CurrencyDropdown";

const links = [
  { name: "Coins", href: "/" },
  { name: "Converter", href: "/converter" },
  { name: "Portfolio", href: "/portfolio" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex h-[70px] max-w-[1440px] items-center bg-background px-[72px] text-foreground">
      <nav className="grid w-full grid-cols-[1fr_auto_1fr] items-center">
        <Logo />

        <div className="mr-10 flex items-center rounded-full bg-card/80 p-1">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            const baseStyles =
              "flex h-[42px] items-center justify-center rounded-full px-8 text-[15px] transition-all duration-200";

            const activeStyles = "bg-background font-semibold text-foreground";

            const inactiveStyles =
              "font-medium text-foreground/60 hover:text-foreground";

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${baseStyles} ${
                  isActive ? activeStyles : inactiveStyles
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-4">
          <Search />
          <CurrencyDropdown />
          <Theme />
        </div>
      </nav>
    </div>
  );
}
