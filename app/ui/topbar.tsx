export default function Topbar() {
  return (
    <div className="max-w-[1440px] mx-auto flex justify-center items-center h-[56px] px-[72px] box-border gap-8">
      <span className="text-sm text-[var(--brand-white)]">Coins 7884</span>
      <span className="text-sm  text-[var(--brand-white)]">Exchange 622</span>
      <span className="text-sm text-[var(--brand-white)]">1.69T</span>
      <span className="text-sm text-[var(--brand-white)]">$124.45B</span>
      <span className="text-sm text-[var(--brand-white)]">BTC 44%</span>
      <span className="text-sm text-[var(--brand-white)]">ETH 21%</span>
    </div>
  );
}
