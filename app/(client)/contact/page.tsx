import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { SITE } from "@/lib/constants";
import {
  getBranches,
  getContactPhones,
  getContactEmails,
} from "@/lib/data/contact-info";
import { ContactDetailCard } from "@/components/site/contact-detail-card";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach ${SITE.shortName} — office locations, phone, and email.`,
};

export default async function ContactPage() {
  const [branches, phones, emails] = await Promise.all([
    getBranches(),
    getContactPhones(),
    getContactEmails(),
  ]);

  return (
    <main className="bg-paper px-5 pb-20 pt-28 text-ink sm:pt-32 lg:px-10 lg:pb-28">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[.16em] text-bronze-dark">
          Get in touch
        </p>
        <h1 className="mt-3 font-serif text-5xl leading-none sm:text-6xl">
          Visit or reach us directly.
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-6 text-ink/65">
          Prefer to talk before sending details through the enquiry form?
          Here&apos;s every way to reach the {SITE.shortName} team.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {branches.map((branch) => (
            <ContactDetailCard
              key={branch.id}
              icon={MapPin}
              label={branch.name}
            >
              <p>{branch.addressLine1}</p>
              {branch.addressLine2 && <p>{branch.addressLine2}</p>}
              <p>{branch.city}</p>
            </ContactDetailCard>
          ))}

          {phones.map((phone) => (
            <ContactDetailCard key={phone.id} icon={Phone} label={phone.label}>
              <Link
                href={`tel:${phone.number.replaceAll(" ", "")}`}
                className="hover:text-ink"
              >
                {phone.number}
              </Link>
            </ContactDetailCard>
          ))}

          {emails.map((email) => (
            <ContactDetailCard key={email.id} icon={Mail} label={email.label}>
              <Link href={`mailto:${email.email}`} className="hover:text-ink">
                {email.email}
              </Link>
            </ContactDetailCard>
          ))}
        </div>

        {branches.length === 0 &&
          phones.length === 0 &&
          emails.length === 0 && (
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              <ContactDetailCard icon={MapPin} label="Office">
                <p>{SITE.address}</p>
              </ContactDetailCard>
              <ContactDetailCard icon={Phone} label="Phone">
                <Link
                  href={`tel:${SITE.phone.replaceAll(" ", "")}`}
                  className="hover:text-ink"
                >
                  {SITE.phone}
                </Link>
              </ContactDetailCard>
              <ContactDetailCard icon={Mail} label="Email">
                <Link href={`mailto:${SITE.email}`} className="hover:text-ink">
                  {SITE.email}
                </Link>
              </ContactDetailCard>
            </div>
          )}

        <div className="mt-8">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 border-b border-ink pb-1 text-[10px] uppercase tracking-widest"
          >
            Prefer to send a message instead? Use the enquiry form →
          </Link>
        </div>
      </div>
    </main>
  );
}
