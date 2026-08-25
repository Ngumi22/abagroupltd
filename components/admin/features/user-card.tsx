"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, ShieldCheck, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const initials =
    parts.length === 1
      ? parts[0].slice(0, 2)
      : parts[0][0] + parts[parts.length - 1][0];
  return initials.toUpperCase();
}

export function UserCard() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSignOut() {
    setIsSigningOut(true);
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  }

  if (isPending) {
    return (
      <div className="h-9 w-9 animate-pulse rounded-full bg-ink/10 sm:h-10 sm:w-10" />
    );
  }

  if (!session) {
    return null;
  }

  const { user } = session;
  const initials = getInitials(user.name || user.email);
  const role = (user as { role?: string }).role;

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Account menu"
        className="flex items-center gap-1.5 rounded-md py-1 pl-1 pr-1 transition hover:bg-ink/5 sm:gap-2 sm:pr-2 md:pr-3"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-xs text-paper sm:h-9 sm:w-9 sm:text-sm">
          {initials}
        </div>

        <div className="hidden text-left sm:block">
          <p className="max-w-24 truncate text-xs font-medium leading-tight md:max-w-32 md:text-sm">
            {user.name}
          </p>
          {role && (
            <p className="text-[8px] uppercase tracking-widest text-ink/45 sm:text-[9px] md:text-[10px]">
              {role}
            </p>
          )}
        </div>

        <ChevronDown
          size={13}
          className={`hidden text-ink/40 transition-transform sm:block sm:h-3.5 sm:w-3.5 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-40 mt-1.5 w-64 max-w-[calc(100vw-1.5rem)] border border-ink/10 bg-paper shadow-lg sm:mt-2 sm:max-w-[calc(100vw-2rem)]">
          {/* User info section */}
          <div className="flex items-center gap-3 border-b border-ink/10 p-3 sm:p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-sm text-paper">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="truncate text-xs text-ink/50">{user.email}</p>
            </div>
          </div>

          {/* Role section */}
          {role && (
            <div className="flex items-center gap-2 border-b border-ink/10 px-3 py-2.5 text-[10px] text-ink/60 sm:px-4 sm:py-3 sm:text-xs">
              <ShieldCheck
                size={13}
                className="shrink-0 text-bronze-dark sm:h-3.5 sm:w-3.5"
              />
              <span className="truncate">
                Signed in as{" "}
                <span className="font-medium text-ink">{role}</span>
              </span>
            </div>
          )}

          {/* Sign out button */}
          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-xs text-red-700 transition hover:bg-red-50 disabled:opacity-60 sm:px-4 sm:py-3 sm:text-sm"
          >
            <LogOut size={14} className="sm:h-3.75 sm:w-3.75" />
            {isSigningOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      )}
    </div>
  );
}
