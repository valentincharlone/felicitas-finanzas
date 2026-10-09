"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { submitLead } from "@/actions/submit-lead";
import { FormProgress } from "@/components/lead-form/form-progress";
import { LeadSuccess } from "@/components/lead-form/lead-success";
import { ContactStep } from "@/components/lead-form/steps/contact-step";
import { GoalsStep } from "@/components/lead-form/steps/goals-step";
import { ProfileStep } from "@/components/lead-form/steps/profile-step";
import { Button } from "@/components/ui/button";
import { leadSchema, STEP_FIELDS, type LeadInput } from "@/lib/validations/lead-schema";

const STEPS = [
  { title: "Sobre vos", Component: ProfileStep },
  { title: "Tu objetivo", Component: GoalsStep },
  { title: "¿Cómo te contacto?", Component: ContactStep },
] as const;

export function LeadForm() {
  const [step, setStep] = useState(0);
  const [successName, setSuccessName] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    mode: "onTouched",
    defaultValues: { goals: [], message: "", fullName: "", email: "", phone: "", website: "" },
  });

  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  // Solo después de "Siguiente" o "Volver": en la carga inicial no hay que mover nada.
  const stepChanged = useRef(false);

  const isLast = step === STEPS.length - 1;
  const { title, Component } = STEPS[step];

  // Al cambiar de paso: si el principio del form quedó arriba, fuera de la pantalla (pasa en el
  // celular, donde hay que bajar para llegar a "Siguiente"), lo traemos de vuelta para empezar
  // el paso desde arriba. El foco va al título para que los lectores de pantalla anuncien el paso.
  useEffect(() => {
    if (!stepChanged.current) return;
    stepChanged.current = false;
    titleRef.current?.focus({ preventScroll: true });

    const card = cardRef.current;
    if (!card) return;
    const headerHeight = document.querySelector("header")?.offsetHeight ?? 0;
    const top = card.getBoundingClientRect().top;
    // Sin behavior explícito: usa el scroll suave del CSS, que se apaga con reduced motion.
    if (top < headerHeight) window.scrollTo({ top: window.scrollY + top - headerHeight - 16 });
  }, [step]);

  async function goNext() {
    const valid = await form.trigger([...STEP_FIELDS[step]], { shouldFocus: true });
    if (valid) {
      stepChanged.current = true;
      setStep((s) => s + 1);
    }
  }

  function goBack() {
    setServerError(null);
    stepChanged.current = true;
    setStep((s) => s - 1);
  }

  const onSubmit = form.handleSubmit((values) => {
    setServerError(null);
    startTransition(async () => {
      const result = await submitLead(values);
      if (result.ok) {
        setSuccessName(result.firstName);
      } else {
        setServerError(result.error);
      }
    });
  });

  return (
    <div ref={cardRef} className="rounded-container bg-surface p-6 text-ink sm:p-10">
      <FormProgress current={successName ? STEPS.length : step} total={STEPS.length} />

      {successName ? (
        <LeadSuccess firstName={successName} />
      ) : (
        <FormProvider {...form}>
          <form
            onSubmit={onSubmit}
            onKeyDown={(e) => {
              // Enter en un paso intermedio avanza en vez de enviar todo.
              const isTextarea = (e.target as HTMLElement).tagName === "TEXTAREA";
              if (e.key === "Enter" && !isLast && !isTextarea) {
                e.preventDefault();
                void goNext();
              }
            }}
            noValidate
            className="relative"
          >
            <div key={step} className="animate-in fade-in-0 slide-in-from-right-3 duration-300 motion-reduce:animate-none">
              <p className="mb-1 text-sm text-ink-soft">
                Paso {step + 1} de {STEPS.length}
              </p>
              <h3 ref={titleRef} tabIndex={-1} className="mb-7 font-serif text-[34px] leading-tight outline-none">
                {title}
              </h3>
              <Component />
            </div>

            {serverError && (
              <p role="alert" className="mb-4 text-sm text-destructive">
                {serverError}
              </p>
            )}

            <div className="flex items-center justify-between gap-4">
              {step > 0 ? (
                <Button type="button" variant="ghost" className="px-0" onClick={goBack}>
                  Volver
                </Button>
              ) : (
                <span />
              )}

              {/* Keys distintas: si React reutiliza el mismo <button> y le cambia el type a
                  "submit" durante el click de "Siguiente", el navegador envía el form. */}
              {isLast ? (
                <Button key="submit" type="submit" disabled={isPending}>
                  {isPending ? "Enviando…" : "Enviar mis respuestas"}
                </Button>
              ) : (
                <Button key="next" type="button" onClick={goNext}>
                  Siguiente
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  );
}
