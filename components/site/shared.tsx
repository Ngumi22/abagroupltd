import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${SITE.name} home`}
      className="group inline-flex shrink-0 items-center"
    >
      <Image
        src="/images/logo.png"
        alt={`${SITE.name} logo`}
        width={180}
        height={180}
        priority
        className={`
          h-10 w-10
          sm:h-11 sm:w-11
          md:h-12 md:w-12
          lg:h-14 lg:w-14
          object-contain
          transition-opacity duration-200
          group-hover:opacity-90
        `}
      />
    </Link>
  );
}

export function Button({
  children,
  href = "#contact",
  light = false,
}: {
  children: ReactNode;
  href?: string;
  light?: boolean;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-5 border px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] transition duration-300 hover:-translate-y-0.5 ${light ? "border-ink/25 text-ink hover:bg-ink hover:text-paper" : "border-bronze bg-bronze text-ink hover:bg-bronze-light"}`}
    >
      {children}
      <ArrowUpRight size={15} strokeWidth={1.4} />
    </a>
  );
}

export function SectionLabel({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      className={`mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] ${dark ? "text-bronze" : "text-bronze-dark"}`}
    >
      {children}
    </p>
  );
}
