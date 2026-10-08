import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { servicesContent } from "@/content/site-content";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  return (
    <section id="servicios" aria-labelledby="services-title" className="scroll-mt-[68px] bg-surface py-20 md:py-28">
      <Container>
        <SectionHeading id="services-title" title={servicesContent.title} intro={servicesContent.intro} />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {servicesContent.groups.map((group) => {
            const dark = group.tone === "dark";
            return (
              <article
                key={group.id}
                className={cn(
                  "rounded-[28px] p-7 sm:p-10",
                  dark ? "bg-brand-green text-white" : "border border-line bg-paper",
                )}
              >
                <h3 className="mb-2.5 font-serif text-[40px] leading-none">{group.title}</h3>
                <p className={cn("mb-7", dark ? "text-[#bfd9cf]" : "text-ink-soft")}>{group.description}</p>
                <ul className="grid gap-3.5">
                  {group.items.map((item) => (
                    <li key={item} className="grid grid-cols-[20px_1fr] gap-2.5">
                      <span
                        aria-hidden
                        className={cn("mt-2.5 size-2 rounded-full", dark ? "bg-brand-lime" : "bg-brand-green")}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
