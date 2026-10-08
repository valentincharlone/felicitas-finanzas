/**
 * Variantes de la sección del formulario para comparar (ruta /formulario-lab).
 * Todas usan <LeadForm demo />: muestran el "¡Listo!" pero no guardan ni mandan mails.
 * TODO: borrar esta carpeta y la ruta cuando elijamos una.
 */
import { CheckIcon } from "lucide-react";

import { LeadForm } from "@/components/lead-form/lead-form";
import { Container } from "@/components/shared/container";
import { PortraitPhoto } from "@/components/shared/portrait-photo";
import { leadContent, processContent, siteConfig } from "@/content/site-content";
import { cn } from "@/lib/utils";

function Notes({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <ul className={cn("grid gap-3", className)}>
      {leadContent.notes.map((note) => (
        <li key={note} className={cn("flex items-start gap-3 text-base", light ? "text-ink-soft" : "text-[#cfe3db]")}>
          <CheckIcon aria-hidden className={cn("mt-1 size-4 shrink-0", light ? "text-brand-green" : "text-brand-lime")} />
          {note}
        </li>
      ))}
    </ul>
  );
}

function InstagramAlternative({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <p className={cn("text-base", light ? "text-ink-soft" : "text-[#cfe3db]", className)}>
      {leadContent.alternative}{" "}
      <a
        href={siteConfig.links.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("underline underline-offset-4", light ? "text-ink" : "text-white")}
      >
        Mandame un mensaje por Instagram
      </a>
    </p>
  );
}

/** B. Claro: la misma estructura sobre papel; el verde queda solo en botones y progreso. */
export function LeadLight() {
  return (
    <section aria-labelledby="lead-b-title" className="border-t border-line bg-paper py-16 md:py-28">
      <Container className="grid items-start gap-12 md:grid-cols-[1fr_1.3fr] md:gap-[72px]">
        <div className="md:sticky md:top-[110px]">
          <h2 id="lead-b-title" className="mb-5 font-serif text-[clamp(40px,5vw,68px)] leading-none tracking-[-0.02em] text-balance">
            {leadContent.title}
          </h2>
          <p className="max-w-[40ch] text-lg text-pretty text-ink-soft">{leadContent.lead}</p>
          <Notes light className="mt-8" />
          <InstagramAlternative light className="mt-8 border-t border-line pt-6" />
        </div>
        <div className="rounded-[22px] border border-line sm:rounded-[28px]">
          <LeadForm demo />
        </div>
      </Container>
    </section>
  );
}

/** C. Con Feli: la columna izquierda suma su foto y una línea en primera persona. */
export function LeadWithFeli() {
  return (
    <section aria-labelledby="lead-c-title" className="bg-brand-green py-16 text-white md:py-28">
      <Container className="grid items-start gap-12 md:grid-cols-[1fr_1.3fr] md:gap-[72px]">
        <div className="[--ring:var(--brand-lime)] md:sticky md:top-[110px]">
          <h2
            id="lead-c-title"
            className="mb-5 font-serif text-[clamp(40px,5vw,68px)] leading-none tracking-[-0.02em] text-balance text-brand-mint"
          >
            {leadContent.title}
          </h2>
          <p className="max-w-[40ch] text-lg text-pretty text-[#cfe3db]">{leadContent.lead}</p>
          <figure className="mt-8 flex items-center gap-4 rounded-[20px] bg-brand-green-deep p-4 pr-6">
            <PortraitPhoto tone="mono" sizes="64px" className="aspect-square w-16 shrink-0 rounded-full" />
            <figcaption className="text-base text-pretty text-[#dcebe5]">
              {processContent.steps[1].description}
              <span className="mt-0.5 block text-sm text-brand-mint">{siteConfig.name}</span>
            </figcaption>
          </figure>
          <Notes className="mt-8" />
          <InstagramAlternative className="mt-8 border-t border-brand-mint/20 pt-6" />
        </div>
        <LeadForm demo />
      </Container>
    </section>
  );
}
