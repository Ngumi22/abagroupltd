"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { NAV_ITEMS } from "./nav-config";

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
  role?: string | null;
}

export function AdminSidebar({ open, onClose, role }: AdminSidebarProps) {
  const pathname = usePathname();
  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.adminOnly || role === "admin",
  );

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-20 bg-ink/50 transition-opacity duration-300 ease-in-out lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 border-r border-ink/10 bg-ink p-3 text-paper transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="font-serif text-4xl text-bronze">A</span>
            <span className="text-xs tracking-[.28em]">
              ABA GROUP
              <small className="mt-1 block text-[7px] tracking-[.18em] text-bronze">
                ADMIN STUDIO
              </small>
            </span>
          </Link>
          <button
            className="lg:hidden"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="mt-14 grid gap-2 text-sm">
          {visibleItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 transition ${
                  isActive
                    ? "bg-bronze text-ink"
                    : "text-paper/60 hover:text-paper"
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
