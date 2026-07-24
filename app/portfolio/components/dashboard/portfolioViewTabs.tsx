"use client";

type View = "assets" | "analytics";

type Props = {
  activeView: View;
  onChange: (view: View) => void;
};

const tabClass =
  "relative cursor-pointer pb-3 text-xs font-semibold uppercase tracking-[0.16em] transition-colors";

const activeClass = "text-foreground";

const inactiveClass = "text-muted-foreground hover:text-foreground";

const activeIndicator =
  "absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[var(--brand-purple)]";

export default function PortfolioViewTabs({ activeView, onChange }: Props) {
  return (
    <div className="flex items-center gap-8 border-b border-black/5  dark:border-white/10">
      <button
        type="button"
        onClick={() => onChange("assets")}
        className={`${tabClass} ${
          activeView === "assets" ? activeClass : inactiveClass
        }`}
      >
        Assets
        {activeView === "assets" && <span className={activeIndicator} />}
      </button>

      <button
        type="button"
        onClick={() => onChange("analytics")}
        className={`${tabClass} ${
          activeView === "analytics" ? activeClass : inactiveClass
        }`}
      >
        Analytics
        {activeView === "analytics" && <span className={activeIndicator} />}
      </button>
    </div>
  );
}
