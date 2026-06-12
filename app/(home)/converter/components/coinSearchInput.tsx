"use client";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function CoinSearchInput({ value, onChange }: Props) {
  return (
    <div className="px-4 pb-3">
      <div className="relative group">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder=" "
          className="
            w-full h-10
            bg-white/40 backdrop-blur-sm
            rounded-lg
            px-3 pt-4 pb-2
            text-sm text-gray-800
            outline-none
            transition
            focus:bg-white/70
          "
        />

        <label
          className="
            absolute left-3 top-2 text-xs text-gray-400
            transition-all duration-200
            group-focus-within:text-[var(--brand-purple)]
            group-focus-within:top-1
            group-focus-within:text-[10px]
          "
        >
          search coins
        </label>
      </div>
    </div>
  );
}
