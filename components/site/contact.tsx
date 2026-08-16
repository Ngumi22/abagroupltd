"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Loader2, Phone } from "lucide-react";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { SectionLabel } from "./shared";
import { submitContact, type ContactState } from "@/lib/actions/contact";

const initialState: ContactState = { status: "idle" };

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState,
  );
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (state.status === "success") {
      setSent(true);
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <section
      id="contact"
      className="scroll-mt-(--header-h) bg-bronze pt-6 pb-20 text-ink lg:pt-8 lg:pb-24"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.9fr_1.1fr] lg:px-10">
        <div>
          <SectionLabel>Start a conversation</SectionLabel>
          <h2 className="font-serif text-5xl leading-none sm:text-6xl">
            Let&apos;s build
            <br />
            <em className="text-paper not-italic">something</em>
            <br />
            lasting.
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-6 text-ink/65">
            Tell us a little about your project and our team will be in touch
            within one business day.
          </p>
          <div className="mt-8 flex flex-col gap-3 text-sm">
            <Link
              href={`tel:${SITE.phone.replaceAll(" ", "")}`}
              className="flex items-center gap-3"
            >
              <Phone size={16} /> {SITE.phone}
            </Link>
            <Link href={`mailto:${SITE.email}`}>{SITE.email}</Link>
          </div>
        </div>
        {sent ? (
          <div className="flex min-h-80 flex-col justify-center border border-ink/20 p-8">
            <Check size={30} />
            <h3 className="mt-5 font-serif text-3xl">
              We&apos;ll be in touch.
            </h3>
            <p className="mt-2 text-sm text-ink/65">
              Thank you for trusting Aba Group with the first step.
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-6 w-fit border-b border-ink pb-1 text-[10px] uppercase tracking-widest"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            ref={formRef}
            action={formAction}
            className="grid gap-4 border border-ink/20 p-6 sm:grid-cols-2"
          >
            <label className="text-[10px] uppercase tracking-widest">
              Your name
              <input
                required
                name="name"
                autoComplete="name"
                className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-sm outline-none placeholder:text-ink/40"
                placeholder="Jane Mwangi"
              />
            </label>
            <label className="text-[10px] uppercase tracking-widest">
              Email address
              <input
                type="email"
                required
                name="email"
                autoComplete="email"
                className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-sm outline-none placeholder:text-ink/40"
                placeholder="jane@email.com"
              />
            </label>
            <label className="text-[10px] uppercase tracking-widest sm:col-span-2">
              Tell us about the project
              <textarea
                required
                name="message"
                rows={3}
                className="mt-2 w-full resize-none border-b border-ink/30 bg-transparent py-3 text-sm outline-none placeholder:text-ink/40"
                placeholder="A few details about your project..."
              />
            </label>

            <label className="hidden" aria-hidden="true">
              Company
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>

            {state.status === "error" && (
              <p role="alert" className="text-xs text-red-900 sm:col-span-2">
                {state.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex w-fit items-center gap-3 border border-ink bg-ink px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-paper transition hover:bg-ink-soft disabled:opacity-60 sm:col-span-2"
            >
              {isPending ? (
                <>
                  Sending <Loader2 size={15} className="animate-spin" />
                </>
              ) : (
                <>
                  Send enquiry <ArrowUpRight size={15} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
