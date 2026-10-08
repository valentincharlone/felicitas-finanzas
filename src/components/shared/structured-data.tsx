import { siteConfig } from "@/content/site-content";
import { getSiteUrl } from "@/lib/site-url";

/**
 * JSON-LD para buscadores: Feli como persona y su servicio de asesoría.
 * Solo datos confirmados (relevamiento + registro CNV). Sin precios ni reseñas.
 */
export function StructuredData() {
  const url = getSiteUrl();
  const person = {
    "@type": "Person",
    "@id": `${url}/#felicitas`,
    name: siteConfig.name,
    jobTitle: "Asesora financiera",
    image: `${url}${siteConfig.portraitBeach.src}`,
    alumniOf: { "@type": "CollegeOrUniversity", name: "Universidad Austral" },
    sameAs: [siteConfig.links.instagram, siteConfig.links.linkedin],
  };
  const service = {
    "@type": "ProfessionalService",
    "@id": `${url}/#asesoria`,
    name: `${siteConfig.name} · Asesoría financiera`,
    description: siteConfig.description,
    url,
    image: `${url}/opengraph-image`,
    founder: { "@id": person["@id"] },
    address: { "@type": "PostalAddress", addressLocality: "Buenos Aires", addressCountry: "AR" },
    // Atiende en Argentina; EE.UU. es donde invierte (está en la descripción), no zona de atención.
    areaServed: { "@type": "Country", name: "Argentina" },
    knowsAbout: ["Inversiones", "Planificación financiera", "Gestión de tesorería", "Mercado de capitales"],
  };
  const jsonLd = { "@context": "https://schema.org", "@graph": [person, service] };

  return (
    <script
      type="application/ld+json"
      // Escapamos "<" como recomienda la guía de JSON-LD de Next (evita inyección de HTML).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
