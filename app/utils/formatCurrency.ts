export const formatCurrencyCompact = (num: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(num);
};

/**
 * Formats a number into a compact, human-readable currency string.
 *
 * Examples:
 * 1000       → "$1K"
 * 1500000    → "$1.5M"
 * 807243000000 → "$807.24B"
 *
 */
