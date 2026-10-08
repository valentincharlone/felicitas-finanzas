import { siteConfig } from "@/content/site-content";

/**
 * URL pública del sitio. Antes del lanzamiento el dominio final no existe,
 * así que usamos el de producción de Vercel (variable de sistema) o localhost.
 */
export function getSiteUrl() {
  if (siteConfig.launched) return siteConfig.url;
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000";
}
