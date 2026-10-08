import type { Metadata } from "next";

import { ProcessColumns } from "@/components/process-lab/process-columns";
import { ProcessTimeline, ProcessWhoDoesWhat } from "@/components/process-lab/process-variants";
import { ProcessSection } from "@/components/sections/process-section";

// TODO: ruta temporal para elegir la sección "Cómo funciona". Borrar cuando esté decidido.
export const metadata: Metadata = {
  title: "Cómo funciona lab",
  robots: { index: false, follow: false },
};

const variants = [
  { id: "columnas", label: "0 · Anterior (columnas)", Section: ProcessColumns },
  { id: "timeline", label: "A · Línea de tiempo", Section: ProcessTimeline },
  { id: "quien", label: "B · Quién hace qué", Section: ProcessWhoDoesWhat },
  { id: "stepper", label: "C · Paso a paso, sin botón (en la home)", Section: ProcessSection },
];

export default function ProcessLabPage() {
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
