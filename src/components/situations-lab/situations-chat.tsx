"use client";

import { useState } from "react";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { heroContent, situationsContent } from "@/content/site-content";
import { cn } from "@/lib/utils";

type Item = (typeof situationsContent.items)[number];

/** El intercambio de mensajes: la situación llega y Feli responde. */
function Exchange({ item }: { item: Item }) {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="max-w-[88%] self-start rounded-[22px] rounded-bl-md border border-line bg-paper px-5 py-4 font-serif text-[clamp(21px,2vw,26px)] leading-[1.15]">
        {item.question}
      </p>
      {/* key en el padre: la respuesta vuelve a entrar cada vez que cambia la situación. */}
      <p className="max-w-[86%] animate-in self-end rounded-[22px] rounded-br-md bg-accent px-5 py-4 text-base text-pretty duration-300 fade-in-0 slide-in-from-bottom-2 motion-reduce:animate-none">
        {item.answer}
      </p>
    </div>
  );
}

/**
 * E. Selector + conversación: elegís tu situación y la respuesta aparece como un
 * intercambio de mensajes, con el botón al lado. En celular se abre debajo de la pregunta.
 */
export function SituationsChat() {
  const [active, setActive] = useState(0);
  const current = situationsContent.items[active];

  return (
    <section aria-labelledby="sit-e-title" className="py-16 md:py-28">
      <Container>
        <SectionHeading id="sit-e-title" title={situationsContent.title} intro={situationsContent.intro} />
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
                      selected ? "border-brand-green text-ink" : "border-transparent text-ink-soft hover:text-ink",
                    )}
                  >
                    {item.question}
                  </button>
                  {selected && (
                    <p
                      key={active}
                      className="mb-5 ml-5 animate-in rounded-[20px] rounded-br-md bg-accent px-4 py-3 text-base text-pretty duration-300 fade-in-0 slide-in-from-bottom-2 motion-reduce:animate-none md:hidden"
                    >
                      {item.answer}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>

          <div aria-live="polite" className="rounded-[28px] bg-surface p-8 max-md:hidden md:sticky md:top-[110px] lg:p-10">
            <Exchange key={active} item={current} />
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild>
                <a href="#formulario">{heroContent.cta}</a>
              </Button>
              <span className="text-sm text-ink-soft">{heroContent.ctaNote}</span>
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
