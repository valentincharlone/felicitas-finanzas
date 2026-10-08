"use client";

import { useState } from "react";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { heroContent, situationsContent } from "@/content/site-content";
import { cn } from "@/lib/utils";

/**
 * "¿Te pasa alguna de estas?" en formato selector:
 * elegís tu situación y la respuesta aparece grande, con el botón al lado.
 * En celular la respuesta se abre debajo de la pregunta elegida.
 */
export function SituationsSection() {
  const [active, setActive] = useState(0);
  const current = situationsContent.items[active];

  return (
    <section aria-labelledby="situations-title" className="py-16 md:py-28">
      <Container>
        <SectionHeading
          id="situations-title"
          title={situationsContent.title}
          intro={situationsContent.intro}
        />
        <div className="mt-12 grid items-start gap-10 md:mt-14 md:grid-cols-[1fr_1fr] md:gap-16">
          <ul className="border-t border-line">
            {situationsContent.items.map((item, i) => {
              const selected = i === active;
              return (
                <li key={item.question} className="border-b border-line">
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActive(i)}
                    className={cn(
                      "w-full cursor-pointer border-l-2 py-5 pl-5 text-left font-serif text-[clamp(22px,2.2vw,28px)] leading-[1.15] transition-colors",
                      selected
                        ? "border-brand-green text-ink"
                        : "border-transparent text-ink-soft hover:text-ink",
                    )}
                  >
                    {item.question}
                  </button>
                  {selected && (
                    <p className="animate-in pb-6 pl-5 text-base text-pretty text-ink-soft duration-300 fade-in-0 slide-in-from-top-1 motion-reduce:animate-none md:hidden">
                      {item.answer}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Sombra teñida de verde (no el gris genérico) + borde fino: la tarjeta se despega del fondo sin pesar. */}
          <div
            aria-live="polite"
            className="rounded-container border border-line/50 bg-surface p-8 shadow-[0_1px_2px_rgba(11,74,60,0.05),0_14px_32px_-16px_rgba(11,74,60,0.16)] max-md:hidden md:sticky md:top-27.5 lg:p-10"
          >
            {/* Sans (la explicación de Feli), distinta de la serif de las preguntas (la situación del cliente).
                min-h de 3 líneas (lo que ocupan casi todas en escritorio): el botón no se mueve al cambiar de respuesta.
                key: al cambiar de situación la respuesta se vuelve a montar y entra con la animación. */}
            <p
              key={active}
              className="mb-5 min-h-[calc(3*1.55em)] animate-in text-[22px] leading-[1.55] text-pretty text-ink duration-300 fade-in-0 slide-in-from-bottom-2 motion-reduce:animate-none"
            >
              {current.answer}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild>
                <a href="#formulario">{heroContent.cta}</a>
              </Button>
              <span className="text-sm text-ink-soft">
                {heroContent.ctaNote}
              </span>
            </div>
          </div>
        </div>
        <p className="mt-8 md:hidden">
          <Button asChild>
            <a href="#formulario">{heroContent.cta}</a>
          </Button>
        </p>
      </Container>
    </section>
  );
}
