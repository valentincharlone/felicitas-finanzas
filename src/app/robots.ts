import type { MetadataRoute } from "next";

import { siteConfig } from "@/content/site-content";
import { getSiteUrl } from "@/lib/site-url";

/**
 * Dejamos rastrear siempre (los previews de WhatsApp/Instagram leen la página);
 * antes del lanzamiento la indexación se frena con el meta noindex del layout.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/hero-lab", "/situaciones-lab", "/servicios-lab", "/sobre-mi-lab", "/como-funciona-lab", "/formulario-lab", "/footer-lab", "/header-lab", "/api/"] },
    sitemap: siteConfig.launched ? `${getSiteUrl()}/sitemap.xml` : undefined,
  };
}
