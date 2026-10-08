/**
 * Variantes de hero para comparar (ruta /hero-lab).
 * TODO: borrar esta carpeta y la ruta cuando elijamos una.
 */
import { Container } from "@/components/shared/container";
import { PortraitPhoto, type PortraitTone } from "@/components/shared/portrait-photo";
import { Button } from "@/components/ui/button";
import { aboutContent, heroContent, siteConfig } from "@/content/site-content";
import { cn } from "@/lib/utils";

/** El lab permite cambiar la foto y el tono para comparar; sin props, cada variante usa los suyos. */
export type LabPhotoProps = { photo?: { src: string; alt: string }; tone?: PortraitTone };

function HeroActions({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      <Button asChild>
        <a href="#formulario">{heroContent.cta}</a>
      </Button>
      <span className="text-sm text-ink-soft">{heroContent.ctaNote}</span>
    </div>
  );
}

function HeroCopy() {
  return (
    <div>
      <h2 className="pb-7 font-serif text-[clamp(48px,7.4vw,104px)] leading-[0.95] tracking-[-0.025em] text-balance text-brand-green">
        {heroContent.title}
      </h2>
      <p className="mb-8 max-w-[46ch] text-[19px] text-pretty text-ink-soft">{heroContent.lead}</p>
      <HeroActions className="pb-10 md:pb-16" />
    </div>
  );
}

function FactsBar() {
  return (
    <div className="border-t border-line text-ink-soft">
      <Container className="grid md:grid-cols-3">
        {heroContent.facts.map((fact, i) => (
          <p
            key={fact.strong}
            className={cn(
              "flex items-center gap-3 py-4 text-[15px] md:py-[22px]",
              i > 0 && "border-t border-line md:border-t-0 md:border-l md:pl-7",
            )}
          >
            <span aria-hidden className="size-2 shrink-0 rounded-full bg-brand-green" />
            <span>
              {fact.before}
              <b className="font-semibold text-ink">{fact.strong}</b>
              {fact.after}
            </span>
          </p>
        ))}
      </Container>
    </div>
  );
}

/**
 * 9. Claro · foto + frase: fondo papel, la tarjeta de la frase pasa a verde.
 * Fuera del lab por ahora (se guarda por si vuelve): sumarla de nuevo en hero-lab-switcher.tsx.
 */
export function HeroLightQuote({ photo, tone }: LabPhotoProps) {
  return (
    <section className="overflow-hidden bg-paper pt-14 text-ink">
      <Container className="grid items-center gap-12 pb-24 md:grid-cols-[1.35fr_1fr] md:pb-20">
        <HeroCopy />
        <div className="relative w-full max-w-[220px] justify-self-center md:mr-6 md:max-w-[240px] md:justify-self-end">
          <PortraitPhoto photo={photo} tone={tone} sizes="240px" className="rounded-[24px]" />
          <figure className="absolute -right-10 -bottom-14 -left-10 rounded-[20px] bg-brand-green p-5 text-brand-mint shadow-xl md:right-auto md:-bottom-8 md:-left-36 md:w-[270px]">
            <blockquote className="font-serif text-[24px] leading-[1.1] text-balance">
              “{aboutContent.quote}”
            </blockquote>
            <figcaption className="mt-3 text-sm text-[#cfe3db]">— {siteConfig.shortName}</figcaption>
          </figure>
        </div>
      </Container>
      <FactsBar />
    </section>
  );
}

const minimalTitleClass =
  "pb-7 font-serif text-[clamp(44px,6.4vw,92px)] leading-[0.98] tracking-[-0.025em] text-balance text-ink";

/** 11. Minimal · firma: foto mínima en círculo como "byline" arriba del titular. */
export function HeroMinimalByline({ photo, tone }: LabPhotoProps) {
  return (
    <section className="bg-paper pt-20 text-ink md:pt-28">
      <Container>
        <div className="max-w-[880px] pb-16 md:pb-24">
          <div className="mb-8 flex items-center gap-3.5">
            <PortraitPhoto photo={photo} tone={tone ?? "mono"} sizes="56px" className="aspect-square w-14 rounded-full" />
            <p className="text-[15px] leading-snug">
              <span className="block font-semibold">{siteConfig.name}</span>
              <span className="text-ink-soft">
                {siteConfig.cnv.role} CNV · N° {siteConfig.cnv.number}
              </span>
            </p>
          </div>
          <h2 className={minimalTitleClass}>{heroContent.title}</h2>
          <p className="mb-8 max-w-[52ch] text-[19px] text-pretty text-ink-soft">{heroContent.lead}</p>
          <HeroActions />
        </div>
      </Container>
      <FactsBar />
    </section>
  );
}

/** 12. Minimal · retrato chico: foto angosta con velo leve y leyenda, mucho aire alrededor. */
export function HeroMinimalPortrait({ photo, tone }: LabPhotoProps) {
  return (
    <section className="bg-paper pt-16 text-ink md:pt-24">
      <Container className="grid items-start gap-10 pb-14 md:grid-cols-[1fr_220px] md:gap-20 md:pb-20">
        <HeroCopy />
        <figure className="w-[160px] max-md:order-first md:w-full md:pt-3">
          <PortraitPhoto photo={photo} tone={tone ?? "soft"} sizes="(min-width: 768px) 220px, 160px" className="rounded-[16px]" />
          <figcaption className="mt-3 text-sm leading-snug text-ink-soft">
            <span className="block font-semibold text-ink">{siteConfig.name}</span>
            Asesora financiera
          </figcaption>
        </figure>
      </Container>
      <FactsBar />
    </section>
  );
}

/** 13. Minimal · editorial: titular grande, y debajo una fila con foto chica, párrafo y botón. */
export function HeroMinimalEditorial({ photo, tone }: LabPhotoProps) {
  return (
    <section className="bg-paper pt-20 text-ink md:pt-28">
      <Container className="pb-14 md:pb-20">
        <h2 className={cn(minimalTitleClass, "max-w-[16ch] pb-12")}>{heroContent.title}</h2>
        <div className="grid items-start gap-8 border-t border-line pt-8 md:grid-cols-[140px_1fr_auto] md:gap-12">
          <PortraitPhoto photo={photo} tone={tone ?? "mono"} sizes="140px" className="aspect-square w-[120px] rounded-[12px] md:w-full" />
          <p className="max-w-[46ch] text-[19px] text-pretty text-ink-soft">{heroContent.lead}</p>
          <HeroActions className="md:flex-col md:items-start md:gap-2" />
        </div>
      </Container>
      <FactsBar />
    </section>
  );
}
