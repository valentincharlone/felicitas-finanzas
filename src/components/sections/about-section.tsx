import { Container } from "@/components/shared/container";
import { PortraitPhoto } from "@/components/shared/portrait-photo";
import { aboutContent, siteConfig } from "@/content/site-content";

export function AboutSection() {
  return (
    <section id="sobre-mi" aria-labelledby="about-title" className="scroll-mt-[68px] py-16 md:py-28">
      <Container className="grid items-start gap-10 md:grid-cols-[240px_1fr] md:gap-20">
        {/* Foto provisoria de 447px: no pasar de 240px de ancho para que no se pixelee. */}
        <PortraitPhoto
          photo={siteConfig.portraitBeach}
          tone="color"
          sizes="(min-width: 768px) 240px, 200px"
          className="aspect-[4/5] max-w-[200px] rounded-[16px] md:max-w-none"
        />
        <div className="max-w-[640px]">
          <h2 id="about-title" className="mb-7 font-serif text-[clamp(38px,4.6vw,60px)] leading-[1.02] tracking-[-0.02em]">
            {aboutContent.title}
          </h2>
          <div className="space-y-4">
            {aboutContent.paragraphs.map((p) => (
              <p key={p} className="max-w-[56ch] text-ink-soft">
                {p}
              </p>
            ))}
          </div>
          <blockquote className="my-9 border-l-2 border-brand-green pl-5 font-serif text-[clamp(24px,2.4vw,30px)] leading-[1.15] text-balance">
            {aboutContent.quote}
          </blockquote>
          <dl className="border-t border-line">
            {aboutContent.credentials.map((c) => (
              <div key={c.label} className="grid gap-0.5 border-b border-line py-3.5 text-base sm:grid-cols-[150px_1fr] sm:gap-4">
                <dt className="text-ink-soft">{c.label}</dt>
                <dd>{c.value}</dd>
              </div>
            ))}
            <div className="grid gap-0.5 border-b border-line py-3.5 text-base sm:grid-cols-[150px_1fr] sm:gap-4">
              <dt className="text-ink-soft">{aboutContent.press.label}</dt>
              <dd>
                {aboutContent.press.value}
                <ul className="flex flex-wrap gap-x-5 text-[15px]">
                  {aboutContent.press.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block py-1.5 text-brand-green underline underline-offset-4 hover:text-ink"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  );
}
