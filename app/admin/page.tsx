"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Bell,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  FolderKanban,
  LayoutDashboard,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Users,
  X,
} from "lucide-react";

import { leads, projects } from "@/lib/data";

const projectRows = projects
  .slice(0, 3)
  .map((project, index) => [
    project.name,
    project.type,
    `${[78, 44, 91][index]}%`,
    index === 2 ? "Due soon" : "On track",
  ]);
const leadRows = leads.map((lead) => [
  lead.name,
  lead.project,
  lead.status,
  lead.date,
]);

export default function AdminPage() {
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState("All leads");
  const filters = ["All leads", "New lead", "Proposal sent", "Site visit"];
  return (
    <div className="min-h-screen bg-paper text-ink">
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 border-r border-ink/10 bg-ink p-6 text-paper transition-transform lg:translate-x-0 ${menu ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <span className="font-serif text-4xl text-bronze">A</span>
            <span className="text-xs tracking-[.28em]">
              ABA GROUP
              <small className="mt-1 block text-[7px] tracking-[.18em] text-bronze">
                ADMIN STUDIO
              </small>
            </span>
          </a>
          <button
            className="lg:hidden"
            onClick={() => setMenu(false)}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="mt-14 grid gap-2 text-sm">
          <a
            className="flex items-center gap-3 bg-bronze px-4 py-3 text-ink"
            href="/admin"
          >
            <LayoutDashboard size={16} /> Overview
          </a>
          {[
            ["Leads", Users],
            ["Projects", FolderKanban],
            ["Messages", MessageSquare],
            ["Settings", Settings],
          ].map(([label, Icon]) => (
            <a
              key={label as string}
              className="flex items-center gap-3 px-4 py-3 text-paper/60 hover:text-paper"
              href="#"
            >
              <Icon size={16} />
              {label as string}
            </a>
          ))}
        </nav>
        <div className="absolute inset-x-6 bottom-7 border-t border-paper/10 pt-5 text-xs text-paper/50">
          <p>Prototype workspace</p>
          <p className="mt-1 text-bronze">Local preview only</p>
        </div>
      </aside>
      <div className="lg:pl-64">
        <header className="flex h-20 items-center justify-between border-b border-ink/10 bg-paper px-5 lg:px-10">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden"
              onClick={() => setMenu(true)}
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <div>
              <p className="text-[10px] uppercase tracking-[.2em] text-bronze-dark">
                Monday, 19 May 2025
              </p>
              <h1 className="mt-1 font-serif text-2xl">
                Good morning, Aba team.
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button aria-label="Search" className="hidden sm:block">
              <Search size={18} />
            </button>
            <button aria-label="Notifications" className="relative">
              <Bell size={18} />
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-bronze" />
            </button>
            <div className="hidden h-9 w-9 items-center justify-center bg-ink text-sm text-paper sm:flex">
              AG
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl p-5 lg:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[.2em] text-bronze-dark">
                Overview
              </p>
              <h2 className="mt-2 font-serif text-4xl">
                Your business at a glance.
              </h2>
            </div>
            <button className="flex items-center gap-2 bg-ink px-4 py-3 text-[10px] uppercase tracking-widest text-paper">
              <Plus size={15} /> Add project
            </button>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Open leads", "24", "+12% this month", Users],
              [
                "Pipeline value",
                "KES 48.6M",
                "+8.4% this month",
                CircleDollarSign,
              ],
              ["Active projects", "08", "3 due this month", FolderKanban],
              ["New inquiries", "17", "+5 this week", MessageSquare],
            ].map(([label, value, trend, Icon]) => (
              <div
                key={label as string}
                className="border border-ink/10 bg-white/40 p-5"
              >
                <div className="flex items-center justify-between text-bronze-dark">
                  <span className="text-[10px] uppercase tracking-widest text-ink/55">
                    {label as string}
                  </span>
                  <Icon size={17} />
                </div>
                <p className="mt-6 font-serif text-3xl">{value as string}</p>
                <p className="mt-1 text-xs text-ink/50">{trend as string}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-8 xl:grid-cols-[1.3fr_.7fr]">
            <section className="border border-ink/10 bg-white/40">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 p-5">
                <div>
                  <h3 className="font-serif text-2xl">Lead pipeline</h3>
                  <p className="mt-1 text-xs text-ink/50">
                    Your most recent opportunities
                  </p>
                </div>
                <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
                  Export <ArrowUpRight size={14} />
                </button>
              </div>
              <div className="flex gap-2 overflow-x-auto border-b border-ink/10 px-5 py-3">
                {filters.map((item) => (
                  <button
                    onClick={() => setFilter(item)}
                    key={item}
                    className={`whitespace-nowrap px-3 py-2 text-[10px] uppercase tracking-widest ${filter === item ? "bg-bronze" : "text-ink/50 hover:text-ink"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-150 text-left text-sm">
                  <thead className="text-[10px] uppercase tracking-widest text-ink/40">
                    <tr>
                      <th className="px-5 py-4 font-normal">Lead</th>
                      <th className="px-5 py-4 font-normal">Project type</th>
                      <th className="px-5 py-4 font-normal">Status</th>
                      <th className="px-5 py-4 font-normal">Received</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {leadRows
                      .filter((l) => filter === "All leads" || l[2] === filter)
                      .map((lead) => (
                        <tr key={lead[0]} className="border-t border-ink/10">
                          <td className="px-5 py-4 font-medium">{lead[0]}</td>
                          <td className="px-5 py-4 text-ink/60">{lead[1]}</td>
                          <td className="px-5 py-4">
                            <span className="inline-flex items-center gap-2 text-xs">
                              <span className="h-1.5 w-1.5 rounded-full bg-bronze" />
                              {lead[2]}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-xs text-ink/50">
                            {lead[3]}
                          </td>
                          <td className="px-5">
                            <MoreHorizontal size={17} />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </section>
            <section className="border border-ink/10 bg-ink p-5 text-paper">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl">Project pulse</h3>
                  <p className="mt-1 text-xs text-paper/50">
                    Live delivery overview
                  </p>
                </div>
                <button aria-label="Project settings">
                  <Settings size={16} />
                </button>
              </div>
              <div className="mt-7 grid gap-6">
                {projectRows.map(([name, type, progress, status]) => (
                  <div key={name}>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm">{name}</p>
                        <p className="mt-1 text-[10px] uppercase tracking-widest text-paper/45">
                          {type}
                        </p>
                      </div>
                      <span className="text-xs text-bronze">{progress}</span>
                    </div>
                    <div className="mt-3 h-1 bg-paper/15">
                      <div
                        className="h-1 bg-bronze"
                        style={{ width: progress }}
                      />
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-[10px] text-paper/50">
                      <CheckCircle2 size={13} className="text-bronze" />
                      {status}
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="#"
                className="mt-8 inline-flex items-center gap-2 border-b border-bronze pb-1 text-[10px] uppercase tracking-widest"
              >
                View all projects{" "}
                <ChevronDown size={14} className="-rotate-90" />
              </a>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
