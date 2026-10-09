import { cn } from "@/lib/utils";

type OptionCardProps = Omit<React.ComponentProps<"input">, "type"> & {
  type: "radio" | "checkbox";
  label: string;
  hint?: string;
  shape?: "card" | "pill";
};

/**
 * Radio o checkbox nativo con estilo de tarjeta.
 * Funciona directo con `register()` de react-hook-form.
 */
export function OptionCard({
  label,
  hint,
  shape = "card",
  className,
  ...inputProps
}: OptionCardProps) {
  return (
    <label className={cn("group relative block cursor-pointer", className)}>
      <input {...inputProps} className="peer sr-only" />
      <span
        className={cn(
          "block border-[1.5px] border-line leading-snug transition-colors",
          "group-hover:border-ink-soft peer-checked:border-brand-green peer-checked:bg-brand-green/[0.07]",
          "peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring",
          // Píldora: radio fijo (media altura de una línea) en vez de rounded-full, para que una
          // etiqueta que ocupa dos líneas en el celular no se deforme en óvalo.
          shape === "card"
            ? "rounded-control px-4 py-3.5 text-base"
            : "rounded-[23px] px-4 py-2.5 text-[15px]",
        )}
      >
        {label}
        {hint && (
          <span className="mt-0.5 block text-sm text-ink-soft">{hint}</span>
        )}
      </span>
    </label>
  );
}
