export const formatCurrencyCompact = (num: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(num);
};