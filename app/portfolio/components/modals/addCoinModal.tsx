"use client";

import { useMemo, useState } from "react";
import {
  CheckIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  XIcon,
} from "@phosphor-icons/react";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  price: string;
  change24h: number;
  marketCap: string;
  volume: string;
  rank: number;
};

const coins: Coin[] = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    icon: "₿",
    price: "A$99,672.21",
    change24h: 3.25,
    marketCap: "A$1.97T",
    volume: "A$48.62B",
    rank: 1,
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    icon: "Ξ",
    price: "A$3,221.34",
    change24h: 1.45,
    marketCap: "A$388.4B",
    volume: "A$19.8B",
    rank: 2,
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    icon: "◎",
    price: "A$198.67",
    change24h: 5.21,
    marketCap: "A$91.2B",
    volume: "A$6.4B",
    rank: 5,
  },
  {
    id: "bnb",
    name: "BNB",
    symbol: "BNB",
    icon: "⬡",
    price: "A$698.12",
    change24h: 0.83,
    marketCap: "A$102.7B",
    volume: "A$2.1B",
    rank: 4,
  },
  {
    id: "xrp",
    name: "XRP",
    symbol: "XRP",
    icon: "✕",
    price: "A$1.43",
    change24h: -0.42,
    marketCap: "A$79.8B",
    volume: "A$3.5B",
    rank: 6,
  },
  {
    id: "ada",
    name: "Cardano",
    symbol: "ADA",
    icon: "₳",
    price: "A$0.71",
    change24h: -1.12,
    marketCap: "A$25.4B",
    volume: "A$912M",
    rank: 10,
  },
  {
    id: "doge",
    name: "Dogecoin",
    symbol: "DOGE",
    icon: "Ð",
    price: "A$0.26",
    change24h: 2.18,
    marketCap: "A$38.6B",
    volume: "A$1.9B",
    rank: 8,
  },
  {
    id: "avax",
    name: "Avalanche",
    symbol: "AVAX",
    icon: "A",
    price: "A$42.55",
    change24h: -2.04,
    marketCap: "A$17.8B",
    volume: "A$824M",
    rank: 13,
  },
  {
    id: "link",
    name: "Chainlink",
    symbol: "LINK",
    icon: "⬢",
    price: "A$21.72",
    change24h: 1.72,
    marketCap: "A$13.5B",
    volume: "A$692M",
    rank: 16,
  },
];

type Props = {
  onClose: () => void;
};

