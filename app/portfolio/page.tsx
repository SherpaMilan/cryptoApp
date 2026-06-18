"use client";

export default function Page() {
  return (
    <main className="min-h-[calc(100vh-80px)] overflow-hidden bg-gray-100 text-[var(--brand-black)]">
      <section
        aria-labelledby="portfolio-title"
        className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-[1440px] flex-col justify-center px-[72px] py-8"
      >
        <div
          aria-hidden="true"
          className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-cyan-400/20 blur-[140px]"
        />

        <div
          aria-hidden="true"
          className="absolute bottom-[-120px] left-[-120px] h-[380px] w-[380px] rounded-full bg-purple-400/20 blur-[120px]"
        />

        <header className="relative">
          <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium backdrop-blur">
            <span
              aria-hidden="true"
              className="h-2 w-2 animate-pulse rounded-full bg-green-500"
            />
            Your portfolio starts here
          </p>

          <h1
            id="portfolio-title"
            className="mt-7 flex flex-wrap items-baseline gap-x-8 text-6xl font-semibold leading-none tracking-tight"
          >
            <span>Track.</span>

            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              Analyze.
            </span>

            <span className="bg-gradient-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
              Grow.
            </span>
          </h1>
        </header>

        <div className="relative mt-8 grid gap-5 lg:grid-cols-[1fr_320px]">
          <article
            aria-label="Portfolio system status"
            className="relative overflow-hidden rounded-[28px] bg-[#070A0F] p-6 text-white"
          >
            <header className="flex items-center justify-between">
              <div aria-hidden="true" className="flex gap-2">
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
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/40">
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
              className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-cyan-500/20 to-transparent"
            />
          </article>

          <aside
            aria-label="Create portfolio"
            className="self-start rounded-[28px] border border-black/10 bg-white p-6 shadow-sm"
          >
            <div
              aria-hidden="true"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-lg text-white"
            >
              +
            </div>

            <h2 className="mt-5 text-2xl font-semibold tracking-tight">
              Create new portfolio
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-black/60">
              Create your workspace and start tracking your crypto assets.
            </p>

            <ol
              aria-label="Portfolio creation steps"
              className="mt-6 space-y-4"
            >
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm text-white"
                >
                  1
                </span>

                <div>
                  <p className="text-sm font-medium">Create portfolio</p>

                  <p className="text-xs text-black/50">Setup workspace</p>
                </div>
              </li>

              <li className="flex gap-3 text-sm text-black/40">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 items-center justify-center rounded-full border"
                >
                  2
                </span>
                Add assets
              </li>

              <li className="flex gap-3 text-sm text-black/40">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 items-center justify-center rounded-full border"
                >
                  3
                </span>
                Track performance
              </li>
            </ol>

            <button
              type="button"
              className="group mt-6 flex w-full items-center justify-between rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              Launch portfolio
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </button>
          </aside>
        </div>
      </section>
    </main>
  );
}
