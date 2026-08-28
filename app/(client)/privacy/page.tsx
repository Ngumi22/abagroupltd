import type { Metadata } from "next";
import { SectionLabel } from "@/components/site/shared";
import { LAST_UPDATED, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | Aba Group Ltd",
  description:
    "How Aba Group Ltd collects, uses, and protects information you share with us through our website and services.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "1. Information we collect",
    body: [
      "We collect information you provide directly to us, such as when you fill in an inquiry or contact form, request a quote, subscribe to updates, or otherwise communicate with us. This may include your name, email address, phone number, and details about your project.",
      "We also automatically collect limited technical information when you visit our website, such as your IP address, browser type, device information, and pages visited, typically through standard web server logs and analytics tools.",
    ],
  },
  {
    title: "2. How we use your information",
    body: [
      "We use the information we collect to respond to inquiries, prepare quotes and proposals, deliver our construction and development services, communicate with you about ongoing or prospective projects, and improve our website and services.",
      "We do not sell your personal information to third parties.",
    ],
  },
  {
    title: "3. Sharing of information",
    body: [
      "We may share information with trusted service providers who help us operate our business — for example, hosting providers, email delivery services, or payment processors — solely to the extent necessary for them to perform services on our behalf.",
      "We may also disclose information where required to do so by law, or to protect the rights, property, or safety of Aba Group Ltd, our clients, or others.",
    ],
  },
  {
    title: "4. Cookies and analytics",
    body: [
      "Our website may use cookies and similar technologies to understand how visitors use our site and to improve its functionality. You can control cookies through your browser settings; disabling cookies may affect some features of the site.",
    ],
  },
  {
    title: "5. Data retention",
    body: [
      "We retain personal information for as long as necessary to fulfil the purposes described in this policy, including any legal, accounting, or reporting requirements.",
    ],
  },
  {
    title: "6. Your rights",
    body: [
      `Under the Kenya Data Protection Act, 2019, you have the right to access, correct, or request deletion of your personal data, and to object to or restrict certain processing. To exercise these rights, contact us at ${SITE.email}.`,
    ],
  },
  {
    title: "7. Data security",
    body: [
      "We take reasonable technical and organizational measures to protect the information we hold from unauthorized access, alteration, disclosure, or destruction. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    title: "8. Changes to this policy",
    body: [
      "We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date.",
    ],
  },
  {
    title: "9. Contact us",
    body: [
      `If you have questions about this privacy policy or how we handle your information, please contact us at ${SITE.privacyemail} or through our contact page.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-paper px-5 pb-20 pt-28 text-ink sm:pt-32 lg:px-10 lg:pb-28">
      <div className="mx-auto max-w-3xl">
        <SectionLabel>Legal</SectionLabel>
        <h1 className="font-serif text-4xl leading-tight sm:text-6xl">
          Privacy policy
        </h1>
        <p className="mt-4 text-xs uppercase tracking-widest text-ink/40">
          Last updated {LAST_UPDATED}
        </p>

        <p className="mt-10 text-sm leading-7 text-ink/60">
          This policy explains how {SITE.name} (&ldquo;we&rdquo;,
          &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, and protects
          information when you visit our website or engage with our services.
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-serif text-2xl">{section.title}</h2>
              <div className="mt-3 space-y-3 text-sm leading-7 text-ink/60">
                {section.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
