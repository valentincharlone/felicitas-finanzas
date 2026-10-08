import type { Metadata } from "next";

import { FooterGreen, FooterMinimal, FooterSignature } from "@/components/footer-lab/footer-variants";
import { SiteFooter } from "@/components/layout/site-footer";

// TODO: ruta temporal para elegir el footer. Borrar cuando esté decidido.
export const metadata: Metadata = {
  title: "Footer lab",
  robots: { index: false, follow: false },
};

const variants = [
  { id: "actual", label: "0 · Actual (en la home)", Footer: SiteFooter },
  { id: "verde", label: "A · Verde continuo", Footer: FooterGreen },
  { id: "firma", label: "B · Firma", Footer: FooterSignature },
  { id: "minimo", label: "C · Mínimo", Footer: FooterMinimal },
];

export default function FooterLabPage() {
  return (
    <main>
      {variants.map(({ id, label, Footer }) => (
        <div key={id} id={id}>
          <p className="bg-ink px-6 py-3 font-mono text-sm text-white">{label}</p>
          {/* Simula el final del bloque verde del formulario, que en la home va justo arriba. */}
          <div aria-hidden className="h-24 bg-brand-green" />
          <Footer />
        </div>
      ))}
    </main>
  );
}
