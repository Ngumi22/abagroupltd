import type { ReactNode } from "react";
import { Footer } from "@/components/site/site-shell";
import Header from "@/components/site/header";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
