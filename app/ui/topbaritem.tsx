"use client";

import Image from "next/image";
import React from "react";

interface TopbarItemProps {
  label?: string;
  value: string | number | React.ReactNode;
  logo?: string;
}

export default function TopbarItem({ label, value, logo }: TopbarItemProps) {
  return (
    <div className="flex items-center gap-1.5">
      {logo && <Image src={logo} width={20} height={20} alt={label || "Logo"} />}
      {label && (
        <span className="text-sm text-[var(--brand-white)]">{label}</span>
      )}
      <span className="font-bold text-sm text-[var(--brand-white)]">{value}</span>
    </div>
  );
}