import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { isSupabaseConfigured, serverEnv } from "@/lib/env";

let client: SupabaseClient | null = null;

/**
 * Cliente con service role: SOLO se usa del lado del servidor.
 * La tabla `leads` tiene RLS activado sin políticas públicas,
 * así que nadie puede leerla ni escribirla desde el navegador.
 */
export function getSupabaseAdmin() {
  if (!isSupabaseConfigured) return null;

  client ??= createClient(serverEnv.supabaseUrl!, serverEnv.supabaseServiceRoleKey!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return client;
}
