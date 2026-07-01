"use client";

import Image from "next/image";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";

import ActionButton from "../buttons/actionButton";
import { useState } from "react";
import AddCoinModal from "../modals/addCoinModal";

type Props = {
  portfolioName: string;
};

export default function PortfolioOverview({ portfolioName }: Props) {
  const [showAddCoinModal, setShowAddCoinModal] = useState(false);

  return (
    <section className="flex min-h-[70vh] flex-col ">
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

      <div className="flex flex-1 items-center justify-center">
        <div className="relative flex max-w-[650px] flex-col items-center text-center">
          <div className="relative mb-8">
            <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--brand-purple)]/10 blur-3xl" />

            <div className="absolute -left-10 top-14 rounded-2xl border border-black/10 bg-white/70 px-3 py-2 text-sm font-semibold shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]">
              ₿ BTC
            </div>

            <div className="absolute -right-10 top-20 rounded-2xl border border-black/10 bg-white/70 px-3 py-2 text-sm font-semibold shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]">
              Ξ ETH
            </div>

            <div className="absolute bottom-12 -right-4 rounded-2xl border border-black/10 bg-white/70 px-3 py-2 text-sm font-semibold shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]">
              ◎ SOL
            </div>

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
            className="
              mt-8
              bg-[var(--brand-purple)]
              px-6
              text-black
              shadow-[0_15px_40px_rgba(124,58,237,0.35)]
            "
          >
            Add First Coin
          </ActionButton>
        </div>
      </div>
      {showAddCoinModal && (
        <AddCoinModal onClose={() => setShowAddCoinModal(false)} />
      )}
    </section>
  );
}
