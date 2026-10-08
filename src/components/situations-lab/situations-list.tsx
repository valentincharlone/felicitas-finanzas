import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { heroContent, situationsContent } from "@/content/site-content";

/** 0. Lista (anterior): todas las preguntas y respuestas a la vista. Era la versión de la home. */
export function SituationsList() {
  return (
    <section aria-labelledby="sit-0-title" className="py-16 md:py-28">
      <Container>
        <SectionHeading id="sit-0-title" title={situationsContent.title} intro={situationsContent.intro} />
        <ul className="mt-14 border-t border-line">
          {situationsContent.items.map((item) => (
            <li
              key={item.question}
              className="grid gap-3 border-b border-line py-7 md:grid-cols-[1.1fr_1fr] md:gap-12"
            >
              <h3 className="font-serif text-[clamp(26px,2.8vw,36px)] leading-[1.12] tracking-[-0.01em]">
                {item.question}
              </h3>
              <p className="max-w-[52ch] self-center text-ink-soft">{item.answer}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-lg">
          <span className="text-ink-soft">{situationsContent.ctaLead}</span>
          <a
            href="#formulario"
            className="inline-block py-2 font-semibold text-brand-green underline underline-offset-4 transition-colors hover:text-ink"
          >
            {heroContent.cta}
          </a>
        </p>
      </Container>
    </section>
  );
}
