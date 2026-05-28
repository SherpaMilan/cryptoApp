export default function ChartSkeleton() {
  return (
    <div className="h-[330px] mb-4 border rounded-xl p-4 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-7 h-7 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}
