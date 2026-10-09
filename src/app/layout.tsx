import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Figtree, Instrument_Serif } from "next/font/google";

import { siteConfig } from "@/content/site-content";
import { getSiteUrl } from "@/lib/site-url";

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

// La imagen para compartir sale de app/opengraph-image.tsx (Next la agrega sola).
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  alternates: { canonical: "/" },
  robots: siteConfig.launched
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.seo.title,
    description: siteConfig.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.tagline,
  },
};

export const viewport: Viewport = {
  // Mismo tono que el header (papel), para la barra del navegador en el celular.
  themeColor: "#f2f5f1",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-AR"
      className={`${figtree.variable} ${instrumentSerif.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
