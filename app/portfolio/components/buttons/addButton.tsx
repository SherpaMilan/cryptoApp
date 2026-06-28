"use client";

import { PlusIcon } from "@phosphor-icons/react";

type Props = {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
};

export default function AddButton({
  onClick,
  children = "Add",
  className = "",
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex
        h-10
        w-[130px]
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-foreground
        px-4
        text-sm
        font-semibold
        text-background
        shadow-[0_10px_30px_rgba(15,23,42,0.18)]
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:opacity-90
        active:translate-y-0
        cursor-pointer
        ${className}
      `}
    >
      <PlusIcon size={16} weight="bold" />
      {children}
    </button>
  );
}
