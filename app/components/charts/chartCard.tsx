"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import ChartSkeleton from "../skeletons/chartSkeleton";

type ChartCardProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  lastUpdated?: string | null;
  config: ChartConfig;
  isLoading?: boolean;
  error?: unknown;
  children: React.ReactNode;
};

export function ChartCard({
  title,
  description,
  lastUpdated,
  config,
  isLoading,
  error,

  children,
}: ChartCardProps) {
  if (isLoading) return <ChartSkeleton />;
  if (error) return <div className="text-red-500">Error loading chart</div>;

  return (
    <Card className="pt-0 rounded-xl overflow-hidden border border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-md bg-white/0">
      <CardHeader className="flex items-center gap-2 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 px-2">
          <CardTitle>{title}</CardTitle>

          {description && <CardDescription>{description}</CardDescription>}

          <span className="text-[var(--brand-purple-text)]">
            Last updated:{" "}
            {lastUpdated ? (
              <time dateTime={lastUpdated}>
                {new Date(lastUpdated).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            ) : (
              "N/A"
            )}
          </span>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-2 sm:px-6 sm:pt-2">
        <ChartContainer config={config} className="h-[190px] w-full">
          {children}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
