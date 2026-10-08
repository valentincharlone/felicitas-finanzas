"use server";

import { sendLeadNotification } from "@/lib/email/lead-notification";
import { getSupabaseAdmin } from "@/lib/supabase/admin-client";
import { leadSchema } from "@/lib/validations/lead-schema";

export type SubmitLeadResult =
  | { ok: true; firstName: string }
  | { ok: false; error: string };

const GENERIC_ERROR =
  "No pudimos enviar el formulario. Probá de nuevo en unos minutos o escribime por Instagram.";

/**
 * Recibe el formulario de captación.
 * Es un endpoint público: valida todo de nuevo y devuelve solo lo que la UI necesita.
 */
export async function submitLead(input: unknown): Promise<SubmitLeadResult> {
  const parsed = leadSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, error: "Revisá los datos del formulario." };
  }

  const { website, ...lead } = parsed.data;
  const firstName = lead.fullName.split(" ")[0];

  // Honeypot completado: es un bot. Respondemos OK para no darle pistas.
  if (website) return { ok: true, firstName };

  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { error } = await supabase.from("leads").insert({
      client_type: lead.clientType,
      experience: lead.experience,
      goals: lead.goals,
      amount: lead.amount,
      message: lead.message || null,
      full_name: lead.fullName,
      email: lead.email,
      phone: lead.phone,
      source: lead.source ?? null,
    });

    if (error) {
      console.error("[lead] Error guardando en Supabase:", error.message);
      return { ok: false, error: GENERIC_ERROR };
    }
  } else {
    console.info("[lead] Supabase no configurado. Lead recibido:", lead);
  }

  // Supabase es opcional: sin él, el mail es el único registro de la consulta.
  // Si el lead quedó guardado, un fallo del mail no se le muestra al usuario;
  // si no, le pedimos que reintente para no perder la consulta en silencio.
  try {
    await sendLeadNotification(lead);
  } catch (err) {
    console.error("[lead] Error enviando el aviso:", err);
    if (!supabase) return { ok: false, error: GENERIC_ERROR };
  }

  return { ok: true, firstName };
}
