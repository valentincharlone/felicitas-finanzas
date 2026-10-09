import { CheckIcon } from "lucide-react";

import { LeadForm } from "@/components/lead-form/lead-form";
import { Container } from "@/components/shared/container";
import { leadContent, siteConfig } from "@/content/site-content";

/**
 * Formulario: una sola columna centrada para que
 * nada compita con el formulario; las garantías quedan debajo, junto al botón de envío.
 */
export function LeadSection() {
  return (
    <section
      id="formulario"
      aria-labelledby="lead-title"
      className="scroll-mt-17 bg-brand-green py-16 text-white md:py-28"
    >
      <Container className="max-w-190 [--ring:var(--brand-lime)]">
        <h2
          id="lead-title"
          className="mb-4 text-center font-serif text-[clamp(40px,5vw,68px)] leading-none tracking-[-0.02em] text-balance text-brand-mint"
        >
          {leadContent.title}
        </h2>
        <p className="mx-auto mb-10 max-w-[48ch] text-center text-lg text-pretty text-[#cfe3db]">
          {leadContent.lead}
        </p>
        {/* Dentro de la tarjeta blanca el foco vuelve a ser verde. */}
        <div className="[--ring:var(--brand-green)]">
          <LeadForm />
        </div>
        <div className="mt-8 flex flex-col items-center gap-5 text-center">
          <ul className="grid justify-items-start gap-3">
            {leadContent.notes.map((note) => (
              <li
                key={note}
                className="flex items-start gap-3 text-base text-[#cfe3db]"
              >
                <CheckIcon
                  aria-hidden
                  className="mt-1 size-4 shrink-0 text-brand-lime"
                />
                {note}
              </li>
            ))}
          </ul>
          <p className="text-base text-[#cfe3db]">
            {leadContent.alternative}{" "}
            <a
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-4"
            >
              Mandame un mensaje por Instagram
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
