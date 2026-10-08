/**
 * Variantes de "Cómo te puedo ayudar" para comparar (ruta /servicios-lab).
 * TODO: borrar esta carpeta y la ruta cuando elijamos una.
 */
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { heroContent, servicesContent } from "@/content/site-content";
import { cn } from "@/lib/utils";

const [personas, empresas] = servicesContent.groups;

/** B. Dos caminos a sangre: mitad papel, mitad verde, de borde a borde. */
export function ServicesSplit() {
  const sides = [
    { group: personas, dark: false },
    { group: empresas, dark: true },
  ];
  return (
    <section aria-labelledby="srv-b-title" className="bg-surface pt-16 md:pt-28">
      <Container>
        <SectionHeading id="srv-b-title" title={servicesContent.title} intro={servicesContent.intro} />
      </Container>
      <div className="mt-12 grid md:mt-16 md:grid-cols-2">
        {sides.map(({ group, dark }) => (
          <article
            key={group.id}
            className={cn(
              "px-5 py-14 sm:px-6 md:py-20",
              dark ? "bg-brand-green text-white [--ring:var(--brand-lime)]" : "bg-paper",
            )}
          >
            {/* Alinea el contenido con el contenedor del sitio (1208px) en cada mitad. */}
            <div className={cn("flex h-full max-w-[556px] flex-col", dark ? "md:pl-12" : "md:ml-auto md:pr-12")}>
              <h3 className="mb-3 font-serif text-[clamp(40px,4.4vw,56px)] leading-none tracking-[-0.02em]">
                {group.title}
              </h3>
              <p className={cn("mb-8 max-w-[44ch] text-pretty", dark ? "text-[#bfd9cf]" : "text-ink-soft")}>
                {group.description}
              </p>
              <ul className={cn("mb-9 border-t", dark ? "border-brand-mint/25" : "border-line")}>
                {group.items.map((item) => (
                  <li key={item} className={cn("border-b py-3.5", dark ? "border-brand-mint/25" : "border-line")}>
                    {item}
                  </li>
                ))}
              </ul>
              {/* mt-auto: los dos botones quedan a la misma altura aunque las listas midan distinto. */}
              <div className="mt-auto">
                <Button asChild variant={dark ? "lime" : "default"}>
                  <a href="#formulario">{heroContent.cta}</a>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/** C. Índice: cada servicio como una línea en serif, agrupados por Personas y Empresas. */
export function ServicesIndex() {
  return (
    <section aria-labelledby="srv-c-title" className="bg-surface py-16 md:py-28">
      <Container>
        <SectionHeading id="srv-c-title" title={servicesContent.title} intro={servicesContent.intro} />
        <div className="mt-12 space-y-14 md:mt-16 md:space-y-20">
          {servicesContent.groups.map((group) => (
            <div key={group.id} className="grid gap-6 md:grid-cols-[260px_1fr] md:gap-12">
              <div>
                <h3 className="mb-2 font-serif text-[36px] leading-none text-brand-green">{group.title}</h3>
                <p className="max-w-[32ch] text-base text-pretty text-ink-soft">{group.description}</p>
              </div>
              <ul className="border-t border-line">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-line py-4 font-serif text-[clamp(22px,2.4vw,30px)] leading-[1.15] tracking-[-0.01em]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** D. Principal + banda: Personas como bloque principal, Empresas como banda verde debajo. */
export function ServicesPrimaryBand() {
  return (
    <section aria-labelledby="srv-d-title" className="bg-surface py-16 md:py-28">
      <Container>
        <SectionHeading id="srv-d-title" title={servicesContent.title} intro={servicesContent.intro} />
        <div className="mt-12 md:mt-16">
          <h3 className="mb-2.5 font-serif text-[40px] leading-none">{personas.title}</h3>
          <p className="mb-7 max-w-[52ch] text-ink-soft">{personas.description}</p>
          <ul className="grid border-t border-line md:grid-cols-2 md:gap-x-12">
            {personas.items.map((item) => (
              <li key={item} className="border-b border-line py-3.5">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <article className="mt-12 grid gap-8 rounded-[28px] bg-brand-green p-7 text-white [--ring:var(--brand-lime)] sm:p-10 md:mt-16 md:grid-cols-[1fr_1.3fr] md:gap-12">
          <div>
            <h3 className="mb-2.5 font-serif text-[40px] leading-none">{empresas.title}</h3>
            <p className="text-pretty text-[#bfd9cf]">{empresas.description}</p>
          </div>
          <ul className="grid gap-3.5 self-center">
            {empresas.items.map((item) => (
              <li key={item} className="grid grid-cols-[20px_1fr] gap-2.5">
                <span aria-hidden className="mt-2.5 size-2 rounded-full bg-brand-lime" />
                {item}
              </li>
            ))}
          </ul>
        </article>
      </Container>
    </section>
  );
}
