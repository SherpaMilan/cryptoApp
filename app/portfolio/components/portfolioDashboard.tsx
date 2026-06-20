"use client";

import { ChartLineUpIcon, PlusIcon } from "@phosphor-icons/react";
import PortfolioSidebar from "./portfolioSidebar";

type Portfolio = {
  id: string;
  name: string;
  icon: string;
};

type Props = {
  portfolio: Portfolio;
  onDelete: () => void;
};

const tableHeaders = [
  "Asset",
  "Holdings",
  "Avg. Buy Price",
  "Current Price",
  "Value",
  "Profit / Loss",
  "Actions",
];

export default function PortfolioDashboard({ portfolio, onDelete }: Props) {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-[radial-gradient(circle_at_top,#eef4f1_0%,#f6f7f9_38%,#edf0f3_100%)] px-4 py-6 text-slate-950 dark:bg-[radial-gradient(circle_at_top,#073d30_0%,#06110f_40%,#020706_100%)] dark:text-white sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-[1440px] gap-5 lg:grid-cols-[260px_1fr]">
        <PortfolioSidebar portfolio={portfolio} onDelete={onDelete} />

        <section className="space-y-5">
          <section className="rounded-[28px] border border-black/10 bg-white/55 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-white/45">
                  Portfolio dashboard
                </p>

                <h1 className="mt-1 text-3xl font-semibold tracking-tight">
                  {portfolio.icon} {portfolio.name}
                </h1>

                <p className="mt-2 text-sm text-slate-500 dark:text-white/40">
                  Add coins manually and track what would happen if you owned
                  them.
                </p>
              </div>

              <button className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] active:scale-[0.98] dark:bg-emerald-400 dark:text-black">
                <PlusIcon size={17} weight="bold" />
                Add Coin
              </button>
            </div>
          </section>

          <div className="grid gap-4 md:grid-cols-3">
            <button className="rounded-3xl border border-black/10 bg-white/55 p-6 text-left backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]">
              <p className="text-sm text-slate-500 dark:text-white/45">
                Current Balance
              </p>
              <h2 className="mt-3 text-3xl font-semibold">--</h2>
            </button>

            <button className="rounded-3xl border border-black/10 bg-white/55 p-6 text-left backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]">
              <p className="text-sm text-slate-500 dark:text-white/45">
                Total Profit / Loss
              </p>
              <h2 className="mt-3 text-3xl font-semibold">--</h2>
            </button>

            <button className="rounded-3xl border border-black/10 bg-white/55 p-6 text-left backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]">
              <p className="text-sm text-slate-500 dark:text-white/45">
                Assets Tracked
              </p>
              <h2 className="mt-3 text-3xl font-semibold">--</h2>
            </button>
          </div>

          <section className="rounded-[28px] border border-black/10 bg-white/55 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.04]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-white/45">
                  Portfolio Value
                </p>
                <h2 className="mt-1 text-3xl font-semibold">--</h2>
              </div>

              <div className="flex rounded-xl border border-black/10 bg-white/50 p-1 text-xs text-slate-500 dark:border-white/10 dark:bg-black/20 dark:text-white/40">
                {["1D", "7D", "1M", "1Y"].map((item) => (
                  <button
                    key={item}
                    className={`rounded-lg px-3 py-2 font-medium transition active:scale-95 ${
                      item === "7D"
                        ? "bg-slate-950 text-white dark:bg-emerald-400 dark:text-black"
                        : "hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative flex h-[340px] items-center justify-center overflow-hidden rounded-2xl border border-black/10 bg-white/40 dark:border-white/10 dark:bg-black/20">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]" />

              <div className="relative text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-emerald-400 dark:text-black">
                  <ChartLineUpIcon size={28} weight="bold" />
                </div>

                <p className="mt-4 text-sm font-semibold">Chart container</p>

                <p className="mt-1 text-sm text-slate-500 dark:text-white/40">
                  Import your chart component here later.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-black/10 bg-white/55 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.04]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Assets</h2>
                <p className="text-sm text-slate-500 dark:text-white/45">
                  Add coins manually to start tracking this portfolio.
                </p>
              </div>

              <button className="flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02] active:scale-[0.98] dark:bg-emerald-400 dark:text-black">
                <PlusIcon size={16} weight="bold" />
                Add Coin
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white/40 dark:border-white/10 dark:bg-black/10">
              <table className="w-full min-w-[900px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-black/10 text-left text-slate-500 dark:border-white/10 dark:text-white/40">
                    {tableHeaders.map((header) => (
                      <th key={header} className="px-5 py-4 font-semibold">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td colSpan={tableHeaders.length} className="px-5 py-14">
                      <div className="mx-auto max-w-sm text-center">
                        <p className="font-semibold">No coins added yet</p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-white/40">
                          Use the Add Coin button to manually add your first
                          asset.
                        </p>

                        <button className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02] active:scale-[0.98] dark:bg-emerald-400 dark:text-black">
                          <PlusIcon size={16} weight="bold" />
                          Add Coin
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
