"use client";

import {
  DotsThreeOutlineVerticalIcon,
  MinusIcon,
  PlusIcon,
} from "@phosphor-icons/react";

const glassPanel =
  "border border-black/10 bg-gradient-to-br from-white to-black/[0.03] shadow-[0_15px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl";

const actionButton =
  "flex items-center gap-2 rounded-xl border border-black/10 bg-white/70 px-4 py-2.5 text-sm font-semibold hover:-translate-y-0.5 hover:bg-white transition";

const cardStyle =
  "rounded-3xl border border-black/10 bg-gradient-to-br from-white to-black/[0.03] p-6 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition";

const stats = [
  "Current Balance",
  "24H Portfolio Change",
  "Total Profit / Loss",
  "Top Performer",
];

export default function Page() {
  return (
    <div className="w-full text-[var(--brand-black)]">
      <div className="max-w-[1440px] mx-auto px-[72px] py-10 space-y-10">
        <div
          className={`rounded-3xl p-4 flex items-center justify-between ${glassPanel}`}
        >
          <div className="flex items-center gap-2">
            <button className="rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/20">
              Overview
            </button>

            <button className={actionButton}>Holdings</button>

            <button className={actionButton}>
              <PlusIcon size={16} weight="bold" />
              <span>New Portfolio</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className={actionButton}>
              <PlusIcon size={16} weight="bold" />
              Add Coin
            </button>

            <button className={actionButton}>
              <MinusIcon size={16} weight="bold" />
              Remove
            </button>

            <button className="rounded-xl border border-black/10 bg-white/70 p-3 hover:-translate-y-0.5 transition">
              <DotsThreeOutlineVerticalIcon size={18} weight="fill" />
            </button>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          {stats.map((item) => (
            <div key={item} className={cardStyle}>
              <p className="text-sm font-medium text-black/60">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
