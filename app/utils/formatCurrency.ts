export const formatCurrencyCompact = (
  num: number,
  currency: string,
  symbol?: string,
) => {
  const formattedNumber = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(num);

  return symbol ? `${symbol} ${formattedNumber}` : formattedNumber;
};

/**
 * Formats a number into a compact, human-readable value
 * with an optional currency symbol.
 *
 * Used for crypto + fiat display (CoinGecko data).
 *
 * Examples:
 * 1000         → "$1K"
 * 1500000      → "€1.5M"
 * 807243000000 → "₿807.24B"
 * 1200         → "1.2K" (if no symbol provided)
 */
