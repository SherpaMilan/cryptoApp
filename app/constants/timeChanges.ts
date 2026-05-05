export const OPTIONS = ["1h", "24h", "7d"] as const;
export type TimeFrame = (typeof OPTIONS)[number];

//   Final result:
//   TimeFrame = "1h" | "24h" | "7d"
