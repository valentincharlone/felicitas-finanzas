import type { Metadata } from "next";

import { HeaderLabShell } from "@/components/header-lab/header-lab-shell";
import { SiteFooter } from "@/components/layout/site-footer";
import { AboutSection } from "@/components/sections/about-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LeadSection } from "@/components/sections/lead-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SituationsSection } from "@/components/sections/situations-section";

// TODO: ruta temporal para elegir el header. Borrar cuando esté decidido.
// Es la home completa (el formulario va en modo demo: no envía nada).
export const metadata: Metadata = {
  title: "Header lab",
  robots: { index: false, follow: false },
};

export default function HeaderLabPage() {
  return (
    <HeaderLabShell>
      <main>
        <HeroSection />
        <SituationsSection />
        <ServicesSection />
        <AboutSection />
        <ProcessSection />
        <LeadSection demo />
      </main>
      <SiteFooter />
    </HeaderLabShell>
  );
}
