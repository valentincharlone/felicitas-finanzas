import type { Metadata } from "next";

import { AboutPrevious } from "@/components/about-lab/about-previous";
import { AboutLetter, AboutProfileCard } from "@/components/about-lab/about-variants";
import { AboutSection } from "@/components/sections/about-section";

// TODO: ruta temporal para elegir la sección "Sobre mí". Borrar cuando esté decidido.
export const metadata: Metadata = {
  title: "Sobre mí lab",
  robots: { index: false, follow: false },
};

const variants = [
  { id: "anterior", label: "0 · Anterior (con foto)", Section: AboutPrevious },
  { id: "carta", label: "A · Carta", Section: AboutLetter },
  { id: "ficha", label: "B · Ficha", Section: AboutProfileCard },
  { id: "medios", label: "C · Con Cash is King, sin foto (en la home)", Section: AboutSection },
];

export default function AboutLabPage() {
  return (
    <main>
      {variants.map(({ id, label, Section }) => (
        <div key={id} id={id}>
          <p className="bg-ink px-6 py-3 font-mono text-sm text-white">{label}</p>
          <Section />
        </div>
      ))}
    </main>
  );
}