export default function AddCoinModal({ onClose }: Props) {
  const [search, setSearch] = useState("");
  const [previewCoin, setPreviewCoin] = useState<Coin>(coins[0]);
  const [selectedCoinIds, setSelectedCoinIds] = useState<string[]>([]);

  const filteredCoins = useMemo(() => {
    const searchValue = search.toLowerCase();

    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchValue) ||
        coin.symbol.toLowerCase().includes(searchValue),
    );
  }, [search]);

  function toggleCoin(coinId: string) {
    setSelectedCoinIds((current) =>
      current.includes(coinId)
        ? current.filter((id) => id !== coinId)
        : [...current, coinId],
    );
  }

  const isPositive = previewCoin.change24h >= 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm">
      <div className="flex max-h-[86vh] w-full max-w-[1050px] flex-col overflow-hidden rounded-[26px] border border-black/10 bg-background shadow-[0_30px_120px_rgba(0,0,0,0.35)] dark:border-white/10">
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-4 dark:border-white/10">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Add Coin</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Search and select coins for this portfolio.
            </p>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer rounded-full p-2 text-muted-foreground transition hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10"
          >
            <XIcon size={20} />
          </button>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[1fr_0.9fr]">
          <div className="flex min-h-0 flex-col border-b border-black/10 p-5 dark:border-white/10 lg:border-b-0 lg:border-r">
            <div className="relative shrink-0">
              <MagnifyingGlassIcon
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search coins"
                className="h-11 w-full rounded-xl border border-black/10 bg-black/[0.03] pl-11 pr-4 text-sm outline-none transition focus:border-[var(--brand-purple)] dark:border-white/10 dark:bg-white/[0.05]"
              />
            </div>

            <div className="mt-4 flex shrink-0 gap-3 border-b border-black/10 pb-4 text-sm dark:border-white/10">
              <button className="font-semibold text-[var(--brand-purple)]">
                Trending
              </button>
              <button className="text-muted-foreground hover:text-foreground">
                Gainers
              </button>
              <button className="text-muted-foreground hover:text-foreground">
                Losers
              </button>
              <button className="text-muted-foreground hover:text-foreground">
                New
              </button>
            </div>

            <div className="mt-3 min-h-0 flex-1 space-y-1 overflow-y-auto pr-2">
              {filteredCoins.map((coin) => {
                const isSelected = selectedCoinIds.includes(coin.id);
                const isPreviewed = previewCoin.id === coin.id;

                return (
                  <div
                    key={coin.id}
                    onMouseEnter={() => setPreviewCoin(coin)}
                    className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 transition ${
                      isPreviewed
                        ? "bg-black/[0.04] dark:bg-white/[0.06]"
                        : "hover:bg-black/[0.025] dark:hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-base font-bold text-white dark:bg-white dark:text-black">
                        {coin.icon}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {coin.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {coin.symbol}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="hidden text-right sm:block">
                        <p className="text-sm font-medium">{coin.price}</p>
                        <p
                          className={`text-xs font-semibold ${
                            coin.change24h >= 0
                              ? "text-emerald-500"
                              : "text-red-500"
                          }`}
                        >
                          {coin.change24h >= 0 ? "+" : ""}
                          {coin.change24h}%
                        </p>
                      </div>

                      <button
                        onClick={() => toggleCoin(coin.id)}
                        className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border transition ${
                          isSelected
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : "border-black/20 text-muted-foreground hover:border-emerald-500 hover:text-emerald-500 dark:border-white/25"
                        }`}
                      >
                        {isSelected ? (
                          <CheckIcon size={15} weight="bold" />
                        ) : (
                          <PlusIcon size={15} weight="bold" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="min-h-0 p-5">
            <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-black/[0.025] p-5 dark:border-white/10 dark:bg-white/[0.04]">
              <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[var(--brand-purple)]/15 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-foreground text-lg font-bold text-background">
                    {previewCoin.icon}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold leading-none">
                      {previewCoin.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {previewCoin.symbol} · Rank #{previewCoin.rank}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    isPositive
                      ? "bg-emerald-500/12 text-emerald-500"
                      : "bg-red-500/12 text-red-500"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {previewCoin.change24h}%
                </span>
              </div>

              <div className="relative mt-6 rounded-2xl bg-background/65 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] dark:bg-black/10">
                <MetricRow label="Current Price" value={previewCoin.price} />
                <MetricRow label="Market Cap" value={previewCoin.marketCap} />
                <MetricRow label="24h Volume" value={previewCoin.volume} />
              </div>
            </div>

            <div className="mt-5 h-[220px] rounded-3xl border border-dashed border-black/10 bg-[linear-gradient(135deg,rgba(124,58,237,0.05),rgba(16,185,129,0.04))] dark:border-white/10 dark:bg-white/[0.03]" />
          </div>
        </div>

        <div className="sticky bottom-0 z-20 flex items-center justify-between border-t border-black/10 bg-background/95 px-6 py-4 backdrop-blur-md dark:border-white/10">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {selectedCoinIds.length}
            </span>{" "}
            selected
          </p>

          <button
            disabled={selectedCoinIds.length === 0}
            className="flex h-11 min-w-[190px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--brand-purple)] px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            Add Coins
            <PlusIcon size={16} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-black/10 py-3 last:border-b-0 dark:border-white/10">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}
