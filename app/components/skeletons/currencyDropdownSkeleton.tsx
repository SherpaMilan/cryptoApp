export default function CurrencyDropdownSkeleton() {
   return (
      <div className="flex items-center bg-[var(--brand-purple-light)] rounded-[15px] px-3 py-1.5 animate-pulse">
        <div className="w-5 h-5 bg-gray-300 rounded-full" />
        <div className="ml-2 w-8 h-4 bg-gray-300 rounded" />
        <div className="ml-2 w-4 h-4 bg-gray-300 rounded" />
      </div>
    );
}