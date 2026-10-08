"use client";

import { useEffect, useState } from "react";

import { HeaderPrevious } from "@/components/header-lab/header-previous";
import { HeaderNoNav, HeaderScrollspy } from "@/components/header-lab/header-variants";
import { SiteHeader } from "@/components/layout/site-header";
import { cn } from "@/lib/utils";

const variants = [
  { id: "anterior", label: "0 · Anterior", Header: HeaderPrevious },
  { id: "sin-menu", label: "A · Sin menú", Header: HeaderNoNav },
  { id: "aparece", label: "B · Aparece al bajar (en la home)", Header: SiteHeader },
  { id: "activa", label: "C · Sección activa", Header: HeaderScrollspy },
];

/** Home completa con un selector flotante para cambiar de header en vivo. */
export function HeaderLabShell({ children }: { children: React.ReactNode }) {
  const [index, setIndex] = useState(0);
  const { Header } = variants[index];

  // Atajo para compartir o probar una variante: /header-lab?v=aparece
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get("v");
    const i = variants.findIndex((x) => x.id === v);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- se lee la URL una sola vez al montar
    if (i > 0) setIndex(i);
  }, []);

  return (
    <>
      {/* key: cada header arranca de cero (sus observadores de scroll se vuelven a crear). */}
      <Header key={variants[index].id} />
      {children}
      <div
        role="group"
        aria-label="Variante de header"
        className="fixed bottom-4 left-1/2 z-50 flex max-w-[calc(100%-32px)] -translate-x-1/2 flex-wrap justify-center gap-1 rounded-[20px] bg-ink p-1.5 shadow-lg"
      >
        {variants.map((v, i) => (
          <button
            key={v.id}
            type="button"
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
            className={cn(
              "cursor-pointer rounded-full px-3 py-1.5 text-[13px] font-medium",
              i === index ? "bg-white text-ink" : "text-white/80 hover:text-white",
            )}
          >
            {v.label}
          </button>
        ))}
      </div>
    </>
  );
}
