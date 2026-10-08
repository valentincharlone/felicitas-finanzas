/**
 * Variantes del hero para comparar (ruta /hero-lab), partiendo del hero actual.
 * La primera ronda (variantes 1 a 13) está en el historial de git.
 * TODO: borrar esta carpeta y la ruta cuando elijamos una.
 */
import { HeroFacts } from "@/components/sections/hero-section";
import { Container } from "@/components/shared/container";
import { PortraitPhoto } from "@/components/shared/portrait-photo";
import { Button } from "@/components/ui/button";
import { goalOptions } from "@/content/lead-options";
import { heroContent, siteConfig } from "@/content/site-content";

const [titleStart, titleEnd] = heroContent.title.split(", ");
const titleClass = "font-serif text-[clamp(46px,8.6vw,112px)] leading-[0.94] tracking-[-0.03em] text-balance";

function Actions() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button asChild>
        <a href="#formulario">{heroContent.cta}</a>
      </Button>
      <span className="text-sm text-ink-soft">{heroContent.ctaNote}</span>
    </div>
  );
}

/** A. Solo tipografía: sin foto; la firma es una línea de texto. */
export function HeroTypeOnly() {
  return (
    <section aria-labelledby="hero-a-title" className="bg-paper pt-14 text-ink md:pt-32">
      <Container className="pb-14 md:pb-24">
        <p className="mb-6 text-[15px] text-ink-soft md:mb-8">
          <span className="font-semibold text-ink">{siteConfig.name}</span>, {heroContent.byline.toLowerCase()}
        </p>
        <h2 id="hero-a-title" className={`${titleClass} pb-8`}>
          {titleStart},<br className="max-md:hidden" /> {titleEnd}
        </h2>
        <p className="mb-8 max-w-[52ch] text-[19px] text-pretty text-ink-soft">{heroContent.lead}</p>
        <Actions />
      </Container>
      <HeroFacts />
    </section>
  );
}

/** B. Retrato al costado: titular a la izquierda y la foto en su tamaño máximo nítido. */
export function HeroWithPortrait() {
  return (
    <section aria-labelledby="hero-b-title" className="bg-paper pt-12 text-ink md:pt-24">
      <Container className="grid items-end gap-10 pb-14 md:grid-cols-[1fr_240px] md:gap-16 md:pb-20">
        <div>
          <h2 id="hero-b-title" className="pb-8 font-serif text-[clamp(46px,7vw,96px)] leading-[0.94] tracking-[-0.03em] text-balance">
            {heroContent.title}
          </h2>
          <p className="mb-8 max-w-[52ch] text-[19px] text-pretty text-ink-soft">{heroContent.lead}</p>
          <Actions />
        </div>
        {/* Foto provisoria de 400px: 240px de ancho como máximo para que no se pixelee. */}
        <figure className="max-md:order-first max-md:flex max-md:items-center max-md:gap-4">
          <PortraitPhoto
            priority
            tone="mono"
            sizes="(min-width: 768px) 240px, 96px"
            className="aspect-square w-24 rounded-full md:aspect-[4/5] md:w-full md:rounded-[20px]"
          />
          <figcaption className="text-[15px] leading-snug md:mt-3">
            <span className="block font-semibold">{siteConfig.name}</span>
            <span className="text-ink-soft">{heroContent.byline}</span>
          </figcaption>
        </figure>
      </Container>
      <HeroFacts />
    </section>
  );
}

/** C. ¿Qué te trae por acá?: atajos con los objetivos del formulario, debajo del titular. */
export function HeroShortcuts() {
  const shortcuts = goalOptions.filter((o) => o.value !== "otro");
  return (
    <section aria-labelledby="hero-c-title" className="bg-paper pt-12 text-ink md:pt-28">
      <Container className="pb-14 md:pb-24">
        <div className="mb-7 flex items-center gap-3.5 md:mb-8">
          <PortraitPhoto tone="mono" sizes="(min-width: 768px) 128px, 80px" className="aspect-square w-20 rounded-full md:w-32" />
          <p className="text-[15px] leading-snug">
            <span className="block font-semibold">{siteConfig.name}</span>
            <span className="text-ink-soft">{heroContent.byline}</span>
          </p>
        </div>
        <h2 id="hero-c-title" className={`${titleClass} pb-8`}>
          {titleStart},<br className="max-md:hidden" /> {titleEnd}
        </h2>
        <p className="mb-6 font-semibold">¿Qué te trae por acá?</p>
        {/* TODO(si se elige): precargar el objetivo en el formulario (#formulario?objetivo=...). */}
        <ul className="mb-8 flex flex-wrap gap-2">
          {shortcuts.map((o) => (
            <li key={o.value}>
              <a
                href="#formulario"
                className="inline-block rounded-full border-[1.5px] border-line px-4 py-2.5 text-[15px] transition-colors hover:border-brand-green hover:text-brand-green"
              >
                {o.label}
              </a>
            </li>
          ))}
        </ul>
        <Actions />
      </Container>
      <HeroFacts />
    </section>
  );
}
