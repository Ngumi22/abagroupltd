"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

export function DeleteIconButton({
  onDelete,
  confirmMessage,
}: {
  onDelete: () => Promise<void>;
  confirmMessage: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      aria-label="Delete"
      onClick={() => {
        if (!window.confirm(confirmMessage)) return;
        startTransition(onDelete);
      }}
      className="text-ink/40 transition hover:text-red-700 disabled:opacity-40 shrink-0 ml-2"
    >
      <Trash2 size={15} />
    </button>
  );
}
