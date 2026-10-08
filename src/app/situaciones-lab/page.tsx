import type { Metadata } from "next";

import { SituationsSection } from "@/components/sections/situations-section";
import { SituationsChat } from "@/components/situations-lab/situations-chat";
import { SituationsList } from "@/components/situations-lab/situations-list";
import {
  SituationsAccordion,
  SituationsCompact,
  SituationsConversation,
} from "@/components/situations-lab/situations-variants";

// TODO: ruta temporal para elegir la sección de situaciones. Borrar cuando esté decidido.
export const metadata: Metadata = {
  title: "Situaciones lab",
  robots: { index: false, follow: false },
};

const variants = [
  { id: "lista", label: "0 · Lista (anterior)", Section: SituationsList },
  { id: "acordeon", label: "A · Acordeón", Section: SituationsAccordion },
  { id: "conversacion", label: "B · Conversación", Section: SituationsConversation },
  { id: "selector", label: "C · Selector (en la home)", Section: SituationsSection },
  { id: "compacta", label: "D · Compacta", Section: SituationsCompact },
  { id: "chat", label: "E · Selector + conversación (B + C)", Section: SituationsChat },
];

export default function SituationsLabPage() {
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
