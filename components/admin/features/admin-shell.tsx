"use client";

import { useState } from "react";
import { AdminSidebar } from "./admin-sidebar";
import { AdminHeader } from "./admin-header";

interface AdminShellProps {
  children: React.ReactNode;
  userName?: string | null;
  notificationCount?: number;
  role?: string;
}

function getGreeting(name?: string | null) {
  const hour = new Date().getHours();
  const timeOfDay = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";

  return name ? `Good ${timeOfDay}, ${name}.` : `Good ${timeOfDay}.`;
}

export function AdminShell({
  children,
  userName,
  notificationCount = 0,
  role,
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
      <AdminSidebar
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        role={role}
      />
      <div className="lg:pl-64">
        <AdminHeader
          onMenuOpen={() => setMenuOpen(true)}
          greeting={getGreeting(userName)}
          dateLabel={dateLabel}
          notificationCount={notificationCount}
        />
        <main className="mx-auto max-w-7xl p-2 lg:p-5">{children}</main>
      </div>
    </div>
  );
}
