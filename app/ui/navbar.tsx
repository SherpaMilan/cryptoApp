"use client";
import Link from "next/link";
import Logo from "@/ui/logo";
import { usePathname } from "next/navigation";
import { VscLayers } from "react-icons/vsc";
import { IoLayersSharp } from "react-icons/io5";
import { RiHome9Line, RiHome9Fill } from "react-icons/ri";
import { GoSearch } from "react-icons/go";
import { FiMoon } from "react-icons/fi";
import CurrencyDropdown from "@/ui/currencyDropdown";

const links = [
  {
    name: "Home",
    href: "/",
    defaultIcon: RiHome9Line,
    boldIcon: RiHome9Fill,
  },
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
    <div className="max-w-[1440px] mx-auto flex justify-between items-center h-[80px] px-[72px] box-border ">
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
          <form className="relative w-[356px] h-[48px] bg-[var(--brand-purple-light)]  rounded-[15px] flex items-center">
            <input
              type="text"
              placeholder="Search..."
              aria-label="Search cryptocurrencies"
              className="peer w-full pl-10 pr-3 h-full rounded-[15px] placeholder:text-[var(--brand-purple)] bg-transparent focus:outline-none focus:ring-1 focus:ring-[var(--brand-purple)]"
            />
            <GoSearch className="absolute left-3 top-1/2 -translate-y-1/2 border-[var(--brand-purple)] peer-focus:text-[var(--brand-purple)] pointer-events-none" />
          </form>

          <CurrencyDropdown />

          {/* TODO: implement dark mode toggle later in the project*/}
          <button
            aria-label="Toggle dark mode"
            className="rounded-[15px] bg-[var(--brand-purple-light)] p-2 w-[48px] h-[48px] flex justify-center items-center cursor-pointer "
          >
            <FiMoon className="w-6 h-6 border-[var(--brand-purple)] fill-none" />
          </button>
        </div>
      </nav>
    </div>
  );
}
