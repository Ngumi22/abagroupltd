import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
});
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

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
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#101719",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-paper">
      <body
        className={`${inter.variable} ${cormorant.variable} ${mono.variable} antialiased`}
      >
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
