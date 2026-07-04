type Props = {
  label: string;
  value: string | number;
  subValue?: string;
  subValueClassName?: string;
};

export default function MetricRow({
  label,
  value,
  subValue,
  subValueClassName = "",
}: Props) {
  return (
    <div className=" border-b border-black/10 py-3 dark:border-white/10">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>

        <p className="text-sm font-bold">{value}</p>
      </div>

      {subValue && (
        <p
          className={`mt-2 text-right text-xs font-semibold ${subValueClassName}`}
        >
          {subValue}
        </p>
      )}
    </div>
  );
}
