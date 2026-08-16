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
    <header className="flex h-20 items-center justify-between border-b border-ink/10 bg-paper px-5 lg:px-10">
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden"
          onClick={onMenuOpen}
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>
        <div>
          <p className="text-[10px] uppercase tracking-[.2em] text-bronze-dark">
            {dateLabel}
          </p>
          <h1 className="mt-1 font-serif text-2xl">{greeting}</h1>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        <button aria-label="Search" className="hidden sm:block">
          <Search size={18} />
        </button>
        <Link
          href="/admin/messages"
          className="relative"
          aria-label={
            notificationCount > 0
              ? `${notificationCount} new messages`
              : "Messages"
          }
        >
          <Bell size={18} />
          {notificationCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-bronze px-1 text-[9px] font-semibold text-ink">
              {displayCount}
            </span>
          )}
        </Link>
        <UserCard />
      </div>
    </header>
  );
}
