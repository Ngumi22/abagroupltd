import type { Metadata } from "next";
import { MoveRight } from "lucide-react";
import { SectionLabel } from "@/components/site/shared";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Aba Group Ltd",
  description:
    "Aba Group Ltd is a Kenyan construction and development company helping people, families, and organizations turn ambitious ideas into enduring places.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="bg-paper px-5 pb-20 pt-28 text-ink sm:pt-32 lg:px-10 lg:pb-28">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>Who we are</SectionLabel>
        <h1 className="max-w-3xl font-serif text-5xl leading-tight sm:text-7xl">
          More than builders.{" "}
          <em className="text-bronze-dark not-italic">
            Partners in possibility.
          </em>
        </h1>
        <div className="mt-14 grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <p className="text-xl leading-8">
            We believe the best spaces begin with a better conversation.
          </p>
          <div className="max-w-2xl space-y-5 text-sm leading-7 text-ink/60">
            <p>
              Aba Group Ltd is a Kenyan construction and development company
              helping people, families, and organizations turn ambitious ideas
              into enduring places. We combine local knowledge, accountable
              delivery, and a sharp eye for detail across every project we take
              on.
            </p>
            <p>
              Founded on the principle that great buildings start with great
              listening, our team works closely with clients from first sketch
              to final handover — making sure the process feels as considered as
              the result.
            </p>
            <Link
              href="/#contact"
              className="mt-2 inline-flex items-center gap-3 border-b border-bronze pb-2 text-[10px] font-semibold uppercase tracking-[.18em] text-ink"
            >
              Meet the team <MoveRight size={15} className="text-bronze-dark" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
