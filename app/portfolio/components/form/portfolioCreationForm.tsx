"use client";

import { useState } from "react";
import { XIcon } from "@phosphor-icons/react";

import { portfolioIcons } from "../../constants/portfolioIcons";
import PortfolioIconPicker from "./portfolioIconPicker";
import {
  Portfolio,
  usePortfolioStore,
} from "@/portfolio/store/usePortfolioStore";

type Props = {
  mode: "create" | "edit";
  portfolio: Portfolio | null;
  onClose: () => void;
};

export default function PortfolioCreationForm({
  mode,
  portfolio,
  onClose,
}: Props) {
  const createPortfolio = usePortfolioStore((state) => state.createPortfolio);

  const [portfolioName, setPortfolioName] = useState(
    mode === "edit" && portfolio ? portfolio.name : "",
  );

  const [avatar, setAvatar] = useState(
    mode === "edit" && portfolio ? portfolio.icon : portfolioIcons[0],
  );

  const [outsideClick, setOutsideClick] = useState(false);

  const PORTFOLIO_NAME_REGEX = /^[a-zA-Z0-9 _-]*$/;
  const MAX_CHARACTERS = 24;

  const canSavePortfolio =
    portfolioName.trim().length > 0 &&
    PORTFOLIO_NAME_REGEX.test(portfolioName.trim());

  function savePortfolio() {
    if (!canSavePortfolio) return;

    createPortfolio({
      id: mode === "edit" && portfolio ? portfolio.id : crypto.randomUUID(),
      name: portfolioName.trim(),
      icon: avatar,
    });

    onClose();
  }

  const title = mode === "edit" ? "Edit Portfolio" : "New Portfolio";
  const buttonLabel = mode === "edit" ? "Save Changes" : "Create Portfolio";

  return (
    <div
      onClick={() => setOutsideClick(true)}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setOutsideClick(false);
        }}
        className={`w-[484px] rounded-2xl bg-background/95 p-6 backdrop-blur-xl transition-all ${
          outsideClick
            ? "shadow-form-warning"
            : "border border-transparent shadow-form dark:border-white/20"
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>

          <button
            onClick={onClose}
            className="cursor-pointer rounded-lg p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <XIcon size={22} />
          </button>
        </div>

        <div className="mt-7">
          <p className="text-sm font-medium text-muted-foreground">
            Portfolio avatar
          </p>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex size-[72px] items-center justify-center rounded-full bg-[var(--brand-purple)] text-4xl shadow-sm">
              {avatar}
            </div>

            <PortfolioIconPicker avatar={avatar} onAvatarChange={setAvatar} />
          </div>
        </div>

        <div className="mt-8">
          <label className="text-sm font-medium text-muted-foreground">
            Portfolio name
          </label>

          <input
            value={portfolioName}
            maxLength={MAX_CHARACTERS}
            onChange={(e) => {
              const value = e.target.value;
              if (PORTFOLIO_NAME_REGEX.test(value)) {
                setPortfolioName(value);
              }
            }}
            placeholder="Enter portfolio name"
            className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-blue-500"
          />

          <p className="mt-2 text-xs text-muted-foreground">
            {portfolioName.length}/{MAX_CHARACTERS} characters
          </p>
        </div>

        <div className="mt-7 flex justify-center">
          <button
            disabled={!canSavePortfolio}
            onClick={savePortfolio}
            className="w-full cursor-pointer rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:-translate-y-[1px] hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-30"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
