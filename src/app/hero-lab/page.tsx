import type { Metadata } from "next";

import { HeroLabSwitcher } from "@/components/hero-lab/hero-lab-switcher";

// TODO: ruta temporal para elegir el hero. Borrar cuando esté decidido.
export const metadata: Metadata = {
  title: "Hero lab",
  robots: { index: false, follow: false },
};

export default function HeroLabPage() {
  return (
    <main>
      <HeroLabSwitcher />
    </main>
  );
}
