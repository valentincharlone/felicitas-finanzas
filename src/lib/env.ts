import "server-only";

/**
 * Variables de entorno del servidor.
 * Son opcionales a propósito: sin ellas el form funciona igual (loguea el lead),
 * así se puede mostrar el sitio antes de tener Supabase y Resend configurados.
 */
export const serverEnv = {
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  resendApiKey: process.env.RESEND_API_KEY,
  leadNotifyEmail: process.env.LEAD_NOTIFY_EMAIL,
  leadFromEmail:
    process.env.LEAD_FROM_EMAIL ?? "Formulario web <onboarding@resend.dev>",
};

export const isSupabaseConfigured = Boolean(
  serverEnv.supabaseUrl && serverEnv.supabaseServiceRoleKey,
);

export const isEmailConfigured = Boolean(
  serverEnv.resendApiKey && serverEnv.leadNotifyEmail,
);
