"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CreateLeadForm } from "./create-lead-form";

export function AddLeadPopover() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex w-fit items-center gap-2 bg-ink px-4 py-2 text-[10px] uppercase tracking-widest text-paper transition hover:bg-ink/90">
        <Plus size={14} />
        Add lead
      </PopoverTrigger>
      <PopoverContent align="start" className="w-96 border-ink/10 p-0">
        <CreateLeadForm onSuccess={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}
