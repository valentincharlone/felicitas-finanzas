import type { Metadata } from "next";

import { HeroShortcuts, HeroTypeOnly, HeroWithPortrait } from "@/components/hero-lab/hero-variants";
import { HeroSection } from "@/components/sections/hero-section";

// TODO: ruta temporal para elegir el hero. Borrar cuando esté decidido.
export const metadata: Metadata = {
  title: "Hero lab",
  robots: { index: false, follow: false },
};

const variants = [
  { id: "actual", label: "0 · Actual", Hero: HeroSection },
  { id: "tipografia", label: "A · Solo tipografía", Hero: HeroTypeOnly },
  { id: "retrato", label: "B · Retrato al costado", Hero: HeroWithPortrait },
  { id: "atajos", label: "C · ¿Qué te trae por acá?", Hero: HeroShortcuts },
];

export default function HeroLabPage() {
  return (
    <main>
      {variants.map(({ id, label, Hero }) => (
        <div key={id} id={id}>
          <p className="bg-ink px-6 py-3 font-mono text-sm text-white">{label}</p>
          <Hero />
        </div>
      ))}
    </main>
  );
}
