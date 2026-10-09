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
 * En celular es un acordeón: la respuesta se abre debajo de la pregunta y tocarla de nuevo la cierra.
 */
export function SituationsSection() {
  const [active, setActive] = useState(0);
  // Solo cuenta en celular: en escritorio la respuesta elegida siempre se ve en la tarjeta.
  const [open, setOpen] = useState(true);
  const current = situationsContent.items[active];

  function select(i: number) {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (i === active && !isDesktop) {
      setOpen((o) => !o);
    } else {
      setActive(i);
      setOpen(true);
    }
  }

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
              const expanded = selected && open;
              return (
                <li key={item.question} className="border-b border-line">
                  {/* Celular: acordeón alineado al borde, con "+" que pasa a "−".
                      Escritorio: barra verde a la izquierda en la elegida y las demás en gris. */}
                  <button
                    type="button"
                    aria-pressed={expanded}
                    onClick={() => select(i)}
                    className={cn(
                      "flex w-full cursor-pointer items-start justify-between gap-4 py-5 text-left font-serif text-[clamp(22px,2.2vw,28px)] leading-[1.15] text-ink transition-colors md:border-l-2 md:pl-5",
                      selected
                        ? "md:border-brand-green"
                        : "md:border-transparent md:text-ink-soft md:hover:text-ink",
                      // En celular, con una abierta, las cerradas bajan un poco para que la abierta se destaque.
                      open && !selected && "max-md:text-ink/60",
                    )}
                  >
                    {item.question}
                    {/* mt-[5px]: centra el ícono de 16px en la primera línea (22px × 1.15). */}
                    <span aria-hidden className="relative mt-[5px] size-4 shrink-0 md:hidden">
                      <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-current" />
                      <span
                        className={cn(
                          "absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 bg-current transition-transform duration-300 motion-reduce:transition-none",
                          expanded && "rotate-90",
                        )}
                      />
                    </span>
                  </button>
                  {/* pr-8: la respuesta no pasa por debajo del ícono (16px + gap-4). */}
                  {expanded && (
                    <p className="animate-in pr-8 pb-6 text-[17px] text-pretty text-ink duration-300 fade-in-0 slide-in-from-top-1 motion-reduce:animate-none md:hidden">
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
