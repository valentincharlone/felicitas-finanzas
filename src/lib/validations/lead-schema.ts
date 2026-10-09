import { z } from "zod";

import {
  AMOUNT_RANGES,
  CLIENT_TYPES,
  EXPERIENCE_LEVELS,
  GOALS,
  LEAD_SOURCES,
} from "@/content/lead-options";

/**
 * Schema compartido entre el cliente (react-hook-form) y la server action.
 * El servidor siempre vuelve a validar: nunca confiar en lo que llega del navegador.
 */
export const leadSchema = z.object({
  // Paso 1
  clientType: z.enum(CLIENT_TYPES, {
    error: "Elegí si el asesoramiento es para vos o para tu empresa.",
  }),
  experience: z.enum(EXPERIENCE_LEVELS, {
    error: "Elegí tu nivel de experiencia.",
  }),

  // Paso 2
  goals: z
    .array(z.enum(GOALS), { error: "Elegí al menos un objetivo." })
    .min(1, { error: "Elegí al menos un objetivo." }),
  amount: z.enum(AMOUNT_RANGES, { error: "Elegí un rango de monto." }),
  message: z
    .string()
    .trim()
    .max(1000, { error: "Máximo 1000 caracteres." })
    .optional(),

  // Paso 3
  fullName: z
    .string()
    .trim()
    .min(3, { error: "Escribí tu nombre y apellido." })
    .max(120)
    // Evita que pongan el mail o el teléfono en este campo (llega como asunto del aviso).
    .refine((v) => !/[@\d]/.test(v), {
      error: "Escribí solo tu nombre y apellido (sin mail ni números).",
    }),
  email: z.email({ error: "Revisá el email: falta el @ o el dominio." }),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d\s()-]+$/, { error: "Usá solo números, espacios o +." })
    .refine((v) => v.replace(/\D/g, "").length >= 8, {
      error: "Revisá el WhatsApp: tiene que incluir código de área.",
    }),
  source: z.enum(LEAD_SOURCES).optional(),

  // Honeypot anti-spam: campo oculto que un humano nunca completa.
  website: z.string().max(0).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

/** Campos que valida cada paso antes de avanzar. */
export const STEP_FIELDS = [
  ["clientType", "experience"],
  ["goals", "amount", "message"],
  ["fullName", "email", "phone", "source"],
] as const satisfies ReadonlyArray<ReadonlyArray<keyof LeadInput>>;
