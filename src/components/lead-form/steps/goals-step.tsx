"use client";

import { useFormContext } from "react-hook-form";

import { FieldError } from "@/components/lead-form/field-error";
import { OptionCard } from "@/components/lead-form/option-card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { amountOptions, goalOptions } from "@/content/lead-options";
import type { LeadInput } from "@/lib/validations/lead-schema";

export function GoalsStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<LeadInput>();

  return (
    <>
      <fieldset className="mb-7">
        <legend className="mb-3 font-semibold">
          ¿Qué te gustaría resolver?{" "}
          <span className="font-normal text-ink-soft">Podés elegir varias</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {goalOptions.map((o) => (
            <OptionCard
              key={o.value}
              type="checkbox"
              shape="pill"
              value={o.value}
              label={o.label}
              {...register("goals")}
            />
          ))}
        </div>
        <FieldError message={errors.goals?.message} />
      </fieldset>

      <fieldset className="mb-7">
        <legend className="mb-3 font-semibold">¿Cuánto pensás invertir?</legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {amountOptions.map((o) => (
            <OptionCard
              key={o.value}
              type="radio"
              value={o.value}
              label={o.label}
              {...register("amount")}
            />
          ))}
        </div>
        <FieldError message={errors.amount?.message} />
      </fieldset>

      <div className="mb-7">
        <Label htmlFor="message" className="mb-3">
          Contame tu situación{" "}
          <span className="font-normal text-ink-soft">(opcional)</span>
        </Label>
        <Textarea
          id="message"
          placeholder="Por ejemplo: tengo unos ahorros en dólares y no sé si conviene invertirlos acá o afuera."
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        <FieldError message={errors.message?.message} />
      </div>
    </>
  );
}
