import { Container } from "@/components/shared/container";
import { footerContent, heroContent, siteConfig } from "@/content/site-content";

const footerLinks = [
  { label: "Instagram", href: siteConfig.links.instagram, external: true },
  { label: "LinkedIn", href: siteConfig.links.linkedin, external: true },
  { label: heroContent.cta, href: "#formulario", external: false },
];

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * Footer mínimo (variante C del /footer-lab): después del bloque verde del formulario,
 * solo nombre, links, el legal en letra chica y el link para verificar la matrícula.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-line py-10 text-sm text-ink-soft">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <p className="font-serif text-[22px] text-ink">{siteConfig.name}</p>
          <nav aria-label="Enlaces" className="flex flex-wrap gap-x-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external && external)}
                className="inline-block py-2 font-medium text-ink hover:underline"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-6 grid gap-3 border-t border-line pt-6 text-[13px] md:grid-cols-[1fr_1.4fr] md:gap-12">
          <p>
            {footerContent.registry}{" "}
            <a href={siteConfig.cnv.registryUrl} {...external} className="inline-block py-1 text-ink underline underline-offset-4">
              {footerContent.verify}
            </a>
          </p>
          <p>{footerContent.disclaimer}</p>
        </div>
        <div className="mt-6 flex flex-wrap justify-between gap-2 text-[13px]">
          <span>
            © {siteConfig.year} {siteConfig.name}. {footerContent.location}.
          </span>
          <span>
            Sitio por{" "}
            <a href={siteConfig.credit.href} {...external} className="underline">
              {siteConfig.credit.label}
            </a>
          </span>
        </div>
      </Container>
    </footer>
  );
}
