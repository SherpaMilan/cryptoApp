export const TIME_RANGES = {
  "24H": 1,
  "7D": 7,
  "1M": 30,
  "3M": 90,
  "1Y": 365,
} as const;

// Give me the list of all keys from this object
export type TimeRangeKey = keyof typeof TIME_RANGES;
