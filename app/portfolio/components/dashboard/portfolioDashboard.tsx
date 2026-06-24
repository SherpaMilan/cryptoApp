"use client";

import { ChartLineUpIcon, PlusIcon } from "@phosphor-icons/react";

const tableHeaders = [
  "Asset",
  "Holdings",
  "Avg. Buy Price",
  "Current Price",
  "Value",
  "Profit / Loss",
  "Actions",
];

const panelClass =
  "rounded-[28px] border border-black/10 bg-white/35 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.04]";

const cardClass =
  "rounded-3xl border border-black/10 bg-white/35 p-6 text-left backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white/50 dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]";

const innerPanelClass =
  "rounded-2xl border border-black/10 bg-white/40 dark:border-white/10 dark:bg-white/[0.04]";

export default function PortfolioDashboard() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-background px-4 py-6 text-foreground sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-[1440px] gap-5 lg:grid-cols-[260px_1fr]">
        <div className="grid gap-4 md:grid-cols-3">
          {["Current Balance", "Total Profit / Loss", "Assets Tracked"].map(
            (item) => (
              <button key={item} className={cardClass}>
                <p className="text-sm text-chart-muted">{item}</p>
                <h2 className="mt-3 text-3xl font-semibold">--</h2>
              </button>
            ),
          )}
        </div>

        <section className={panelClass}>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-chart-muted">Portfolio Value</p>
              <h2 className="mt-1 text-3xl font-semibold">--</h2>
            </div>

            <div className="flex rounded-xl border border-black/10 bg-time-bg p-1 text-xs text-chart-muted dark:border-white/10">
              {["1D", "7D", "1M", "1Y"].map((item) => (
                <button
                  key={item}
                  className={`rounded-lg px-3 py-2 font-medium transition active:scale-95 ${
                    item === "7D"
                      ? "bg-foreground text-background"
                      : "hover:bg-time-hover hover:text-foreground"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`relative flex h-[340px] items-center justify-center overflow-hidden ${innerPanelClass}`}
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(120,120,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(120,120,255,0.06)_1px,transparent_1px)] bg-[size:32px_32px]" />

            <div className="relative text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground text-background">
                <ChartLineUpIcon size={28} weight="bold" />
              </div>

              <p className="mt-4 text-sm font-semibold">Chart container</p>

              <p className="mt-1 text-sm text-chart-muted">
                Import your chart component here later.
              </p>
            </div>
          </div>
        </section>

        <section className={panelClass}>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Assets</h2>
              <p className="text-sm text-chart-muted">
                Add coins manually to start tracking this portfolio.
              </p>
            </div>
          </div>

          <div className={`overflow-x-auto ${innerPanelClass}`}>
            <table className="w-full min-w-[900px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-black/10 text-left text-chart-muted dark:border-white/10">
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

                      <p className="mt-1 text-sm text-chart-muted">
                        Use the Add Coin button to manually add your first
                        asset.
                      </p>

                      <button className="mt-5 inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition hover:scale-[1.02] active:scale-[0.98]">
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
      </div>
    </main>
  );
}
