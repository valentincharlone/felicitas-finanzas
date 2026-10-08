import { CheckIcon } from "lucide-react";

import { LeadForm } from "@/components/lead-form/lead-form";
import { Container } from "@/components/shared/container";
import { leadContent, siteConfig } from "@/content/site-content";

export function LeadSection() {
  return (
    <section
      id="formulario"
      aria-labelledby="lead-title"
      className="scroll-mt-[68px] bg-brand-green py-20 text-white md:py-28"
    >
      <Container className="grid items-start gap-12 md:grid-cols-[1fr_1.3fr] md:gap-[72px]">
        <div className="md:sticky md:top-[110px]">
          <h2
            id="lead-title"
            className="mb-5 font-serif text-[clamp(40px,5vw,68px)] leading-none tracking-[-0.02em] text-balance text-brand-mint"
          >
            {leadContent.title}
          </h2>
          <p className="max-w-[40ch] text-lg text-pretty text-[#cfe3db]">{leadContent.lead}</p>
          <ul className="mt-8 grid gap-3">
            {leadContent.notes.map((note) => (
              <li key={note} className="flex items-start gap-3 text-base text-[#cfe3db]">
                <CheckIcon aria-hidden className="mt-1 size-4 shrink-0 text-brand-lime" />
                {note}
              </li>
            ))}
          </ul>
          <p className="mt-8 border-t border-brand-mint/20 pt-6 text-base text-[#cfe3db]">
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
        <LeadForm />
      </Container>
    </section>
  );
}
