import Image from "next/image";

import { Container } from "@/components/shared/container";
import { aboutContent } from "@/content/site-content";

const youtubeId = (href: string) => new URL(href).searchParams.get("v") ?? "";

/**
 * Sobre mí: relato y credenciales arriba,
 * y los episodios de Cash is King con su miniatura como prueba de trayectoria.
 */
export function AboutSection() {
  return (
    <section id="sobre-mi" aria-labelledby="about-title" className="scroll-mt-[68px] py-16 md:py-28">
      <Container>
        <h2 id="about-title" className="mb-8 font-serif text-[clamp(38px,4.6vw,60px)] leading-[1.02] tracking-[-0.02em]">
          {aboutContent.title}
        </h2>
        <div className="grid items-start gap-10 md:grid-cols-[1.25fr_1fr] md:gap-20">
          <div>
            <div className="space-y-4">
              {aboutContent.paragraphs.map((p) => (
                <p key={p} className="max-w-[56ch] text-ink-soft">
                  {p}
                </p>
              ))}
            </div>
            <blockquote className="mt-9 border-l-2 border-brand-green pl-5 font-serif text-[clamp(24px,2.4vw,30px)] leading-[1.15] text-balance">
              {aboutContent.quote}
            </blockquote>
          </div>
          <dl className="border-t border-line">
            {aboutContent.credentials.map((c) => (
              <div key={c.label} className="grid gap-0.5 border-b border-line py-3.5 text-base sm:grid-cols-[120px_1fr] sm:gap-4">
                <dt className="text-ink-soft">{c.label}</dt>
                <dd>{c.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-16 border-t border-line pt-10 md:mt-20">
          <h3 className="mb-6 font-serif text-[clamp(26px,2.6vw,34px)] leading-[1.1]">{aboutContent.press.value}</h3>
          <ul className="grid gap-6 sm:grid-cols-2">
            {aboutContent.press.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="group block">
                  {/* maxresdefault: 1280x720, ya en 16:9 (hqdefault viene en 4:3 con franjas). */}
                  <span className="relative block aspect-video overflow-hidden rounded-[16px] bg-line">
                    <Image
                      src={`https://i.ytimg.com/vi/${youtubeId(link.href)}/maxresdefault.jpg`}
                      alt={`Miniatura del ${link.label.toLowerCase()} de Cash is King`}
                      fill
                      sizes="(min-width: 1208px) 580px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </span>
                  <span className="mt-3 block font-medium underline-offset-4 group-hover:underline">
                    {link.label}, en YouTube
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
