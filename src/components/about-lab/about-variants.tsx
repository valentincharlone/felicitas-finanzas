/**
 * Variantes de "Hola, soy Feli" para comparar (ruta /sobre-mi-lab).
 * TODO: borrar esta carpeta y la ruta cuando elijamos una.
 */
import { Container } from "@/components/shared/container";
import { PortraitPhoto } from "@/components/shared/portrait-photo";
import { Button } from "@/components/ui/button";
import { aboutContent, heroContent, siteConfig } from "@/content/site-content";

// Foto provisoria de 447px: no pasar de 240px de ancho para que no se pixelee.
function Photo({ className }: { className?: string }) {
  return (
    <PortraitPhoto
      photo={siteConfig.portraitBeach}
      tone="color"
      sizes="(min-width: 768px) 240px, 200px"
      className={className ?? "aspect-[4/5] max-w-[200px] rounded-[16px] md:max-w-[240px]"}
    />
  );
}

function Credentials({ className }: { className?: string }) {
  return (
    <dl className={className}>
      {aboutContent.credentials.map((c) => (
        <div key={c.label} className="grid gap-0.5 border-b border-line py-3 text-[15px] sm:grid-cols-[110px_1fr] sm:gap-4">
          <dt className="text-ink-soft">{c.label}</dt>
          <dd>{c.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** "Invitada en Cash is King, de Neura Media: 16/12/2025 y 03/02/2026." */
function PressLine({ className }: { className?: string }) {
  return (
    <p className={`text-[15px] text-ink-soft ${className ?? ""}`}>
      {aboutContent.press.value}:{" "}
      {aboutContent.press.links.map((link, i) => (
        <span key={link.href}>
          {i > 0 && " y "}
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block py-1 text-brand-green underline underline-offset-4 hover:text-ink"
          >
            {link.label.replace("Episodio del ", "")}
          </a>
        </span>
      ))}
      .
    </p>
  );
}


/** A. Carta: el texto como una carta en serif, firmada por Feli. Lo más personal. */
export function AboutLetter() {
  return (
    <section aria-labelledby="about-a-title" className="py-16 md:py-28">
      <Container className="grid items-start gap-10 md:grid-cols-[1fr_240px] md:gap-20">
        <div className="max-w-[62ch]">
          <h2 id="about-a-title" className="mb-8 font-serif text-[clamp(38px,4.6vw,60px)] leading-[1.02] tracking-[-0.02em]">
            {aboutContent.title}
          </h2>
          <div className="space-y-5 font-serif text-[clamp(20px,1.7vw,23px)] leading-[1.5] text-ink">
            {aboutContent.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p>{aboutContent.quote}</p>
          </div>
          <p className="mt-8 font-serif text-[34px] leading-none text-brand-green">{siteConfig.shortName}</p>
          <Credentials className="mt-12 border-t border-line" />
          <PressLine className="mt-5" />
        </div>
        <Photo className="aspect-[4/5] max-w-[200px] rounded-[16px] max-md:order-first md:sticky md:top-[110px] md:max-w-[240px]" />
      </Container>
    </section>
  );
}

/** B. Ficha: relato a la izquierda y una ficha con foto, credenciales y botón a la derecha. */
export function AboutProfileCard() {
  return (
    <section aria-labelledby="about-b-title" className="py-16 md:py-28">
      <Container className="grid items-start gap-10 md:grid-cols-[1.3fr_1fr] md:gap-16">
        <div>
          <h2 id="about-b-title" className="mb-7 font-serif text-[clamp(38px,4.6vw,60px)] leading-[1.02] tracking-[-0.02em]">
            {aboutContent.title}
          </h2>
          <div className="space-y-4">
            {aboutContent.paragraphs.map((p) => (
              <p key={p} className="max-w-[56ch] text-ink-soft">
                {p}
              </p>
            ))}
          </div>
          <blockquote className="mt-9 border-l-2 border-brand-green pl-5 font-serif text-[clamp(24px,2.4vw,30px)] leading-[1.15] text-balance">
            {aboutContent.quote}
          </blockquote>
        </div>
        <aside className="rounded-[28px] bg-surface p-7 sm:p-9 md:sticky md:top-[110px]">
          <div className="mb-6 flex items-center gap-4">
            <PortraitPhoto photo={siteConfig.portraitBeach} tone="color" sizes="88px" className="aspect-square w-22 rounded-full" />
            <p className="leading-snug">
              <span className="block font-serif text-[26px]">{siteConfig.name}</span>
              <span className="text-[15px] text-ink-soft">{heroContent.byline}</span>
            </p>
          </div>
          <Credentials className="mb-6 border-t border-line" />
          <PressLine className="mb-7" />
          <Button asChild>
            <a href="#formulario">{heroContent.cta}</a>
          </Button>
        </aside>
      </Container>
    </section>
  );
}
