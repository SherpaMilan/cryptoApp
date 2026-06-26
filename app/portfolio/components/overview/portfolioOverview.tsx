"use client";

import Image from "next/image";
import AddButton from "../buttons/addButton";

export default function PortfolioOverview() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="flex max-w-[520px] flex-col items-center text-center">
        <Image
          src="/images/portfolio-empty.png"
          alt="Portfolio empty state"
          width={320}
          height={320}
          priority
          className="drop-shadow-[0_28px_55px_rgba(15,23,42,0.12)]"
        />

        <p className="text-xl font-semibold tracking-tight text-foreground">
          Ready when you are
        </p>

        <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          Add your first coin to begin.
        </p>

        <div className="mt-8">
          <AddButton className="w-[250px]">Add Coins</AddButton>
        </div>
      </div>
    </div>
  );
}
