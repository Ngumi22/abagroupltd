"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Button, Logo } from "./shared";
import { NAV_LINKS } from "@/lib/constants";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const setVar = () =>
      document.documentElement.style.setProperty(
        "--header-h",
        `${el.offsetHeight}px`,
      );
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow] duration-500 ${
        scrolled
          ? "bg-ink/85 backdrop-blur-md shadow-[0_1px_0_0_rgba(245,241,233,0.08)]"
          : "bg-linear-to-b from-ink/70 via-ink/35 to-transparent backdrop-blur-[2px]"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:py-6 lg:px-10">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(([label, href]) => {
            const active = isActive(href);
            return (
              <Link
                key={label}
                href={href}
                className={`relative text-[10px] uppercase tracking-[0.15em] transition-colors after:absolute after:-bottom-3 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-bronze after:transition-transform after:duration-300 ${
                  active
                    ? "text-paper after:scale-x-100"
                    : "text-paper/75 hover:text-paper"
                }`}
              >
                {label}
              </Link>
            );
          })}
          <Button href="/#contact">Get in touch</Button>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="rounded-full border border-paper/40 p-2 text-paper transition-colors hover:border-bronze hover:text-bronze"
          >
            {open ? <X size={15} /> : <Menu size={15} />}
          </button>
        </nav>
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="border border-paper/40 p-2 text-paper transition-colors duration-700 hover:border-bronze hover:text-bronze md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      <nav
        aria-hidden={!open}
        className={`mx-5 grid overflow-hidden border border-paper/15 bg-ink/95 px-6 transition-[grid-template-rows,opacity,transform,padding] duration-700 ease-in-out ${open ? "grid-rows-[1fr] translate-y-0 py-6 opacity-100" : "pointer-events-none grid-rows-[0fr] -translate-y-3 py-0 opacity-0"}`}
      >
        <div className="min-h-0 flex flex-col gap-5">
          {NAV_LINKS.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              onClick={closeMenu}
              className={`text-xs uppercase tracking-[0.18em] transition-colors hover:text-bronze ${
                isActive(href) ? "text-bronze" : "text-paper"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={closeMenu}
            className="inline-flex items-center rounded-full border border-paper/40 px-4 py-2 text-sm text-paper transition-colors hover:border-bronze hover:text-bronze"
          >
            Get in touch
          </Link>
        </div>
      </nav>
    </header>
  );
}
