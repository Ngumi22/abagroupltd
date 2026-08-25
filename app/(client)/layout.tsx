import type { ReactNode } from "react";
import { Footer } from "@/components/site/site-shell";
import Header from "@/components/site/header";
import { GoogleTagManager } from "@next/third-parties/google";

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
