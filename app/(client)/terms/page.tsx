import type { Metadata } from "next";
import { SectionLabel } from "@/components/site/shared";
import { LAST_UPDATED, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service | Aba Group Ltd",
  description:
    "The terms and conditions that govern your use of the Aba Group Ltd website and engagement of our construction and development services.",
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    title: "1. Acceptance of terms",
    body: [
      `By accessing or using the ${SITE.name} website, you agree to be bound by these terms of service. If you do not agree with any part of these terms, please do not use our website.`,
    ],
  },
  {
    title: "2. Our services",
    body: [
      "We provide construction, architectural, and development services in Kenya. Information on our website, including project descriptions, timelines, and pricing indications, is provided for general informational purposes and does not constitute a binding offer.",
      "Any specific project engagement, including scope, cost, and timeline, will be governed by a separate written contract agreed between Aba Group Ltd and the client.",
    ],
  },
  {
    title: "3. Website use",
    body: [
      "You agree to use our website only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use and enjoyment of, this site by any third party.",
      "You may not attempt to gain unauthorized access to any part of our website, servers, or networks connected to our website.",
    ],
  },
  {
    title: "4. Intellectual property",
    body: [
      "All content on this website, including text, images, project photography, logos, and graphics, is the property of Aba Group Ltd or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from this content without our prior written consent.",
    ],
  },
  {
    title: "5. Project inquiries and quotes",
    body: [
      "Submitting an inquiry or requesting a quote through our website does not create a contractual relationship between you and Aba Group Ltd. A binding agreement is only formed once both parties execute a formal written contract.",
    ],
  },
  {
    title: "6. Limitation of liability",
    body: [
      "To the fullest extent permitted by law, Aba Group Ltd shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website. Nothing in these terms limits our liability under any signed construction or service contract, which is governed separately by its own terms.",
    ],
  },
  {
    title: "7. Third-party links",
    body: [
      "Our website may contain links to third-party websites. We are not responsible for the content, accuracy, or practices of any third-party sites linked from our website.",
    ],
  },
  {
    title: "8. Governing law",
    body: [
      "These terms are governed by and construed in accordance with the laws of the Republic of Kenya. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Kenya.",
    ],
  },
  {
    title: "9. Changes to these terms",
    body: [
      "We may revise these terms of service at any time. Continued use of our website following any changes constitutes acceptance of the revised terms.",
    ],
  },
  {
    title: "10. Contact us",
    body: [`Questions about these terms should be directed to ${SITE.email}.`],
  },
];

export default function TermsOfServicePage() {
  return (
    <main className="bg-paper px-5 pb-20 pt-28 text-ink sm:pt-32 lg:px-10 lg:pb-28">
      <div className="mx-auto max-w-3xl">
        <SectionLabel>Legal</SectionLabel>
        <h1 className="font-serif text-4xl leading-tight sm:text-6xl">
          Terms of service
        </h1>
        <p className="mt-4 text-xs uppercase tracking-widest text-ink/40">
          Last updated {LAST_UPDATED}
        </p>

        <p className="mt-10 text-sm leading-7 text-ink/60">
          These terms govern your access to and use of the {SITE.name} website.
          Please read them carefully before using our site or engaging our
          services.
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
