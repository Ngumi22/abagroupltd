import type { ReactNode } from "react";
import { Footer } from "@/components/site/site-shell";
import Header from "@/components/site/header";
import { GoogleTagManager } from "@next/third-parties/google";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://abagroupltd.co.ke"),
  title: {
    default: "Aba Group Ltd | Construction & Development in Kenya",
    template: "%s | Aba Group Ltd",
  },
  description:
    "Construction, architecture, and development in Kenya. Built with intention. Made to endure.",
  keywords: [
    "construction company Kenya",
    "building contractors Nairobi",
    "architecture Kenya",
    "property development Kenya",
  ],
  authors: [{ name: "Aba Group Ltd" }],
  robots: { index: true, follow: true },
};

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <GoogleTagManager gtmId="GTM-WHVS5WPZ" />
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
