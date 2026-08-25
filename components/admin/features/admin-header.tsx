"use client";

import Link from "next/link";
import { Bell, Menu, Search } from "lucide-react";
import { UserCard } from "./user-card";

interface AdminHeaderProps {
  onMenuOpen: () => void;
  greeting: string;
  dateLabel: string;
  notificationCount: number;
}

export function AdminHeader({
  onMenuOpen,
  greeting,
  dateLabel,
  notificationCount,
}: AdminHeaderProps) {
  const displayCount = notificationCount > 9 ? "9+" : notificationCount;

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
        <button
          aria-label="Search"
          className="hidden text-ink/70 transition-colors hover:text-ink sm:block"
        >
          <Search size={16} className="sm:h-4.5 sm:w-4.5 md:h-5 md:w-5" />
        </button>

        <Link
          href="/admin/messages"
          className="relative text-ink/70 transition-colors hover:text-ink"
          aria-label={
            notificationCount > 0
              ? `${notificationCount} new messages`
              : "Messages"
          }
        >
          <Bell size={16} className="sm:h-4.5 sm:w-4.5 md:h-5 md:w-5" />
          {notificationCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-bronze px-1 text-[8px] font-semibold text-ink sm:-right-2 sm:-top-2 sm:h-4 sm:min-w-4 sm:text-[9px] md:px-1.5 md:text-[10px]">
              {displayCount}
            </span>
          )}
        </Link>

        <div className="shrink-0">
          <UserCard />
        </div>
      </div>
    </header>
  );
}
