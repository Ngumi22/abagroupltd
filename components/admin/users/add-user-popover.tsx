"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CreateUserForm } from "./create-user-form";

export function AddUserPopover() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex w-fit items-center gap-2 bg-ink px-4 py-2 text-[10px] uppercase tracking-widest text-paper transition hover:bg-ink/90">
        <UserPlus size={14} />
        Add user
      </PopoverTrigger>
      <PopoverContent align="start" className=" border-ink/10 p-0 w-full">
        <CreateUserForm onSuccess={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}
