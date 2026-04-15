export default function getColorbar(value: number) {
  if (value > 50) return "var(--brand-green)";
  if (value > 20) return "#F7931A"; 
  return "#849DFF"; 
}
