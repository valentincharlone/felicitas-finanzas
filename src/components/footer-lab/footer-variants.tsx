/**
 * Variantes del footer para comparar (ruta /footer-lab).
 * TODO: borrar esta carpeta y la ruta cuando elijamos una.
 */
import { Container } from "@/components/shared/container";
import { footerContent, heroContent, siteConfig } from "@/content/site-content";
import { cn } from "@/lib/utils";

const links = [
  { label: "Instagram", href: siteConfig.links.instagram, external: true },
  { label: "LinkedIn", href: siteConfig.links.linkedin, external: true },
  { label: heroContent.cta, href: "#formulario", external: false },
];

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

function VerifyLink({ className }: { className?: string }) {
  return (
    <a href={siteConfig.cnv.registryUrl} {...external} className={cn("inline-block py-1 underline underline-offset-4", className)}>
      {footerContent.verify}
    </a>
  );
}

function Credit({ className }: { className?: string }) {
  return (
    <span className={className}>
      Sitio por{" "}
      <a href={siteConfig.credit.href} {...external} className="underline">
        {siteConfig.credit.label}
      </a>
    </span>
  );
}

/** A. Verde continuo: el footer sigue el verde del formulario; la página cierra en un solo bloque oscuro. */
export function FooterGreen() {
  return (
    <footer className="bg-brand-green-deep pt-14 pb-10 text-sm text-[#a9c7bc] [--ring:var(--brand-lime)]">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-2.5">
            <p className="mb-3 font-serif text-[26px] text-brand-mint">{siteConfig.name}</p>
            <p className="max-w-[62ch]">
              {footerContent.registry} {footerContent.location}.
            </p>
            <VerifyLink className="text-white" />
            <p className="max-w-[62ch] pt-2">{footerContent.disclaimer}</p>
          </div>
          <nav aria-label="Enlaces" className="flex flex-col md:items-end">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external && external)}
                className="inline-block py-2 font-medium text-white hover:underline"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-8 flex flex-wrap justify-between gap-2 border-t border-brand-mint/20 pt-5">
          <span>
            © {siteConfig.year} {siteConfig.name}
          </span>
          <Credit />
        </div>
      </Container>
    </footer>
  );
}

/** B. Firma: el nombre grande en serif como firma de cierre; matrícula verificable y links debajo. */
export function FooterSignature() {
  return (
    <footer className="border-t border-line pt-14 pb-10 text-sm text-ink-soft">
      <Container>
        <p className="mb-10 font-serif text-[clamp(44px,8vw,104px)] leading-[0.95] tracking-[-0.03em] text-ink">
          {siteConfig.name}
        </p>
        <div className="grid gap-8 border-t border-line pt-8 md:grid-cols-3 md:gap-12">
          <div className="space-y-1.5">
            <p className="text-ink">{footerContent.registry}</p>
            <p>{footerContent.location}.</p>
            <VerifyLink className="text-brand-green" />
          </div>
          <nav aria-label="Enlaces" className="flex flex-col">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external && external)}
                className="inline-block py-1.5 font-medium text-ink hover:underline"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p className="max-w-[48ch]">{footerContent.disclaimer}</p>
        </div>
        <div className="mt-10 flex flex-wrap justify-between gap-2">
          <span>
            © {siteConfig.year} {siteConfig.name}
          </span>
          <Credit />
        </div>
      </Container>
    </footer>
  );
}
