"use client";

import { STATS_BAR_ICON_PROPS } from "@/constants/statsbarIcons";
import { DotsThreeVerticalIcon, PlusCircleIcon } from "@phosphor-icons/react";

export default function Page() {
  return (
    <div className="w-full">
      <div className="max-w-[1440px] mx-auto px-[72px] py-10 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80 transition">
              Overview
            </button>

            <button className="rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-medium hover:bg-black/5 transition">
              Holdings
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-medium hover:bg-black/5 transition">
              <PlusCircleIcon {...STATS_BAR_ICON_PROPS} />
              Add Coin
            </button>

            <button className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-medium hover:bg-black/5 transition">
              Remove
            </button>

            <button className="rounded-lg border border-black/10 bg-white p-2 hover:bg-black/5 transition">
              <DotsThreeVerticalIcon {...STATS_BAR_ICON_PROPS} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button className="flex items-center gap-1 rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-medium hover:bg-black/5 transition">
            <PlusCircleIcon {...STATS_BAR_ICON_PROPS} />
            New Portfolio
          </button>

          <p className="text-sm text-muted-foreground">
            Track your crypto portfolio performance
          </p>
        </div>
      </div>
    </div>
  );
}
