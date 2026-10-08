import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { situationsContent } from "@/content/site-content";

export function SituationsSection() {
  return (
    <section aria-labelledby="situations-title" className="py-20 md:py-28">
      <Container>
        <SectionHeading id="situations-title" title={situationsContent.title} intro={situationsContent.intro} />
        <ul className="mt-14 border-t border-line">
          {situationsContent.items.map((item) => (
            <li
              key={item.question}
              className="grid gap-3 border-b border-line py-9 md:grid-cols-[1.1fr_1fr] md:gap-12"
            >
              <h3 className="font-serif text-[clamp(26px,2.8vw,36px)] leading-[1.12] tracking-[-0.01em]">
                {item.question}
              </h3>
              <p className="max-w-[52ch] self-center text-ink-soft">{item.answer}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-lg">
          <span className="text-ink-soft">{situationsContent.cta.text}</span>
          <a
            href="#formulario"
            className="font-semibold text-brand-green underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            {situationsContent.cta.link} <span aria-hidden>→</span>
          </a>
        </p>
      </Container>
    </section>
  );
}
