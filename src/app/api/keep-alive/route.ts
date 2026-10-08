import type { NextRequest } from "next/server";

import { getSupabaseAdmin } from "@/lib/supabase/admin-client";

/**
 * Cron diario de Vercel (ver vercel.json): hace una consulta mínima para que
 * el proyecto gratis de Supabase no se pause por 7 días sin actividad.
 * Vercel manda `Authorization: Bearer <CRON_SECRET>`; sin eso responde 401.
 * Leer los headers hace que se ejecute en cada request (no se prerenderiza).
 */
export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || request.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return Response.json({ ok: true, skipped: "supabase no configurado" });

  const { error } = await supabase.from("leads").select("id").limit(1);

  if (error) {
    console.error("[keep-alive] Error consultando Supabase:", error.message);
    return Response.json({ ok: false }, { status: 500 });
  }

  return Response.json({ ok: true });
}
