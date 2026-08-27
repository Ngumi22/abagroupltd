"use client";

import { Menu } from "lucide-react";
import { UserCard } from "./user-card";
import { GlobalSearch } from "@/components/admin/search/global-search";
import { NotificationsDropdown } from "@/components/admin/notifications/notifications-dropdown";
import type { NotificationItem } from "@/lib/data/notifications";

interface AdminHeaderProps {
  onMenuOpen: () => void;
  greeting: string;
  dateLabel: string;
  notifications: NotificationItem[];
}

export function AdminHeader({
  onMenuOpen,
  greeting,
  dateLabel,
  notifications,
}: AdminHeaderProps) {
  return (
    <header className="flex h-15 items-center justify-between border-b border-ink/10 bg-paper px-3 sm:px-5 md:h-18 lg:px-8 xl:px-10">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 md:gap-4">
        <button
          className="shrink-0 lg:hidden"
          onClick={onMenuOpen}
          aria-label="Open sidebar"
        >
          <Menu size={18} className="sm:h-5 sm:w-5" />
        </button>

        <div className="flex flex-1 flex-col items-center sm:items-start sm:flex-none">
          <p className="text-[8px] uppercase tracking-[0.15em] text-bronze-dark xs:text-[9px] sm:text-[10px] sm:tracking-[0.2em] md:text-[11px] lg:text-xs">
            {dateLabel}
          </p>
          <h1 className="mt-0.5 truncate text-center text-sm font-serif sm:text-left sm:text-base md:mt-1 md:text-xl lg:text-2xl">
            {greeting}
          </h1>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3 md:gap-4">
        <GlobalSearch />
        <NotificationsDropdown notifications={notifications} />
        <div className="shrink-0">
          <UserCard />
        </div>
      </div>
    </header>
  );
}
