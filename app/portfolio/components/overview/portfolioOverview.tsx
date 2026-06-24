"use client";

import Image from "next/image";

export default function PortfolioOverview() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="flex max-w-[520px] flex-col items-center text-center">
        <Image
          src="/images/portfolio-welcome.png"
          alt="Portfolio Welcome"
          width={320}
          height={320}
          priority
        />

        <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
          Add your favourite coins
        </h2>

        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          Track coins you are interested in and monitor their performance over
          time.
        </p>

        <button className="mt-8 w-full max-w-[340px] rounded-xl bg-foreground px-5 py-3 font-medium text-background transition hover:opacity-90">
          Add Coins
        </button>
      </div>
    </div>
  );
}
