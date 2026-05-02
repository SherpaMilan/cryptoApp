import { ChartTooltip, ChartTooltipContent } from "../ui/chart";

export function ChartDefaultToolTip() {
  return (
    <ChartTooltip
      content={
        <ChartTooltipContent
          className="w-[110px]"
          labelFormatter={(value) =>
            new Date(value).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          }
        />
      }
    />
  );
}
