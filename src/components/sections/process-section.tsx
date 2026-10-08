import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { processContent } from "@/content/site-content";
import { cn } from "@/lib/utils";

export function ProcessSection() {
  return (
    <section id="como-funciona" aria-labelledby="process-title" className="scroll-mt-[68px] bg-surface py-16 md:py-28">
      <Container>
        <SectionHeading id="process-title" title={processContent.title} intro={processContent.intro} />
        <ol className="mt-14 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {processContent.steps.map((step, i) => (
            <li
              key={step.title}
              className={cn(
                "border-b border-line py-7 sm:pr-8 lg:border-b-0",
                i > 0 && "lg:border-l lg:pl-8",
              )}
            >
              <span aria-hidden className="mb-4 block text-sm font-medium text-ink-soft tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-2 font-serif text-[26px] leading-[1.1] tracking-[-0.01em]">{step.title}</h3>
              <p className="text-base text-pretty text-ink-soft">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
