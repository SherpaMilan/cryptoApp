type Theme = {
  text: string;
  fill: string;
  track: string;
};

type Props = {
  current: number;
  max: number;
  currentLabel?: string;
  maxLabel?: string;
  theme: Theme;
};

export default function MetricBar({
  current,
  max,
  currentLabel,
  maxLabel,
  theme,
}: Props) {
  const percent = Math.min((current / max) * 100, 100);

  return (
    <div className="w-full space-y-1">
      {(currentLabel || maxLabel) && (
        <div className={`flex justify-between text-xs ${theme.text}`}>
          <span>{currentLabel}</span>
          <span>{maxLabel}</span>
        </div>
      )}

      <div
        className={`w-full h-1.5 rounded-full overflow-hidden ${theme.track}`}
      >
        <div
          className={`h-1.5 rounded-full transition-all duration-300 ${theme.fill}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
