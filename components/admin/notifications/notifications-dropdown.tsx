"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "@/components/admin/dashboard/status-badge";
import {
  markInquiryRead,
  type NotificationItem,
} from "@/lib/data/notifications";

function timeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function NotificationsDropdown({
  notifications,
}: {
  notifications: NotificationItem[];
}) {
  const [, startTransition] = useTransition();
  const router = useRouter();
  const count = notifications.length;
  const displayCount = count > 9 ? "9+" : count;

  function handleSelect(item: NotificationItem) {
    if (item.type === "inquiry") {
      startTransition(() => {
        markInquiryRead(item.id);
      });
    }
    router.push(item.href);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={count > 0 ? `${count} new notifications` : "Notifications"}
        className="relative text-ink/70 transition-colors hover:text-ink"
      >
        <Bell size={16} className="sm:h-4.5 sm:w-4.5 md:h-5 md:w-5" />
        {count > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-bronze px-1 text-[8px] font-semibold text-ink sm:-right-2 sm:-top-2 sm:h-4 sm:min-w-4 sm:text-[9px] md:px-1.5 md:text-[10px]">
            {displayCount}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 max-w-[85vw]">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {notifications.length === 0 ? (
            <p className="px-2 py-6 text-center text-xs text-ink/50">
              You&rsquo;re all caught up.
            </p>
          ) : (
            notifications.map((item) => (
              <DropdownMenuItem
                key={`${item.type}-${item.id}`}
                onClick={() => handleSelect(item)}
                className="flex-col items-start gap-1 py-2"
              >
                <div className="flex w-full min-w-0 items-center justify-between gap-2">
                  <span className="min-w-0 truncate text-sm font-medium">
                    {item.title}
                  </span>
                  <StatusBadge
                    label={
                      item.type === "inquiry"
                        ? "New"
                        : item.status === "NEW_LEAD"
                          ? "New lead"
                          : item.status
                    }
                  />
                </div>
                <div className="flex w-full min-w-0 items-center justify-between gap-2">
                  <span className="min-w-0 truncate text-xs text-ink/50">
                    {item.subtitle}
                  </span>
                  <span className="shrink-0 text-[10px] text-ink/40">
                    {timeAgo(item.createdAt)}
                  </span>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push("/admin/messages")}
          className="justify-center text-xs text-bronze-dark"
        >
          View all messages
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
