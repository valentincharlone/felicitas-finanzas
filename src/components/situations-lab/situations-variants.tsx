/**
 * Variantes de "¿Te pasa alguna de estas?" para comparar (ruta /situaciones-lab).
 * TODO: borrar esta carpeta y la ruta cuando elijamos una.
 */
import { PlusIcon } from "lucide-react";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { heroContent, situationsContent } from "@/content/site-content";

function CtaLine({ className }: { className?: string }) {
  return (
    <p className={className}>
      <span className="mr-3 text-lg text-ink-soft">{situationsContent.ctaLead}</span>
      <a
        href="#formulario"
        className="inline-block py-2 text-lg font-semibold text-brand-green underline underline-offset-4 transition-colors hover:text-ink"
      >
        {heroContent.cta}
      </a>
    </p>
  );
}

/** A. Acordeón: solo las preguntas; se abre una respuesta a la vez (<details name> nativo). */
export function SituationsAccordion() {
  return (
    <section aria-labelledby="sit-a-title" className="py-16 md:py-28">
      <Container>
        <SectionHeading id="sit-a-title" title={situationsContent.title} intro={situationsContent.intro} />
        <div className="mt-12 border-t border-line md:mt-14">
          {situationsContent.items.map((item, i) => (
            <details key={item.question} name="situaciones" open={i === 0} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                <h3 className="font-serif text-[clamp(24px,2.6vw,34px)] leading-[1.12] tracking-[-0.01em]">
                  {item.question}
                </h3>
                <PlusIcon
                  aria-hidden
                  className="mt-1.5 size-6 shrink-0 text-brand-green transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                />
              </summary>
              <p className="max-w-[60ch] pb-7 text-lg text-pretty text-ink-soft">{item.answer}</p>
            </details>
          ))}
        </div>
        <CtaLine className="mt-8" />
      </Container>
    </section>
  );
}

/** B. Conversación: cada situación como un mensaje que llega y la respuesta de Feli. */
export function SituationsConversation() {
  return (
    <section aria-labelledby="sit-b-title" className="py-16 md:py-28">
      <Container className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
        <div className="md:sticky md:top-[110px] md:self-start">
          <SectionHeading id="sit-b-title" title={situationsContent.title} intro={situationsContent.intro} />
          <CtaLine className="mt-8 max-md:hidden" />
        </div>
        <ul className="flex flex-col gap-9">
          {situationsContent.items.map((item) => (
            <li key={item.question} className="flex flex-col gap-2.5">
              <h3 className="max-w-[88%] self-start rounded-[22px] rounded-bl-md border border-line bg-surface px-5 py-4 font-serif text-[clamp(22px,2.2vw,28px)] leading-[1.15]">
                {item.question}
              </h3>
              <p className="max-w-[82%] self-end rounded-[22px] rounded-br-md bg-accent px-5 py-4 text-base text-pretty">
                {item.answer}
              </p>
            </li>
          ))}
        </ul>
        <CtaLine className="md:hidden" />
      </Container>
    </section>
  );
}

/** D. Compacta: dos columnas, pregunta y respuesta debajo. La más corta de recorrer. */
export function SituationsCompact() {
  return (
    <section aria-labelledby="sit-d-title" className="py-16 md:py-28">
      <Container>
        <SectionHeading id="sit-d-title" title={situationsContent.title} intro={situationsContent.intro} />
        <ul className="mt-12 grid gap-x-16 md:mt-14 md:grid-cols-2">
          {situationsContent.items.map((item) => (
            <li key={item.question} className="border-t border-line py-7">
              <h3 className="mb-2.5 font-serif text-[clamp(24px,2.3vw,30px)] leading-[1.12] tracking-[-0.01em]">
                {item.question}
              </h3>
              <p className="max-w-[48ch] text-base text-pretty text-ink-soft">{item.answer}</p>
            </li>
          ))}
          <li className="flex items-center border-t border-line py-7">
            <CtaLine />
          </li>
        </ul>
      </Container>
    </section>
  );
}
