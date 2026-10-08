# felicitas-finanzas

Landing de captación para Felicitas Valenzuela (@felicitas.finanzas).
Next.js 16 · React 19 · Tailwind v4 · shadcn/ui · react-hook-form + zod · Supabase · Resend.

## Arrancar

```bash
npm install
cp .env.example .env.local   # opcional: sin variables el form funciona y loguea en consola
npm run dev
```

## Estructura

```
src/
├── app/
│   ├── layout.tsx            # fuentes (Instrument Serif + Figtree), metadata
│   ├── page.tsx              # arma la página con las secciones + JSON-LD
│   ├── globals.css           # paleta de marca + tokens de shadcn (Tailwind v4)
│   ├── opengraph-image.tsx   # imagen al compartir el link (se genera en el build)
│   ├── icon.svg              # favicon
│   ├── robots.ts, sitemap.ts
│   └── api/keep-alive/       # cron diario para que Supabase gratis no se pause
├── actions/
│   └── submit-lead.ts        # server action: valida, guarda en Supabase, avisa por mail
├── components/
│   ├── layout/               # site-header, site-footer
│   ├── sections/             # hero, situations, services, about, process, lead
│   ├── lead-form/            # formulario multi-paso
│   │   ├── lead-form.tsx     # estado de pasos + submit
│   │   ├── steps/            # profile-step, goals-step, contact-step
│   │   └── option-card.tsx   # radio/checkbox con estilo de tarjeta
│   ├── shared/               # container, section-heading, portrait-photo, structured-data
│   └── ui/                   # shadcn/ui (button, input, textarea, label, select)
├── content/
│   ├── site-content.ts       # TODO el copy del sitio
│   └── lead-options.ts       # opciones del formulario (montos, objetivos…)
└── lib/
    ├── validations/lead-schema.ts   # schema zod compartido cliente/servidor
    ├── supabase/admin-client.ts     # cliente service role (solo servidor)
    ├── email/lead-notification.ts   # mail de aviso con Resend
    ├── site-url.ts                  # URL pública (Vercel hasta el lanzamiento)
    └── env.ts
supabase/schema.sql           # tabla `leads` con RLS
```

**Para cambiar textos:** `src/content/site-content.ts`.
**Para lanzar:** `siteConfig.launched = true` en ese mismo archivo (saca el noindex y usa el dominio final).
**Para cambiar rangos de monto u objetivos:** `src/content/lead-options.ts` (el schema se actualiza solo).

## Supabase (opcional)

Sin estas variables el formulario funciona solo con Resend: el mail es el único registro
de cada consulta, y si el envío falla el visitante ve un error para reintentar.
Con Supabase, además queda guardada en la tabla `leads` como respaldo.
En el plan gratis el proyecto se pausa tras 7 días sin actividad: para evitarlo, el cron
diario de `vercel.json` llama a `/api/keep-alive`, que hace una consulta mínima a la tabla.
Necesita la variable `CRON_SECRET` en Vercel (sin ella el endpoint responde 401 y el cron no hace nada).
Se puede revisar en Vercel > Settings > Cron Jobs > View Logs.

1. Crear proyecto y correr `supabase/schema.sql` en el SQL Editor.
2. Copiar `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` (Settings > API) a `.env.local` y a Vercel.

La tabla tiene RLS sin políticas: solo el servidor (service role) puede leer o escribir.

## Resend

1. Crear API key y cargar `RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL` (el mail de Feli).
2. Mientras no se verifique el dominio, el remitente es `onboarding@resend.dev`
   (solo puede mandar al mail de la cuenta de Resend). Con el dominio verificado,
   cambiar `LEAD_FROM_EMAIL` a algo como `Web <web@felicitasfinanzas.com>`.

## Pendientes con Feli

- [ ] Fotos (hero y sobre mí): reemplazar `PortraitPlaceholder` por `next/image`.
- [ ] Rangos de monto (`lead-options.ts`).
- [ ] Validar los 4 pasos del proceso.
- [ ] Testimonios (con permiso).
- [ ] Nombrar o no a CMA / Inversiones Lascano.
- [ ] Favicon y OG image.
- [ ] Dominio `felicitasfinanzas.com` a su nombre.

## Shadcn

`components.json` ya está configurado: `npx shadcn@latest add <componente>` agrega más.
