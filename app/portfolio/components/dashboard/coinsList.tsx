"use client";

const tableHeaders = [
  "Asset",
  "Holdings",
  "Avg Buy",
  "Current Price",
  "Profit / Loss",
  "Actions",
];

const panelClass =
  "rounded-[32px] border border-black/10 bg-white/45 p-5 shadow-[0_24px_90px_rgba(15,23,42,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.04]";

const innerPanelClass =
  "overflow-hidden rounded-[24px] border border-black/10 bg-white/55 shadow-inner backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.035]";

export default function CoinsList() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-background px-4 py-6 text-foreground sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <section className={panelClass}>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-chart-muted">
                Portfolio Assets
              </p>

              <h2 className="text-2xl font-semibold tracking-tight">
                Coin Holdings
              </h2>

              <p className="mt-1 max-w-xl text-sm text-chart-muted">
                Track each coin, average buy price, current value, and overall
                profit in one clean view.
              </p>
            </div>
          </div>

          <div className={innerPanelClass}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-black/10 bg-black/[0.025] text-left text-xs uppercase tracking-[0.16em] text-chart-muted dark:border-white/10 dark:bg-white/[0.03]">
                    {tableHeaders.map((header) => (
                      <th key={header} className="px-6 py-4 font-semibold">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td colSpan={tableHeaders.length} className="px-6 py-20">
                      <div className="mx-auto flex max-w-md flex-col items-center text-center">
                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl border border-black/10 bg-white/70 text-3xl shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
                          ₿
                        </div>

                        <h3 className="text-xl font-semibold tracking-tight">
                          No coins added yet
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-chart-muted">
                          Start by adding your first crypto asset. Once added,
                          your holdings, profit, and portfolio performance will
                          appear here.
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
