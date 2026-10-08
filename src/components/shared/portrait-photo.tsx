import Image from "next/image";

import { siteConfig } from "@/content/site-content";
import { cn } from "@/lib/utils";

export type PortraitTone = "duotone" | "soft" | "mono" | "color";

type PortraitPhotoProps = {
  className?: string;
  priority?: boolean;
  /** Por defecto, el retrato principal de siteConfig. */
  photo?: { src: string; alt: string };
  /**
   * - duotone: sombras verde petróleo y luces menta.
   * - soft: blanco y negro con un velo menta apenas perceptible.
   * - mono: blanco y negro, sin tinte.
   * - color: la foto tal cual.
   */
  tone?: PortraitTone;
  sizes?: string;
};

/**
 * Retrato de Feli. En duotono, la foto en grises se mezcla en "screen" sobre el verde
 * profundo (sombras) y la capa menta en "multiply" tiñe las luces.
 *
 * Las fotos actuales miden ~400-447px: en 4:5 no mostrarlas a más de 240px de ancho
 * (300px si es cuadrada) para que no se pixeleen en pantallas retina.
 * TODO: subir el límite cuando lleguen las fotos en alta.
 */
export function PortraitPhoto({
  className,
  priority = false,
  photo = siteConfig.portrait,
  tone = "duotone",
  sizes = "240px",
}: PortraitPhotoProps) {
  const duotone = tone === "duotone";
  const tinted = duotone || tone === "soft";

  return (
    <div
      className={cn(
        "relative isolate  w-full overflow-hidden rounded-t-full",
        duotone ? "bg-brand-green-deep" : "bg-line",
        className,
      )}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        preload={priority}
        sizes={sizes}
        className={cn(
          "object-cover object-[50%_20%]",
          tone !== "color" && "grayscale",
          duotone ? "contrast-[1.08] mix-blend-screen" : tone !== "color" && "contrast-[1.03]",
        )}
      />
      {tinted && (
        <div
          aria-hidden
          className={cn("absolute inset-0 bg-brand-mint mix-blend-multiply", tone === "soft" && "opacity-35")}
        />
      )}
    </div>
  );
}
