import type { Metadata, Viewport } from "next";
import { Figtree, Instrument_Serif } from "next/font/google";

import { siteConfig } from "@/content/site-content";

import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} | Finanzas e inversiones`,
  description: siteConfig.tagline + " Asesoría financiera para personas y empresas.",
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Finanzas e inversiones`,
    description: siteConfig.tagline,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b4a3c",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${figtree.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
