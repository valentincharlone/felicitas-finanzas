"use client";

import { useFormContext } from "react-hook-form";

import { FieldError } from "@/components/lead-form/field-error";
import { OptionCard } from "@/components/lead-form/option-card";
import { clientTypeOptions, experienceOptions } from "@/content/lead-options";
import type { LeadInput } from "@/lib/validations/lead-schema";

export function ProfileStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<LeadInput>();

  return (
    <>
      <fieldset className="mb-7">
        <legend className="mb-3 font-semibold">
          ¿Para quién es el asesoramiento?
        </legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {clientTypeOptions.map((o) => (
            <OptionCard
              key={o.value}
              type="radio"
              value={o.value}
              label={o.label}
              hint={o.hint}
              {...register("clientType")}
            />
          ))}
        </div>
        <FieldError message={errors.clientType?.message} />
      </fieldset>

      <fieldset className="mb-7">
        <legend className="mb-3 font-semibold">
          ¿Cuánta experiencia tenés invirtiendo?
        </legend>
        <div className="grid gap-2.5">
          {experienceOptions.map((o) => (
            <OptionCard
              key={o.value}
              type="radio"
              value={o.value}
              label={o.label}
              hint={o.hint}
              {...register("experience")}
            />
          ))}
        </div>
        <FieldError message={errors.experience?.message} />
      </fieldset>
    </>
  );
}
