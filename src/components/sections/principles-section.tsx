import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { principlesContent } from "@/content/site-content";

/**
 * "Finanzas en orden": fuera de la home por ahora (se priorizó un recorrido corto hacia el formulario).
 * Se guarda para reutilizar el contenido (post, descargable o página aparte).
 */
export function PrinciplesSection() {
  return (
    <section aria-labelledby="principles-title" className="bg-accent py-20 md:py-28">
      <Container className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-[72px]">
        <div className="flex flex-col justify-between gap-10">
          <SectionHeading id="principles-title" title={principlesContent.title} intro={principlesContent.intro} />
          <blockquote className="max-w-[24ch] font-serif text-[clamp(26px,2.6vw,34px)] leading-[1.12] text-balance text-brand-green">
            {principlesContent.quote}
          </blockquote>
        </div>
        <ol className="grid gap-x-10 border-t border-line sm:grid-cols-2">
          {principlesContent.items.map((item, i) => (
            <li key={item.title} className="border-b border-line py-6">
              <span aria-hidden className="mb-2 block font-serif text-[28px] leading-none text-brand-green">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-1 text-[19px] leading-snug font-semibold">{item.title}</h3>
              <p className="text-base text-pretty text-ink-soft">{item.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
