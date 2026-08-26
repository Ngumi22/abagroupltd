"use client";

import { useState, useTransition } from "react";
import { MoreHorizontal, Trophy, XCircle, Trash2 } from "lucide-react";
import type { Lead } from "@/lib/types";
import { updateLeadStatus, deleteLead } from "@/lib/actions/leads";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LeadRowActions({ lead }: { lead: Lead }) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  function handleStatusChange(status: "WON" | "LOST") {
    const leadId = lead.id;
    if (!leadId) return;
    startTransition(async () => {
      await updateLeadStatus(leadId, status);
      setOpen(false);
    });
  }

  function handleDelete() {
    if (!window.confirm(`Delete "${lead.name}"?`)) return;
    const leadId = lead.id;
    if (!leadId) return;
    startTransition(async () => {
      await deleteLead(leadId);
      setOpen(false);
    });
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        disabled={isPending}
        aria-label="Lead actions"
        className="shrink-0 text-ink/50 transition hover:text-ink disabled:opacity-40"
      >
        <MoreHorizontal size={17} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {lead.status !== "Won" && (
          <DropdownMenuItem
            onClick={() => handleStatusChange("WON")}
            disabled={isPending}
          >
            <Trophy size={14} /> Mark as won
          </DropdownMenuItem>
        )}
        {lead.status !== "Lost" && (
          <DropdownMenuItem
            onClick={() => handleStatusChange("LOST")}
            disabled={isPending}
          >
            <XCircle size={14} /> Mark as lost
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleDelete}
          disabled={isPending}
          className="text-red-700 focus:text-red-700"
        >
          <Trash2 size={14} /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
