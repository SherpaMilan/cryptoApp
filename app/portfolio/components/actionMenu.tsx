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
          title="Options"
          className="
            flex h-8 w-8 items-center justify-center
            rounded-lg
            text-slate-500
            transition
            hover:bg-black/5
            hover:text-slate-950
            active:scale-95

            dark:text-white/50
            dark:hover:bg-white/10
            dark:hover:text-white
          "
        >
          <DotsThreeVerticalIcon size={18} weight="bold" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
          <PencilSimpleIcon size={16} />
          {editLabel}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onDelete}
          className="cursor-pointer text-red-500 focus:text-red-500"
        >
          <TrashIcon size={16} />
          {deleteLabel}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
