"use client";

import {
  DotsThreeVerticalIcon,
  PencilSimpleIcon,
  TrashIcon,
} from "@phosphor-icons/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  editLabel?: string;
  deleteLabel?: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function ActionMenu({
  editLabel = "Edit",
  deleteLabel = "Delete",
  onEdit,
  onDelete,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          title="Options"
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition hover:bg-black/5 hover:text-slate-950 active:scale-95 data-[state=open]:bg-black/5 data-[state=open]:text-slate-950 dark:text-white/50 dark:hover:bg-white/10 dark:hover:text-white dark:data-[state=open]:bg-white/10 dark:data-[state=open]:text-white"
        >
          <DotsThreeVerticalIcon
            size={18}
            weight="bold"
            className="pointer-events-none"
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={14}
        alignOffset={4}
        className="w-28 rounded-xl border border-black/10 bg-white/95 p-1 shadow-xl dark:border-white/10 dark:bg-zinc-900/95"
      >
        <DropdownMenuItem
          onClick={onEdit}
          className="cursor-pointer rounded-md px-2 py-1.5 text-xs font-medium transition hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-white/20 dark:focus:bg-white/20"
        >
          <PencilSimpleIcon size={13} />
          <span className="ml-2">{editLabel}</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onDelete}
          className="cursor-pointer rounded-md px-2 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-100 focus:bg-red-100 dark:hover:bg-red-500/20 dark:focus:bg-red-500/20"
        >
          <TrashIcon size={13} />
          <span className="ml-2">{deleteLabel}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
