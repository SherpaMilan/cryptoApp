"use client";

import { PlusIcon } from "@phosphor-icons/react";
import ActionMenu from "./actionMenu";

type Props = {
  portfolio: {
    name: string;
    icon: string;
  };
  onDelete: () => void;
};

export default function PortfolioSidebar({ portfolio, onDelete }: Props) {
  return (
    <aside className="relative overflow-hidden rounded-[28px] border border-black/10 bg-white/35 p-4 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.04]">
      <div
        aria-hidden="true"
        className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl"
      />

      <div className="relative mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-600 dark:text-white/50">
          Portfolios
        </h2>

        <button
          title="New Portfolio"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-white/60 text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-white active:scale-95 dark:border-white/10 dark:bg-white/[0.06] dark:text-white/70 dark:hover:bg-white/[0.1]"
        >
          <PlusIcon size={17} weight="bold" />
        </button>
      </div>

      <div className="group relative flex w-full items-center justify-between overflow-hidden rounded-2xl border border-black/10 bg-white/65 px-3 py-3 shadow-sm transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/[0.1]">
        <div className="absolute inset-y-0 left-0 w-1 bg-slate-950 dark:bg-emerald-400" />

        <div className="flex min-w-0 flex-1 items-center gap-2.5 pl-1">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-lg text-white shadow-md dark:bg-emerald-400 dark:text-black">
            {portfolio.icon}
          </div>

          <p
            title={portfolio.name}
            className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-950 dark:text-white"
          >
            {portfolio.name}
          </p>
        </div>

        <ActionMenu
          editLabel="Edit Portfolio"
          deleteLabel="Delete Portfolio"
          onEdit={() => {}}
          onDelete={onDelete}
        />
      </div>
    </aside>
  );
}
