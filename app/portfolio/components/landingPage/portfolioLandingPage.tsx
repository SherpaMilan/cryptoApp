"use client";

import { StackPlusIcon, ArrowCircleRightIcon } from "@phosphor-icons/react";
type Props = {
  onOpenPortfolioForm: () => void;
};

export default function LandingPage({ onOpenPortfolioForm }: Props) {
  return (
    <main className="overflow-x-hidden text-[var(--brand-black)] dark:bg-background dark:text-foreground">
      <section className="relative mx-auto max-w-[1440px] overflow-hidden px-[72px] py-6">
        <header>
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-cyan-400/30 bg-transparent px-5 py-3 text-sm font-semibold text-[var(--brand-black)] shadow-[0_0_35px_rgba(34,211,238,0.15)] backdrop-blur-xl dark:text-[var(--brand-white)]">
            <div className="flex size-6 items-center justify-center rounded-full bg-green-500/20">
              <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.9)]" />
            </div>

            <span className="tracking-wide">Your portfolio starts here</span>
          </div>
          <h1 className="flex flex-wrap items-baseline gap-x-6 text-4xl font-semibold tracking-tight">
            <span>Track.</span>

            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              Analyze.
            </span>

            <span className="bg-gradient-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
              Grow.
            </span>
          </h1>
        </header>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_320px]">
          <article className="relative overflow-hidden rounded-[28px] bg-[#070A0F] p-6 text-[var(--brand-white)]">
            <header className="flex justify-between">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>

              <code className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-white/50">
                portfolio.core
              </code>
            </header>

            <div className="mt-6 space-y-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-white/40">
                  System status
                </p>

                <h2 className="mt-2 text-3xl font-semibold">
                  Portfolio <span className="text-cyan-400">ready.</span>
                </h2>
              </div>

              <dl className="rounded-2xl border border-white/10 bg-white/5 p-4 font-mono text-sm">
                <div className="flex justify-between">
                  <dt className="text-white/60">Market data</dt>
                  <dd className="text-green-400">Connected</dd>
                </div>

                <div className="mt-3 flex justify-between">
                  <dt className="text-white/60">Asset tracking</dt>
                  <dd className="text-green-400">Ready</dd>
                </div>

                <div className="mt-3 flex justify-between">
                  <dt className="text-white/60">Portfolio engine</dt>
                  <dd className="animate-pulse text-cyan-400">Waiting</dd>
                </div>
              </dl>

              <p className="text-sm text-white/50">
                Initialize your crypto workspace.
              </p>
            </div>

            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cyan-500/20 to-transparent"
            />
          </article>

          <aside className="rounded-[28px] border border-black/10 bg-[var(--brand-white)] p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="flex items-start gap-4">
              <div className="flex h-8 mt-1 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-black)] text-[var(--brand-white)] dark:bg-white dark:text-black">
                <StackPlusIcon size={18} />
              </div>

              <h2 className="text-2xl font-semibold tracking-tight">
                Stay ahead of the market
              </h2>
            </div>

            <ol className="mt-6 space-y-4">
              <li className="flex gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand-black)] text-sm text-[var(--brand-white)] dark:bg-white dark:text-black">
                  1
                </span>

                <div>
                  <p className="text-sm font-medium">Build dashboard</p>
                  <p className="text-xs text-black/50 dark:text-white/40">
                    Set up your investment space
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/20 text-sm dark:border-white/20">
                  2
                </span>

                <div>
                  <p className="text-sm">Add assets</p>
                  <p className="text-xs text-black/50 dark:text-white/40">
                    Add coins and track holdings
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/20 text-sm dark:border-white/20">
                  3
                </span>

                <div>
                  <p className="text-sm">Monitor progress</p>
                  <p className="text-xs text-black/50 dark:text-white/40">
                    View performance and insights
                  </p>
                </div>
              </li>
            </ol>

            <button
              type="button"
              onClick={onOpenPortfolioForm}
              className="group relative mt-6 flex w-full items-center justify-center rounded-xl bg-[var(--brand-black)] px-5 py-3 text-sm font-medium text-[var(--brand-white)] transition hover:scale-[1.02] dark:bg-white dark:text-black"
            >
              <span>Launch portfolio</span>

              <ArrowCircleRightIcon
                size={24}
                className="absolute right-5 transition-transform group-hover:translate-x-1"
              />
            </button>
          </aside>
        </div>
      </section>
    </main>
  );
}
