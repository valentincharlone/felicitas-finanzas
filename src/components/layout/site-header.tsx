"use client";

import { useEffect, useRef, useState } from "react";
import { XIcon } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { heroContent, navLinks, siteConfig } from "@/content/site-content";
import { cn } from "@/lib/utils";

/**
 * Header: transparente sobre el hero;
 * al bajar toma fondo, y el botón aparece recién cuando el botón del hero sale de la
 * pantalla, para que nunca se vean dos "Contame tu caso" a la vez.
 * Debajo de lg, los links y el botón van dentro del menú hamburguesa.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [heroCtaVisible, setHeroCtaVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

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

  // Con el menú abierto: se cierra con Escape, tocando afuera o al pasar a escritorio.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      burgerRef.current?.focus();
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => desktop.matches && setMenuOpen(false);

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-40 border-b text-ink transition-[background-color,border-color] duration-300 motion-reduce:transition-none",
        scrolled || menuOpen ? "border-line bg-paper/85 backdrop-blur-md" : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-17 items-center justify-between gap-4 sm:gap-8">
        <a href="#top" className="font-serif text-[24px] tracking-[-0.01em] whitespace-nowrap sm:text-[26px]">
          {siteConfig.name}
        </a>
        <div className="flex items-center">
          <nav aria-label="Secciones" className="max-lg:hidden">
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
          {/* Mientras está oculto, el lugar del botón se pliega (grid 0fr → 1fr) para que el menú
              quede pegado al borde derecho; al aparecer, se abre y el menú se corre. */}
          <div
            className={cn(
              "grid transition-[grid-template-columns] duration-300 max-lg:hidden motion-reduce:transition-none",
              heroCtaVisible ? "grid-cols-[0fr]" : "grid-cols-[1fr]",
            )}
          >
            {/* p-1 -m-1: deja lugar al anillo de foco, que si no quedaría recortado por overflow-hidden. */}
            <div className="-m-1 overflow-hidden p-1">
              {/* invisible (no solo opacity-0): mientras está oculto tampoco se puede enfocar con el teclado. */}
              <Button
                asChild
                size="sm"
                className={cn(
                  "transition-[opacity,visibility] duration-300 motion-reduce:transition-none lg:ml-8",
                  heroCtaVisible ? "invisible opacity-0" : "visible opacity-100",
                )}
              >
                <a href="#formulario">{heroContent.cta}</a>
              </Button>
            </div>
          </div>
          <button
            ref={burgerRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuOpen((open) => !open)}
            className="-mr-3 grid size-11 cursor-pointer place-items-center rounded-control outline-none focus-visible:ring-3 focus-visible:ring-ring lg:hidden [&_svg]:size-7"
          >
            {/* strokeWidth 1.75 a 28px: el trazo queda en ~2px.
                Burger propia (no la de lucide) para que las líneas sean más largas: de 3 a 21 sobre 24.
                -mr-3: el extremo derecho de las líneas queda justo en el borde del contenido. */}
            {menuOpen ? (
              <XIcon aria-hidden strokeWidth={1.75} />
            ) : (
              <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </Container>

      {menuOpen && (
        <nav
          id="menu-movil"
          aria-label="Secciones"
          className="absolute inset-x-0 top-full border-b border-line bg-paper animate-in fade-in-0 slide-in-from-top-2 duration-200 motion-reduce:animate-none lg:hidden"
        >
          <Container className="pt-2 pb-6">
            <ul>
              {navLinks.map((link) => (
                <li key={link.href} className="border-b border-line">
                  <a href={link.href} onClick={closeMenu} className="block py-4 font-serif text-[26px] leading-tight">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-6 w-full">
              <a href="#formulario" onClick={closeMenu}>
                {heroContent.cta}
              </a>
            </Button>
          </Container>
        </nav>
      )}
    </header>
  );
}
