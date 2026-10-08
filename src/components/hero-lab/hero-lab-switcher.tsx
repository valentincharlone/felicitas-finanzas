"use client";

import { useState } from "react";

import {
  HeroMinimalByline,
  HeroMinimalEditorial,
  HeroMinimalPortrait,
  type LabPhotoProps,
} from "@/components/hero-lab/hero-variants";
import type { PortraitTone } from "@/components/shared/portrait-photo";
import { siteConfig } from "@/content/site-content";
import { cn } from "@/lib/utils";

// Numeración original, para no confundir al hablar de cada una (1 a 10 descartadas).
const variants = [
  { id: "minimal-firma", label: "11 · Minimal · firma", Hero: HeroMinimalByline },
  { id: "minimal-retrato", label: "12 · Minimal · retrato chico", Hero: HeroMinimalPortrait },
  { id: "minimal-editorial", label: "13 · Minimal · editorial", Hero: HeroMinimalEditorial },
];

const photos = [
  { id: "retrato", label: "Retrato B&N", photo: siteConfig.portrait },
  { id: "playa", label: "Playa", photo: siteConfig.portraitBeach },
] as const;

const tones: { id: PortraitTone | "default"; label: string }[] = [
  { id: "default", label: "El de cada variante" },
  { id: "color", label: "Color" },
  { id: "soft", label: "Velo menta" },
  { id: "mono", label: "B&N" },
];

function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <fieldset className="flex flex-wrap items-center gap-2">
      <legend className="sr-only">{label}</legend>
      <span aria-hidden className="mr-1 text-white/60">
        {label}
      </span>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          aria-pressed={value === o.id}
          onClick={() => onChange(o.id)}
          className={cn(
            "rounded-full border px-3 py-1",
            value === o.id ? "border-white bg-white text-ink" : "border-white/30 text-white hover:border-white",
          )}
        >
          {o.label}
        </button>
      ))}
    </fieldset>
  );
}

export function HeroLabSwitcher() {
  const [photoId, setPhotoId] = useState<(typeof photos)[number]["id"]>("retrato");
  const [toneId, setToneId] = useState<(typeof tones)[number]["id"]>("default");

  const props: LabPhotoProps = {
    photo: photos.find((p) => p.id === photoId)?.photo,
    tone: toneId === "default" ? undefined : toneId,
  };

  return (
    <>
      <div className="sticky top-0 z-50 flex flex-wrap gap-x-8 gap-y-3 bg-ink px-6 py-3 text-sm">
        <Segmented label="Foto" options={photos} value={photoId} onChange={setPhotoId} />
        <Segmented label="Tono" options={tones} value={toneId} onChange={setToneId} />
      </div>
      {variants.map(({ id, label, Hero }) => (
        <div key={id} id={id}>
          <p className="border-t border-white/10 bg-ink px-6 py-3 font-mono text-sm text-white">{label}</p>
          <Hero {...props} />
        </div>
      ))}
    </>
  );
}
