import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  switchTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "light",

      switchTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "theme-storage",
    },
  ),
);

export function useTheme() {
  const theme = useThemeStore((state) => state.theme);
  const switchTheme = useThemeStore((state) => state.switchTheme);

  return {
    theme,
    switchTheme,
  };
}
