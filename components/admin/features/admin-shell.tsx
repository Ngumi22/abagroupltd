"use client";

import { useState } from "react";
import { AdminSidebar } from "./admin-sidebar";
import { AdminHeader } from "./admin-header";

interface AdminShellProps {
  children: React.ReactNode;
  greeting?: string;
  notificationCount?: number;
}

export function AdminShell({
  children,
  greeting = "Good morning, Aba team.",
  notificationCount = 0,
}: AdminShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const dateLabel = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-paper text-ink">
      <AdminSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="lg:pl-64">
        <AdminHeader
          onMenuOpen={() => setMenuOpen(true)}
          greeting={greeting}
          dateLabel={dateLabel}
          notificationCount={notificationCount}
        />
        <main className="mx-auto max-w-7xl p-5 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
