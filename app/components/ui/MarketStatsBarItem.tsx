"use client";
import React from "react";

interface TopbarItemProps {
  label?: string;
  value: string | number | React.ReactNode;
  logo?: React.ReactNode;
}

export default function TopbarItem({ label, value, logo }: TopbarItemProps) {
  return (
    <div className="flex items-center gap-1.5">
      {logo && <div className="flex items-center justify-center">{logo}</div>}

      {label && (
        <span className="text-[12px] text-foreground/70 mr-1">
          {label.toUpperCase()}
        </span>
      )}

      <span className="font-bold text-sm text-foreground">{value}</span>
    </div>
  );
}
