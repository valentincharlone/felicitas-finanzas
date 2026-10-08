import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site-url";

// Landing de una sola página. Sin lastModified: `new Date()` haría dinámica la ruta.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: getSiteUrl(), changeFrequency: "monthly", priority: 1 }];
}
