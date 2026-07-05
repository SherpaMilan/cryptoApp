"use client";

import Image from "next/image";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
import { useState } from "react";

import ActionButton from "../buttons/actionButton";
import AddCoinModal from "../modals/addCoinModal";
import { Coin } from "@/types/coin";

type Props = {
  portfolioName: string;
  coins?: Coin[];
};

export default function PortfolioOverview({
  portfolioName,
  coins = [],
}: Props) {
  const [showAddCoinModal, setShowAddCoinModal] = useState(false);

  const hasCoins = coins.length > 0;

  return (
    <section className="flex flex-col">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Portfolio Overview
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight">
            {portfolioName}
          </h1>
        </div>

        <div className="flex gap-3">
          <ActionButton
            onClick={() => setShowAddCoinModal(true)}
            className="dark:text-white"
            icon={<PlusIcon size={16} weight="bold" />}
          >
            Add Coin
          </ActionButton>

          <ActionButton
            className="dark:text-white"
            icon={<MinusIcon size={16} weight="bold" />}
          >
            Remove
          </ActionButton>
        </div>
      </div>

      {hasCoins ? (
        <div className="mt-8 rounded-[28px] border border-black/10 bg-white/70 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/[0.04]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-tight">Your Coins</h2>

            <p className="text-sm text-muted-foreground">
              {coins.length} selected
            </p>
          </div>

          <div className="space-y-3">
            {coins.map((coin) => (
              <div
                key={coin.id}
                className="flex items-center justify-between rounded-2xl border border-black/5 bg-background px-4 py-3 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)] dark:border-white/10"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Image
                    src={coin.image}
                    alt={coin.name}
                    width={34}
                    height={34}
                    className="h-[34px] w-[34px] rounded-full object-contain"
                  />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{coin.name}</p>
                    <p className="text-xs uppercase text-muted-foreground">
                      {coin.symbol}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold">
                    ${coin.current_price?.toLocaleString() ?? "-"}
                  </p>

                  <p
                    className={`text-xs font-semibold ${
                      (coin.price_change_percentage_24h_in_currency ?? 0) >= 0
                        ? "text-[var(--brand-green)]"
                        : "text-[var(--brand-red)]"
                    }`}
                  >
                    {coin.price_change_percentage_24h_in_currency === null ||
                    coin.price_change_percentage_24h_in_currency === undefined
                      ? "N/A"
                      : `${coin.price_change_percentage_24h_in_currency >= 0 ? "+" : ""}${coin.price_change_percentage_24h_in_currency.toFixed(2)}%`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center pt-16">
          <div className="relative flex max-w-[650px] flex-col items-center text-center">
            <div className="relative mb-8">
              <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--brand-purple)]/10 blur-3xl" />

              <Image
                src="/images/portfolio-empty.png"
                alt="Portfolio empty state"
                width={340}
                height={340}
                priority
                className="relative z-10 drop-shadow-[0_30px_60px_rgba(15,23,42,0.15)]"
              />
            </div>

            <h2 className="text-2xl font-bold tracking-tight">
              Your portfolio is empty
            </h2>

            <ActionButton
              onClick={() => setShowAddCoinModal(true)}
              icon={<PlusIcon size={18} weight="bold" />}
              className="mt-8 bg-[var(--blue-energy)] px-6 text-white"
            >
              Add First Coin
            </ActionButton>
          </div>
        </div>
      )}

      {showAddCoinModal && (
        <AddCoinModal onClose={() => setShowAddCoinModal(false)} />
      )}
    </section>
  );
}
