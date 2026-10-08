"use client";

import { Controller, useFormContext } from "react-hook-form";

import { FieldError } from "@/components/lead-form/field-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sourceOptions } from "@/content/lead-options";
import type { LeadInput } from "@/lib/validations/lead-schema";

export function ContactStep() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<LeadInput>();

  return (
    <>
      <div className="mb-5">
        <Label htmlFor="fullName" className="mb-3">
          Nombre y apellido
        </Label>
        <Input id="fullName" autoComplete="name" aria-invalid={!!errors.fullName} {...register("fullName")} />
        <FieldError message={errors.fullName?.message} />
      </div>

      <div className="grid gap-x-4 sm:grid-cols-2">
        <div className="mb-5">
          <Label htmlFor="email" className="mb-3">
            Email
          </Label>
          <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
          <FieldError message={errors.email?.message} />
        </div>
        <div className="mb-5">
          <Label htmlFor="phone" className="mb-3">
            WhatsApp
          </Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+54 9 11 ..."
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          <FieldError message={errors.phone?.message} />
        </div>
      </div>

      <div className="mb-7">
        <Label htmlFor="source" className="mb-3">
          ¿Cómo me conociste?
        </Label>
        <Controller
          control={control}
          name="source"
          render={({ field }) => (
            <Select value={field.value ?? ""} onValueChange={field.onChange}>
              <SelectTrigger id="source" onBlur={field.onBlur}>
                <SelectValue placeholder="Elegí una opción" />
              </SelectTrigger>
              <SelectContent>
                {sourceOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Honeypot: oculto para personas, los bots lo completan. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">No completar</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
    </>
  );
}
