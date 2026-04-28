export const TIME_RANGES = {
  "1d": 1,
  "7d": 7,
  "14d": 14,
  "1m": 30,
  "6m": 30 * 6,
  "1y": 365,
} as const;

// Give me the list of all keys from this object
export type TimeRangeKey = keyof typeof TIME_RANGES;
