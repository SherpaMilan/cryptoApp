"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CaretDownIcon } from "@phosphor-icons/react";

export default function Converter() {
  const [open, setOpen] = useState(false);

  const coins = [
    { name: "Bitcoin", symbol: "BTC", img: "/btc.png" },
    { name: "Ethereum", symbol: "ETH", img: "/eth.png" },
    { name: "Solana", symbol: "SOL", img: "/sol.png" },
    { name: "Binance Coin", symbol: "BNB", img: "/bnb.png" },
    { name: "XRP", symbol: "XRP", img: "/xrp.png" },
  ];

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <div className="w-full bg-background text-foreground">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[72px] py-10">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 p-2">
            <div className="bg-muted/30 border border-border rounded-2xl p-5 h-[150px] flex flex-col justify-between">
              <p className="text-xs text-muted-foreground">From</p>

              <input
                type="text"
                placeholder="0.00"
                className="bg-transparent text-3xl font-semibold outline-none"
              />

              <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 w-fit"
              >
                <Image src="/btc.png" alt="btc" width={22} height={22} />
                <span className="text-sm font-medium">BTC</span>
                <CaretDownIcon size={16} />
              </button>
            </div>

            <div className="flex justify-center my-5">
              <button className="p-3 hover:bg-muted rounded-full transition">
                <Image src="/swap.svg" alt="swap" width={28} height={28} />
              </button>
            </div>

            <div className="bg-muted/30 border border-border rounded-2xl p-5 h-[150px] flex flex-col justify-between">
              <p className="text-xs text-muted-foreground">To</p>

              <input
                type="text"
                placeholder="0.00"
                disabled
                className="bg-transparent text-3xl font-semibold outline-none opacity-80"
              />

              <div className="flex items-center gap-2">
                <Image src="/eth.png" alt="eth" width={22} height={22} />
                <span className="text-sm font-medium">ETH</span>
                <CaretDownIcon size={16} />
              </div>
            </div>
          </div>

          <div className="flex-1 bg-card border border-border rounded-2xl p-6 min-h-[420px]">
            <h2 className="text-sm font-medium mb-4">Market Chart</h2>

            <div className="w-full h-[340px] border border-dashed border-border rounded-xl flex items-center justify-center text-muted-foreground">
              Chart Container (will integrate later)
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setOpen(false)} // close on outside click
        >
          <div
            className="w-[380px] h-[420px] bg-background border border-border rounded-xl shadow-2xl p-4"
            onClick={(e) => e.stopPropagation()} // prevent close inside
          >
            <input
              type="text"
              placeholder="Search coin..."
              className="w-full bg-muted/30 px-3 py-2 rounded-lg text-sm outline-none"
            />

            <div className="mt-3 space-y-1 overflow-y-auto h-[340px]">
              {coins.map((coin) => (
                <div
                  key={coin.symbol}
                  className="flex items-center gap-3 p-2 hover:bg-muted/40 rounded-lg cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  <Image
                    src={coin.img}
                    alt={coin.symbol}
                    width={20}
                    height={20}
                  />
                  <span className="text-sm">
                    {coin.name} ({coin.symbol})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
