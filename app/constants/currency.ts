export const CURRENCY_SYMBOL_MAP = {
  BTC: "₿",
  USD: "$",
  EUR: "€",
  GBP: "£",
  AUD: "A$",
} as const;

export type Currency = keyof typeof CURRENCY_SYMBOL_MAP;
