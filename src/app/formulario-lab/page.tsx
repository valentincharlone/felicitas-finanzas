import type { Metadata } from "next";

import { LeadPrevious } from "@/components/lead-lab/lead-previous";
import { LeadLight, LeadWithFeli } from "@/components/lead-lab/lead-variants";
import { LeadSection } from "@/components/sections/lead-section";

// TODO: ruta temporal para elegir la sección del formulario. Borrar cuando esté decidido.
// Todos los formularios de esta página están en modo demo: no guardan ni mandan mails.
export const metadata: Metadata = {
  title: "Formulario lab",
  robots: { index: false, follow: false },
};

const variants = [
  { id: "anterior", label: "0 · Anterior (dos columnas)", Section: LeadPrevious },
  { id: "foco", label: "A · Foco (en la home)", Section: () => <LeadSection demo /> },
  { id: "claro", label: "B · Claro", Section: LeadLight },
  { id: "con-feli", label: "C · Con Feli", Section: LeadWithFeli },
];

export default function LeadLabPage() {
  return (
    <main>
      <p className="bg-brand-lime px-6 py-3 text-sm font-semibold text-brand-green-deep">
        Modo demo: los formularios de esta página no envían nada.
      </p>
      {variants.map(({ id, label, Section }) => (
        <div key={id} id={id}>
          <p className="bg-ink px-6 py-3 font-mono text-sm text-white">{label}</p>
          <Section />
        </div>
      ))}
    </main>
  );
}
