import { STATS_BAR_ICON_PROPS } from "@/constants/statsbarIcons";
import { useTheme } from "@/store/useThemeStore";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";

export default function Theme() {
  const { theme, switchTheme } = useTheme();

  return (
    <button
      aria-label="Toggle dark mode"
      className="rounded-[15px] bg-background text-foreground p-2 w-[48px] h-[48px] flex justify-center items-center cursor-pointer "
      onClick={switchTheme}
    >
      {theme === "light" ? (
        <MoonIcon {...STATS_BAR_ICON_PROPS} size={40} />
      ) : (
        <SunIcon {...STATS_BAR_ICON_PROPS} size={40} />
      )}
    </button>
  );
}
