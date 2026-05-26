import { ChartTooltip, ChartTooltipContent } from "../ui/Chart";

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
