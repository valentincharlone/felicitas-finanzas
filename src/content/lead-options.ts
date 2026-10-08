/**
 * Opciones del formulario de captación.
 * Los `value` se guardan en la base; los `label` son lo que ve el usuario.
 * El schema de validación se arma a partir de estos valores.
 */

export const CLIENT_TYPES = ["persona", "empresa"] as const;
export const EXPERIENCE_LEVELS = ["inicial", "intermedio", "avanzado"] as const;
export const GOALS = [
  "inflacion",
  "propiedad",
  "jubilacion",
  "orden",
  "tesoreria",
  "otro",
] as const;
// TODO(Feli): validar los rangos de monto con ella.
export const AMOUNT_RANGES = ["hasta-10k", "10k-50k", "50k-150k", "mas-150k"] as const;
export const LEAD_SOURCES = [
  "instagram",
  "linkedin",
  "neura",
  "recomendacion",
  "otro",
] as const;

export type ClientType = (typeof CLIENT_TYPES)[number];
export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];
export type Goal = (typeof GOALS)[number];
export type AmountRange = (typeof AMOUNT_RANGES)[number];
export type LeadSource = (typeof LEAD_SOURCES)[number];

export type Option<T extends string> = {
  value: T;
  label: string;
  hint?: string;
};

export const clientTypeOptions: Option<ClientType>[] = [
  { value: "persona", label: "Para mí", hint: "Inversiones personales" },
  { value: "empresa", label: "Para mi empresa", hint: "Tesorería y patrimonio" },
];

export const experienceOptions: Option<ExperienceLevel>[] = [
  { value: "inicial", label: "Recién empiezo", hint: "Nunca invertí o casi nada" },
  { value: "intermedio", label: "Algo sé", hint: "Tengo algunas inversiones" },
  { value: "avanzado", label: "Invierto hace años", hint: "Manejo varios instrumentos" },
];

export const goalOptions: Option<Goal>[] = [
  { value: "inflacion", label: "Que mi plata no pierda contra la inflación" },
  { value: "propiedad", label: "Vendí una propiedad" },
  { value: "jubilacion", label: "Planificar mi jubilación" },
  { value: "orden", label: "Ordenar mis finanzas" },
  { value: "tesoreria", label: "Hacer rendir la caja de la empresa" },
  { value: "otro", label: "Otra cosa" },
];

export const amountOptions: Option<AmountRange>[] = [
  { value: "hasta-10k", label: "Menos de USD 10.000" },
  { value: "10k-50k", label: "USD 10.000 a 50.000" },
  { value: "50k-150k", label: "USD 50.000 a 150.000" },
  { value: "mas-150k", label: "Más de USD 150.000" },
];

export const sourceOptions: Option<LeadSource>[] = [
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "neura", label: "Cash is King / Neura" },
  { value: "recomendacion", label: "Me recomendó alguien" },
  { value: "otro", label: "Otro" },
];

/** Busca el label de un value (para el mail de aviso). */
export function labelFor<T extends string>(options: Option<T>[], value: T | undefined) {
  return options.find((o) => o.value === value)?.label ?? value ?? "—";
}
