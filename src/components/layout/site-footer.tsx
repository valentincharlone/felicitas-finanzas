import { Container } from "@/components/shared/container";
import { footerContent, siteConfig } from "@/content/site-content";

const footerLinks = [
  { label: "Instagram", href: siteConfig.links.instagram, external: true },
  { label: "LinkedIn", href: siteConfig.links.linkedin, external: true },
  { label: "Pedir una reunión", href: "#formulario", external: false },
];

export function SiteFooter() {
  return (
    <footer className="pt-14 pb-12 text-sm text-ink-soft">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-2.5">
            <p className="mb-3 font-serif text-[26px] text-ink">{siteConfig.name}</p>
            <p className="max-w-[62ch]">
              {footerContent.registry} {footerContent.location}.
            </p>
            <p className="max-w-[62ch]">{footerContent.disclaimer}</p>
          </div>
          <nav aria-label="Enlaces" className="flex flex-col md:items-end">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="inline-block py-2 font-medium text-ink hover:underline"
                {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-8 flex flex-wrap justify-between gap-2 border-t border-line pt-5">
          <span>
            © {siteConfig.year} {siteConfig.name}
          </span>
          <span>
            Sitio por{" "}
            <a href={siteConfig.credit.href} target="_blank" rel="noopener noreferrer" className="underline">
              {siteConfig.credit.label}
            </a>
          </span>
        </div>
      </Container>
    </footer>
  );
}
