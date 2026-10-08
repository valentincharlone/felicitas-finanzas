import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AboutSection } from "@/components/sections/about-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LeadSection } from "@/components/sections/lead-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SituationsSection } from "@/components/sections/situations-section";
import { StructuredData } from "@/components/shared/structured-data";

// Recorrido: problema → solución → quién es → cómo empezar → formulario.
export default function HomePage() {
  return (
    <>
      <StructuredData />
      <SiteHeader />
      <main>
        <HeroSection />
        <SituationsSection />
        <ServicesSection />
        <AboutSection />
        <ProcessSection />
        <LeadSection />
      </main>
      <SiteFooter />
    </>
  );
}
