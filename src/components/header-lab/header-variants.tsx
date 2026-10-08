"use client";

/**
 * Variantes del header para comparar (ruta /header-lab).
 * TODO: borrar esta carpeta y la ruta cuando elijamos una.
 */
import { useEffect, useState } from "react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { heroContent, navLinks, siteConfig } from "@/content/site-content";
import { cn } from "@/lib/utils";

const shell = "sticky top-0 z-40 border-b text-ink";
const solid = "border-line bg-paper/85 backdrop-blur-md";

function Name() {
  return (
    <a href="#top" className="font-serif text-[22px] tracking-[-0.01em] whitespace-nowrap sm:text-[26px]">
      {siteConfig.name}
    </a>
  );
}

/** A. Sin menú: solo el nombre y el botón. */
export function HeaderNoNav() {
  return (
    <header className={cn(shell, solid)}>
      <Container className="flex h-[68px] items-center justify-between gap-4">
        <Name />
        <Button asChild size="sm">
          <a href="#formulario">{heroContent.cta}</a>
        </Button>
      </Container>
    </header>
  );
}

/** C. Sección activa: el menú marca en qué sección estás mientras bajás. */
export function HeaderScrollspy() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => el !== null);
    // La sección "activa" es la que cruza la franja del 35% superior de la pantalla.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={cn(shell, solid)}>
      <Container className="flex h-[68px] items-center justify-between gap-4 sm:gap-8">
        <Name />
        <nav aria-label="Secciones" className="ml-auto max-lg:hidden">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => {
              const current = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={current ? "location" : undefined}
                    className={cn(
                      "relative py-2 text-[15px] transition-colors",
                      current ? "text-ink" : "text-ink-soft hover:text-ink",
                    )}
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-brand-green transition-transform duration-300 motion-reduce:transition-none",
                        current ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <Button asChild size="sm">
          <a href="#formulario">{heroContent.cta}</a>
        </Button>
      </Container>
    </header>
  );
}
