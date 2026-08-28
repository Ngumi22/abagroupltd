import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaTiktok,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa6";
import type { IconType } from "react-icons";
import { Logo } from "./shared";
import { footerLinks, SITE } from "@/lib/constants";
import {
  getContactEmails,
  getContactPhones,
  getBranches,
  getSocialLinks,
} from "@/lib/data/contact-info";
import type { SocialPlatform } from "@/generated/prisma/client";

const SOCIAL_ICON: Record<SocialPlatform, IconType> = {
  FACEBOOK: FaFacebook,
  INSTAGRAM: FaInstagram,
  X: FaXTwitter,
  LINKEDIN: FaLinkedin,
  TIKTOK: FaTiktok,
  YOUTUBE: FaYoutube,
  WHATSAPP: FaWhatsapp,
};

const SOCIAL_LABEL: Record<SocialPlatform, string> = {
  FACEBOOK: "Facebook",
  INSTAGRAM: "Instagram",
  X: "X (Twitter)",
  LINKEDIN: "LinkedIn",
  TIKTOK: "TikTok",
  YOUTUBE: "YouTube",
  WHATSAPP: "WhatsApp",
};

export async function Footer() {
  const [emails, phones, branches, socialLinks] = await Promise.all([
    getContactEmails(),
    getContactPhones(),
    getBranches(),
    getSocialLinks(),
  ]);

  const currentYear = new Date().getFullYear();
  const primaryPhone = phones[0];
  const primaryEmail = emails[0];
  const primaryBranch = branches.find((b) => b.isPrimary) ?? branches[0];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: SITE.name,
    url: SITE.siteUrl,
    telephone: primaryPhone?.number,
    email: primaryEmail?.email,
    address: primaryBranch
      ? {
          "@type": "PostalAddress",
          streetAddress: primaryBranch.addressLine1,
          addressLocality: primaryBranch.city,
          addressCountry: "KE",
        }
      : undefined,
    areaServed: "Kenya",
    sameAs: socialLinks.map((s) => s.url),
  };

  return (
    <footer className="overflow-hidden bg-ink text-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="mx-auto max-w-7xl px-5 pb-7 pt-10 sm:pt-14 lg:px-10">
        <div className="grid gap-12 border-b border-paper/15 pb-10 lg:grid-cols-[1.3fr_.8fr_.8fr_1fr] lg:gap-10">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-7 text-paper/60">
              Thoughtful spaces, carefully built. Aba Group delivers design and
              construction with clarity across Kenya.
            </p>
            <Link
              href="/#contact"
              className="mt-5 inline-flex items-center gap-3 border border-bronze bg-bronze px-5 py-3 text-[10px] font-medium uppercase tracking-[.16em] text-ink transition-colors hover:bg-paper"
            >
              Start a conversation <ArrowUpRight size={14} />
            </Link>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h2 className="text-[10px] uppercase tracking-[.22em] text-bronze">
                {title}
              </h2>
              <nav className="mt-5 flex flex-col items-start gap-3">
                {links.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    className="text-sm text-paper/65 transition-colors hover:text-paper"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}

          <div>
            <h2 className="text-[10px] uppercase tracking-[.22em] text-bronze">
              Contact
            </h2>
            <p className="mt-5 text-sm text-paper/65">
              Get in touch with us for more information or to schedule a
              consultation.
            </p>
            <div className="mt-5 flex flex-col gap-4 text-sm text-paper/65">
              {phones.map((phone) => (
                <Link
                  key={phone.id}
                  href={`tel:${phone.number.replaceAll(" ", "")}`}
                  className="flex items-start gap-3 transition-colors hover:text-paper"
                >
                  <Phone size={15} className="mt-0.5 shrink-0 text-bronze" />
                  {phone.number}
                </Link>
              ))}
              {emails.map((email) => (
                <Link
                  key={email.id}
                  href={`mailto:${email.email}`}
                  className="flex items-start gap-3 transition-colors hover:text-paper"
                >
                  <Mail size={15} className="mt-0.5 shrink-0 text-bronze" />
                  {email.email}
                </Link>
              ))}
              {primaryBranch && (
                <span className="flex items-start gap-3">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-bronze" />
                  {primaryBranch.addressLine1}
                  {primaryBranch.addressLine2
                    ? `, ${primaryBranch.addressLine2}`
                    : ""}
                  , {primaryBranch.city}
                </span>
              )}
            </div>

            {socialLinks.length > 0 && (
              <div className="mt-5 flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = SOCIAL_ICON[social.platform];
                  return (
                    <Link
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Aba Group on ${SOCIAL_LABEL[social.platform]}`}
                      className="grid size-8 place-items-center rounded-full border border-paper/20 text-paper/60 transition-colors hover:border-bronze hover:text-bronze"
                    >
                      <Icon size={14} />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-4 text-[10px] uppercase tracking-[.12em] text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] uppercase tracking-widest">
            © {currentYear} {SITE.name}. Built for better places.
          </p>
          <div className="flex gap-5">
            <Link
              href="/privacy"
              className="transition-colors hover:text-paper"
            >
              Privacy policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-paper">
              Terms of service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
