/**
 * Variantes de "Cómo funciona" para comparar (ruta /como-funciona-lab).
 * TODO: borrar esta carpeta y la ruta cuando elijamos una.
 */
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { processContent } from "@/content/site-content";
import { cn } from "@/lib/utils";

const stepNumber = (i: number) => String(i + 1).padStart(2, "0");

/** A. Línea de tiempo: pasos uno debajo del otro unidos por una línea; el título queda al costado. */
export function ProcessTimeline() {
  return (
    <section aria-labelledby="proc-a-title" className="bg-surface py-16 md:py-28">
      <Container className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:gap-20">
        <div className="md:sticky md:top-[110px] md:self-start">
          <SectionHeading id="proc-a-title" title={processContent.title} intro={processContent.intro} />
        </div>
        <ol className="relative">
          {/* La línea vertical que une los pasos: va del primer punto al último. */}
          <span aria-hidden className="absolute top-3 bottom-3 left-[11px] w-px bg-line" />
          {processContent.steps.map((step, i) => (
            <li key={step.title} className="relative grid grid-cols-[24px_1fr] gap-6 pb-10 last:pb-0">
              <span
                aria-hidden
                className={cn(
                  "relative mt-1.5 size-6 rounded-full border-2",
                  i === 0 ? "border-brand-green bg-brand-green" : "border-line bg-surface",
                )}
              />
              <div>
                <span className="mb-1.5 block text-sm font-medium text-ink-soft tabular-nums">{stepNumber(i)}</span>
                <h3 className="mb-1.5 font-serif text-[clamp(26px,2.4vw,32px)] leading-[1.1] tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="max-w-[48ch] text-base text-pretty text-ink-soft">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

// Quién hace cada paso, en el mismo orden que processContent.steps.
const actors = ["Vos", "Feli", "Feli y vos", "Feli y vos"];

/** B. Quién hace qué: cada paso dice quién lo hace. Vos solo completás el formulario. */
export function ProcessWhoDoesWhat() {
  return (
    <section aria-labelledby="proc-b-title" className="bg-surface py-16 md:py-28">
      <Container>
        <SectionHeading id="proc-b-title" title={processContent.title} intro={processContent.intro} />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
          {processContent.steps.map((step, i) => {
            const yours = i === 0;
            return (
              <li
                key={step.title}
                className={cn(
                  "flex flex-col rounded-[22px] p-6",
                  yours ? "bg-brand-green text-white" : "border border-line bg-paper",
                )}
              >
                <span className={cn("mb-6 text-sm font-medium tabular-nums", yours ? "text-brand-mint" : "text-ink-soft")}>
                  {stepNumber(i)}
                </span>
                <h3 className="mb-2 font-serif text-[26px] leading-[1.1]">{step.title}</h3>
                <p className={cn("mb-6 text-base text-pretty", yours ? "text-[#cfe3db]" : "text-ink-soft")}>
                  {step.description}
                </p>
                <p className={cn("mt-auto text-sm font-semibold", yours ? "text-brand-lime" : "text-brand-green")}>
                  {actors[i]}
                </p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
