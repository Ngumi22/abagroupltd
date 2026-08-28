import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data/services";
import { SectionLabel } from "@/components/site/shared";

export const metadata: Metadata = {
  title: "Services | Aba Group Ltd",
  description:
    "End-to-end construction and development expertise from Aba Group Ltd — one accountable team from the first idea to the final detail.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main className="bg-ink px-5 pb-20 pt-28 text-paper sm:pt-32 lg:px-10 lg:pb-28">
      <div className="mx-auto max-w-7xl">
        <SectionLabel dark>What we do</SectionLabel>
        <h1 className="max-w-3xl font-serif text-5xl leading-tight sm:text-7xl">
          End-to-end <em className="text-bronze not-italic">expertise.</em>
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-7 text-paper/55">
          One accountable team from the first idea to the final detail.
        </p>
        <div className="mt-14 grid gap-px border border-paper/15 bg-paper/15 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group bg-ink p-6 transition duration-300 hover:bg-ink-soft"
            >
              <span className="font-mono text-xs text-bronze">
                {service.number}
              </span>
              <h3 className="mt-8 font-serif text-2xl">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-paper/55">
                {service.description}
              </p>
              <ArrowUpRight
                size={18}
                className="mt-8 text-bronze transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
