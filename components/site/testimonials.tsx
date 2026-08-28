"use client";

import { useState } from "react";
import { ArrowUpRight, Quote, Star } from "lucide-react";
import { SectionLabel } from "./shared";
import { Testimonial } from "@/generated/prisma/client";

export function Testimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [active, setActive] = useState(0);
  const review = testimonials[active];
  if (!review) return null;
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="scroll-mt-20 bg-paper py-20 text-ink sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid gap-6 md:gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-start">
          <div>
            <SectionLabel>Client's word</SectionLabel>
            <p className="text-[10px] uppercase tracking-[.18em] text-ink/45">
              What our clients say about us
            </p>
            <h2
              id="reviews-heading"
              className="max-w-sm font-serif text-4xl leading-tight sm:text-5xl"
            >
              Built on trust.
              <br />
              <span className="text-bronze-dark">Proven by people.</span>
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-ink/60">
              Reviews from clients and partners who trusted Aba Group with their
              next place.
            </p>
            <a
              href="/#contact"
              className="mt-7 inline-flex items-center gap-3 border-b border-bronze-dark pb-2 text-[10px] uppercase tracking-[.18em]"
            >
              Start your project <ArrowUpRight size={14} />
            </a>

            <div className="mt-8 flex items-center justify-end border-t border-ink/10 pt-5">
              <div className="flex gap-2">
                {testimonials.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Show review from ${item.name}`}
                    aria-pressed={active === index}
                    onClick={() => setActive(index)}
                    className={`size-2.5 rounded-full border border-bronze-dark transition-all duration-300 ${active === index ? "bg-bronze-dark" : "bg-transparent"}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="relative min-h-72 border border-ink/15 bg-white/40 p-7 sm:p-10">
            <Quote
              aria-hidden="true"
              className="text-bronze-dark"
              size={34}
              strokeWidth={1.2}
            />
            <blockquote className="mt-7 max-w-2xl font-serif text-2xl leading-tight sm:text-4xl">
              &ldquo;{review.quote}&rdquo;
            </blockquote>
            <div className="mt-8 flex flex-wrap items-end justify-between gap-5 border-t border-ink/10 pt-5">
              <div>
                <p className="font-medium">{review.name}</p>
                <p className="mt-1 text-xs text-ink/55">
                  {review.role} · {review.project}
                </p>
              </div>
              <div className="text-right">
                <div
                  className="flex gap-1 text-bronze-dark"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {Array.from({ length: review.rating }, (_, index) => (
                    <Star key={index} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-2 text-[10px] uppercase tracking-[.16em] text-ink/45">
                  {review.source} review
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
