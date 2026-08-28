import type { ReactNode } from "react";
import Header from "@/components/site/header";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/site/Footer";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <GoogleTagManager gtmId="GTM-WHVS5WPZ" />
      <Header />
      <div>{children}</div>
      <Footer />
      {process.env.NODE_ENV === "production" && <Analytics />}
    </div>
  );
}
