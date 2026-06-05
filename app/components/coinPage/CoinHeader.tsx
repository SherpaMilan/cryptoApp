"use client";

import Image from "next/image";
import { IoArrowBackCircleOutline } from "react-icons/io5";

type Props = {
  name: string;
  symbol: string;
  image: string;
  rank: number | null;
};

export default function CoinHeader({ name, symbol, image, rank }: Props) {
  return (
    <header className="relative flex items-center justify-between py-5">
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
      <button
        onClick={() => window.history.back()}
        className="cursor-pointer hover:opacity-60"
      >
        <IoArrowBackCircleOutline size={34} />
      </button>

      <div className="flex items-center gap-3">
        <Image src={image} alt={name} width={22} height={22} />
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{name}</span>
          <span className="text-xs text-gray-500 uppercase">{symbol}</span>
        </div>
      </div>

      <div className="text-xs font-bold px-3 py-1 rounded-full">
        Rank #{rank ?? "-"}
      </div>
    </header>
  );
}
