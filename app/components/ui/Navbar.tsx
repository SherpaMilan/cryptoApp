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
      <nav className="w-full flex items-center justify-between ">
        <div className="flex-1 flex items-center h-[48px]  ">
          <Logo />
        </div>

        <div className="flex flex-1 items-center justify-center h-[48px] gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const ActiveIcon = isActive ? link.boldIcon : link.defaultIcon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[17px] flex justify-center items-center p-2 gap-2 ${
                  isActive ? "font-bold  " : ""
                }`}
              >
                <ActiveIcon className="w-[24px] h-[24px]" />
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="flex flex-1  justify-end items-center h-[48px]  space-x-4 ">
          <Search />
          <CurrencyDropdown />
          <Theme />
        </div>
      </nav>
    </div>
  );
}
