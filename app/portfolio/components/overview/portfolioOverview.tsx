"use client";

import Image from "next/image";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
import { useState } from "react";

import ActionButton from "../buttons/actionButton";
import AddCoinModal from "../modals/addCoinModal";
import { usePortfolioStore } from "@/portfolio/store/usePortfolioStore";

import PortfolioViewTabs from "../dashboard/portfolioViewTabs";
import PortfolioAnalytics from "../analytics/portfolioAnalytics";
import PortfolioAssets from "../assets/portfolioAssets";
import { PortfolioView } from "./types";
import RemoveCoinModal from "../modals/removeCoinModal";

type Props = {
  portfolioName: string;
  coinIds: string[];
};

export default function PortfolioOverview({
  portfolioName,
  coinIds = [],
}: Props) {
  const [showAddCoinModal, setShowAddCoinModal] = useState(false);
  const [showRemoveCoinModal, setShowRemoveCoinModal] = useState(false);

  const [activeView, setActiveView] = useState<PortfolioView>("assets");

  const hasCoins = coinIds.length > 0;

  const removeCoinFromCurrentPortfolio = usePortfolioStore(
    (state) => state.removeCoinFromCurrentPortfolio,
  );

  return (
    <section className="flex flex-col ">
      <div className="flex items-start justify-between px-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Overview
          </p>

          <h1 className="mt-2 text-xl font-bold tracking-tight">
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
            disabled={!hasCoins}
            onClick={() => {
              console.log("remove clicked");
              setShowRemoveCoinModal(true);
            }}
            className="dark:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:opacity-40"
            icon={<MinusIcon size={16} weight="bold" />}
          >
            Remove Coin
          </ActionButton>
        </div>
      </div>

      {hasCoins && (
        <div className="mt-8 px-3">
          <PortfolioViewTabs activeView={activeView} onChange={setActiveView} />
        </div>
      )}

      {hasCoins ? (
        activeView === "assets" ? (
          <PortfolioAssets
            coinIds={coinIds}
            onRemoveCoin={removeCoinFromCurrentPortfolio}
          />
        ) : (
          <PortfolioAnalytics />
        )
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

      {showRemoveCoinModal && (
        <RemoveCoinModal
          coinIds={coinIds}
          onClose={() => setShowRemoveCoinModal(false)}
        />
      )}
    </section>
  );
}
