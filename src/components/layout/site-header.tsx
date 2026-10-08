"use client";

import { useEffect, useState } from "react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { heroContent, navLinks, siteConfig } from "@/content/site-content";
import { cn } from "@/lib/utils";

/**
 * Header (variante B del /header-lab, "Aparece al bajar"): transparente sobre el hero;
 * al bajar toma fondo, y el botón aparece recién cuando el botón del hero sale de la
 * pantalla, para que nunca se vean dos "Contame tu caso" a la vez.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [heroCtaVisible, setHeroCtaVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const heroCta = document.querySelector('#top a[href="#formulario"]');
    // Sin botón en el hero (otra página), el del header se muestra siempre.
    if (!heroCta) {
      const frame = requestAnimationFrame(() => setHeroCtaVisible(false));
      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", onScroll);
      };
    }
    const observer = new IntersectionObserver(([entry]) => setHeroCtaVisible(entry.isIntersecting), {
      rootMargin: "-68px 0px 0px 0px",
    });
    observer.observe(heroCta);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b text-ink transition-[background-color,border-color] duration-300 motion-reduce:transition-none",
        scrolled ? "border-line bg-paper/85 backdrop-blur-md" : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-[68px] items-center justify-between gap-4 sm:gap-8">
        <a href="#top" className="font-serif text-[22px] tracking-[-0.01em] whitespace-nowrap sm:text-[26px]">
          {siteConfig.name}
        </a>
        <nav aria-label="Secciones" className="ml-auto max-lg:hidden">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-[15px] text-ink-soft transition-colors hover:text-ink">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {/* invisible (no solo opacity-0): mientras está oculto tampoco se puede enfocar con el teclado. */}
        <Button
          asChild
          size="sm"
          className={cn(
            "transition-[opacity,visibility] duration-300 motion-reduce:transition-none",
            heroCtaVisible ? "invisible opacity-0" : "visible opacity-100",
          )}
        >
          <a href="#formulario">{heroContent.cta}</a>
        </Button>
      </Container>
    </header>
  );
}
