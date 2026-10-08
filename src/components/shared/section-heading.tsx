import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id: string;
  title: string;
  intro?: string;
  className?: string;
};

export function SectionHeading({ id, title, intro, className }: SectionHeadingProps) {
  return (
    <div className={className}>
      <h2
        id={id}
        className="mb-5 max-w-[18ch] font-serif text-[clamp(38px,4.6vw,60px)] leading-[1.02] tracking-[-0.02em]"
      >
        {title}
      </h2>
      {intro && <p className={cn("max-w-[58ch] text-lg text-ink-soft")}>{intro}</p>}
    </div>
  );
}
