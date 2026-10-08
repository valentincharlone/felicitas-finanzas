import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { cacheLife } from "next/cache";
import { ImageResponse } from "next/og";

import { heroContent, siteConfig } from "@/content/site-content";

// Imagen para compartir el link (WhatsApp, Instagram, LinkedIn). Next la agrega sola al <head>.
export const alt = `${siteConfig.name}: ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const colors = { paper: "#f2f5f1", ink: "#10231e", inkSoft: "#4a5e57", green: "#0b4a3c", line: "#d5dfda" };

/**
 * Baja la fuente de Google Fonts en el build. Sin user-agent, Google devuelve TTF
 * (ImageResponse no lee woff2). Si falla, la imagen sale con la fuente por defecto.
 */
async function loadGoogleFont(family: string) {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

/**
 * Con Cache Components, un fetch al cargar el módulo traba el prerender del build.
 * Cacheado con "use cache", la imagen se sigue generando estática en el build.
 */
async function loadAssets() {
  "use cache";
  cacheLife("max");
  const [serif, sans, photo] = await Promise.all([
    loadGoogleFont("Instrument+Serif"),
    loadGoogleFont("Figtree:wght@500"),
    readFile(join(process.cwd(), "public", siteConfig.portraitBeach.src)),
  ]);
  return { serif, sans, photoSrc: `data:image/png;base64,${photo.toString("base64")}` };
}

export default async function OpengraphImage() {
  const { serif, sans, photoSrc } = await loadAssets();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: colors.paper,
          color: colors.ink,
          fontFamily: "Figtree",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse solo acepta <img> */}
          <img src={photoSrc} width={132} height={132} style={{ borderRadius: 999, objectFit: "cover" }} alt="" />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 34 }}>{siteConfig.name}</div>
            <div style={{ fontSize: 26, color: colors.inkSoft }}>{heroContent.byline}</div>
          </div>
        </div>

        <div style={{ display: "flex", fontFamily: "Instrument Serif", fontSize: 76, lineHeight: 1.02, maxWidth: 1000 }}>
          {siteConfig.tagline}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `1px solid ${colors.line}`,
            paddingTop: 24,
            fontSize: 24,
            color: colors.inkSoft,
          }}
        >
          <div style={{ display: "flex" }}>Asesoría para personas y empresas · Argentina y EE.UU.</div>
          <div style={{ display: "flex", color: colors.green }}>
            {siteConfig.cnv.role} CNV N° {siteConfig.cnv.number}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        ...(serif ? [{ name: "Instrument Serif", data: serif, style: "normal" as const, weight: 400 as const }] : []),
        ...(sans ? [{ name: "Figtree", data: sans, style: "normal" as const, weight: 500 as const }] : []),
      ],
    },
  );
}
