"use client";

import { useState } from "react";
import { portfolioIcons } from "../../constants/portfolioIcons";

type Props = {
  avatar: string;
  onAvatarChange: (icon: string) => void;
};

export default function PortfolioIconPicker({ avatar, onAvatarChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="rounded-xl bg-[var(--brand-purple)] px-4 py-2 text-sm font-medium cursor-pointer transition hover:opacity-80"
      >
        Change
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 grid w-[190px] grid-cols-4 gap-2 rounded-2xl border border-black/10 bg-white p-3 shadow-xl">
          {portfolioIcons.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                onAvatarChange(item);
                setOpen(false);
              }}
              className={`flex size-10 items-center justify-center rounded-xl text-xl transition hover:bg-black/10 ${
                avatar === item ? "bg-black/10" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
