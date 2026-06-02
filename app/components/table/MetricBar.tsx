type Props = {
  current: number;
  max: number;
  currentLabel?: string;
  maxLabel?: string;
  isPositive: boolean;
};

export default function MetricBar({
  current,
  max,
  currentLabel,
  maxLabel,
  isPositive,
}: Props) {
  const percent = Math.min((current / max) * 100, 100);

  const fillColor = isPositive
    ? "var(--metric-positive)"
    : "var(--metric-negative)";

  const trackColor = "var(--metric-track)";
  const maxLabelColor = "var(--metric-max-label)";

  return (
    <div className="w-full space-y-1">
      {(currentLabel || maxLabel) && (
        <div className="flex justify-between text-[12px] text-[var(--metric-label)]">
          <div className="flex items-center gap-1" style={{ color: fillColor }}>
            <span
              className="w-[6px] h-[6px] rounded-full inline-block"
              style={{ backgroundColor: fillColor }}
            />
            <span>{currentLabel}</span>
          </div>

          <div
            className="flex items-center gap-1"
            style={{ color: maxLabelColor }}
          >
            <span
              className="w-[6px] h-[6px] rounded-full inline-block"
              style={{ backgroundColor: trackColor }}
            />
            <span>{maxLabel}</span>
          </div>
        </div>
      )}

      <div
        className="h-1.5 w-full rounded-full overflow-hidden"
        style={{ backgroundColor: trackColor }}
      >
        <div
          className="h-1.5 rounded-full transition-all duration-300"
          style={{
            width: `${percent}%`,
            backgroundColor: fillColor,
          }}
        />
      </div>
    </div>
  );
}
