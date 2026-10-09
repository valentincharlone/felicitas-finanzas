import { cn } from "@/lib/utils";

export function FormProgress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="mb-7 flex gap-2" aria-hidden>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-1 flex-1 rounded transition-colors duration-300",
            i <= current ? "bg-brand-green" : "bg-line",
          )}
        />
      ))}
    </div>
  );
}
