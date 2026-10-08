import type { Metadata } from "next";

import { ServicesSection } from "@/components/sections/services-section";
import { ServicesToggle } from "@/components/services-lab/services-toggle";
import { ServicesIndex, ServicesPrimaryBand, ServicesSplit } from "@/components/services-lab/services-variants";

// TODO: ruta temporal para elegir la sección de servicios. Borrar cuando esté decidido.
export const metadata: Metadata = {
  title: "Servicios lab",
  robots: { index: false, follow: false },
};

const variants = [
  { id: "actual", label: "0 · Actual (tarjetas)", Section: ServicesSection },
  { id: "selector", label: "A · Para mí / Para mi empresa", Section: ServicesToggle },
  { id: "split", label: "B · Dos caminos a sangre", Section: ServicesSplit },
  { id: "indice", label: "C · Índice", Section: ServicesIndex },
  { id: "banda", label: "D · Principal + banda", Section: ServicesPrimaryBand },
];

export default function ServicesLabPage() {
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
