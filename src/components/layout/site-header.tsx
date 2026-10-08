import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { heroContent, navLinks, siteConfig } from "@/content/site-content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 text-ink backdrop-blur-md">
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
        {/* En celular el header no tiene nav: el botón es el único acceso rápido al formulario. */}
        <Button asChild size="sm">
          <a href="#formulario">{heroContent.cta}</a>
        </Button>
      </Container>
    </header>
  );
}
