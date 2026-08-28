import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist_Mono, Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { SITE, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from "@/lib/constants";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
});
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: {
    default: SITE_TITLE,
    template: "%s | Aba Group Ltd",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "construction company Kenya",
    "building contractors Nairobi",
    "architecture Kenya",
    "property development Kenya",
  ],
  authors: [{ name: "Aba Group Ltd" }],
  robots: { index: true, follow: true },
  verification: {
    google: "1RBRShyPWI9sqPKtnS8QVBDvCYvCVcQSaJqi0sf54SQ",
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://abagroupltd.co.ke",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
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
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn("bg-paper", "font-sans", geist.variable)}
    >
      <body
        className={`${inter.variable} ${cormorant.variable} ${mono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
