export const TIME_RANGES = {
  "1D": 1,
  "7D": 7,
  "14D": 14,
  "1M": 30,
  "6M": 30 * 6,
  "1Y": 365,
} as const;

// Give me the list of all keys from this object
export type TimeRangeKey = keyof typeof TIME_RANGES;
