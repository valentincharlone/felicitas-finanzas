import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { processContent } from "@/content/site-content";
import { cn } from "@/lib/utils";

/**
 * Cómo funciona (variante C del /como-funciona-lab, sin botón: el formulario está justo debajo).
 * En escritorio, 4 círculos unidos por una línea; en celular, la lista vertical.
 */
export function ProcessSection() {
  return (
    <section id="como-funciona" aria-labelledby="process-title" className="scroll-mt-[68px] bg-surface py-16 md:py-28">
      <Container>
        <SectionHeading id="process-title" title={processContent.title} intro={processContent.intro} />
        <ol className="relative mt-12 grid gap-8 md:mt-16 md:grid-cols-4 md:gap-6">
          {/* La línea que une los círculos (solo en escritorio, donde van en fila). */}
          <span aria-hidden className="absolute top-5 right-[12.5%] left-[12.5%] h-px bg-line max-md:hidden" />
          {processContent.steps.map((step, i) => (
            <li key={step.title} className="relative grid grid-cols-[40px_1fr] gap-4 md:block md:text-center">
              <span
                aria-hidden
                className={cn(
                  "relative grid size-10 place-items-center rounded-full font-serif text-[20px] md:mx-auto md:mb-5",
                  i === 0 ? "bg-brand-green text-white" : "border border-line bg-surface text-ink",
                )}
              >
                {i + 1}
              </span>
              <div>
                <h3 className="mb-1 font-serif text-[24px] leading-[1.15]">{step.title}</h3>
                <p className="mx-auto max-w-[30ch] text-[15px] text-pretty text-ink-soft">{step.description}</p>
                {i === 0 && <p className="mt-2 text-sm font-semibold text-brand-green">Empezás acá</p>}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
