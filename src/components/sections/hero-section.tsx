import { Container } from "@/components/shared/container";
import { PortraitPhoto } from "@/components/shared/portrait-photo";
import { Button } from "@/components/ui/button";
import { heroContent, siteConfig } from "@/content/site-content";
import { cn } from "@/lib/utils";

/** Variante 11 del /hero-lab ("Minimal · firma"): la foto chica funciona como firma del titular. */
export function HeroSection() {
  return (
    <section id="top" aria-labelledby="hero-title" className="bg-paper pt-12 text-ink md:pt-28">
      <Container>
        <div className="max-w-[880px] animate-in pb-14 duration-700 fade-in-0 slide-in-from-bottom-4 motion-reduce:animate-none md:pb-24">
          <div className="mb-7 flex items-center gap-3.5 md:mb-8">
            {/* En celular más chica (80px) para que el titular y el botón entren en la primera pantalla. */}
            <PortraitPhoto
              priority
              tone="mono"
              sizes="(min-width: 768px) 128px, 80px"
              className="aspect-square w-20 rounded-full md:w-32"
            />
            <p className="text-[15px] leading-snug">
              <span className="block font-semibold">{siteConfig.name}</span>
              <span className="text-ink-soft">{heroContent.byline}</span>
            </p>
          </div>
          <h1
            id="hero-title"
            className="pb-7 font-serif text-[clamp(44px,6.4vw,92px)] leading-[0.98] tracking-[-0.025em] text-balance"
          >
            {heroContent.title}
          </h1>
          <p className="mb-8 max-w-[52ch] text-[19px] text-pretty text-ink-soft">{heroContent.lead}</p>
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild>
              <a href="#formulario">{heroContent.cta}</a>
            </Button>
            <span className="text-sm text-ink-soft">{heroContent.ctaNote}</span>
          </div>
        </div>
      </Container>

      <div className="border-y border-line text-ink-soft">
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
    </section>
  );
}
