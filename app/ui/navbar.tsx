"use client";
import Link from "next/link";
import Logo from "@/app/ui/logo";
import { usePathname } from "next/navigation";
import { VscLayers } from "react-icons/vsc";
import { IoLayersSharp } from "react-icons/io5";
import { RiHome9Line, RiHome9Fill } from "react-icons/ri";
import { GoSearch } from "react-icons/go";
import { FiMoon } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiCurrencyDollar } from "react-icons/hi2";

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
    <div className="w-full flex items-center gap-24 ">
      <div className="flex-1 flex items-center h-[48px]  ">
        <Logo />
      </div>
      <div className="flex items-center gap-10 h-[48px]">
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
      <div className="flex-1 flex  justify-end items-center h-[48px] gap-24  p-2">
        <div className="relative w-[356px] h-[48px] bg-[#CCCCFA66] rounded-[15px] flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="peer w-full pl-10 pr-3 h-full rounded-[15px] placeholder:text-[#424286CC] bg-transparent focus:outline-none focus:ring-1 focus:ring-[#424286CC]"
          />
          <GoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#424286CC] peer-focus:text-[#424286CC] pointer-events-none" />
        </div>

        <div className="rounded-[15px] flex justify-center items-center  bg-[#CCCCFA66] p-2">
          <HiCurrencyDollar className="w-5 h-5 mr-1 fill-[#424286]" />
          <span className="text-[#424286CC] ">USD</span>
          <MdKeyboardArrowDown className="inline-block w-4 h-4 ml-1 fill-[#424286]" />
        </div>
        <div className="rounded-[15px] bg-[#CCCCFA66] p-2 w-[48px] h-[48px] flex justify-center items-center">
          <FiMoon className="w-6 h-6 stroke-[#424286] fill-none" />
        </div>
      </div>
    </div>
  );
}
