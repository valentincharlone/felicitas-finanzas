import Image from "next/image";

import { siteConfig } from "@/content/site-content";
import { cn } from "@/lib/utils";

type PortraitPhotoProps = {
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Retrato de Feli en blanco y negro. El contenedor define la forma (círculo, 4:5...).
 *
 * La foto actual mide 400px: no mostrarla a más de 240px de ancho en 4:5
 * (300px si es cuadrada) para que no se pixelee en pantallas retina.
 * TODO: subir el límite cuando lleguen las fotos en alta.
 */
export function PortraitPhoto({ className, priority = false, sizes = "240px" }: PortraitPhotoProps) {
  return (
    <div className={cn("relative w-full overflow-hidden bg-line", className)}>
      <Image
        src={siteConfig.portrait.src}
        alt={siteConfig.portrait.alt}
        fill
        preload={priority}
        sizes={sizes}
        className="object-cover object-[50%_20%] contrast-[1.03] grayscale"
      />
    </div>
  );
}
