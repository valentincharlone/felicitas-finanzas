"use client";

import { useState } from "react";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { clientTypeOptions } from "@/content/lead-options";
import { heroContent, servicesContent } from "@/content/site-content";
import { cn } from "@/lib/utils";

/**
 * A. Para mí / Para mi empresa: un selector con las mismas palabras que la primera
 * pregunta del formulario. Muestra un grupo a la vez.
 */
export function ServicesToggle() {
  const [index, setIndex] = useState(0);
  const group = servicesContent.groups[index];
  const dark = group.tone === "dark";

  return (
    <section aria-labelledby="srv-a-title" className="bg-surface py-16 md:py-28">
      <Container>
        <SectionHeading id="srv-a-title" title={servicesContent.title} intro={servicesContent.intro} />

        <div role="group" aria-label="¿Para quién es?" className="mt-10 inline-flex rounded-full border border-line bg-paper p-1 md:mt-12">
          {clientTypeOptions.map((option, i) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={index === i}
              onClick={() => setIndex(i)}
              className={cn(
                "cursor-pointer rounded-full px-5 py-2.5 text-[15px] font-semibold transition-colors",
                index === i ? "bg-brand-green text-white" : "text-ink-soft hover:text-ink",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        <article
          aria-live="polite"
          className={cn(
            "mt-6 grid gap-8 rounded-[28px] p-7 sm:p-10 md:grid-cols-[1fr_1.3fr] md:gap-12",
            dark ? "bg-brand-green text-white [--ring:var(--brand-lime)]" : "border border-line bg-paper",
          )}
        >
          <div>
            <h3 className="mb-2.5 font-serif text-[clamp(40px,4.4vw,52px)] leading-none">{group.title}</h3>
            <p className={cn("mb-8 max-w-[40ch] text-pretty", dark ? "text-[#bfd9cf]" : "text-ink-soft")}>
              {group.description}
            </p>
            <Button asChild variant={dark ? "lime" : "default"}>
              <a href="#formulario">{heroContent.cta}</a>
            </Button>
          </div>
          <ul className={cn("self-center border-t", dark ? "border-brand-mint/25" : "border-line")}>
            {group.items.map((item) => (
              <li key={item} className={cn("border-b py-3.5", dark ? "border-brand-mint/25" : "border-line")}>
                {item}
              </li>
            ))}
          </ul>
        </article>
      </Container>
    </section>
  );
}
