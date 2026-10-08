"use client";

import { useEffect, useRef } from "react";
import { CheckIcon } from "lucide-react";

import { leadContent, siteConfig } from "@/content/site-content";

export function LeadSuccess({ firstName }: { firstName: string }) {
  const ref = useRef<HTMLDivElement>(null);

  // Al terminar, centramos el mensaje (en mobile el form queda largo).
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <div ref={ref} aria-live="polite" className="animate-in fade-in-0 slide-in-from-right-3 duration-300">
      <div className="mb-6 grid size-16 place-items-center rounded-full bg-brand-lime text-brand-green-deep">
        <CheckIcon className="size-8" strokeWidth={2.5} />
      </div>
      <h3 className="mb-4 font-serif text-[34px] leading-tight">{leadContent.success.title(firstName)}</h3>
      <p className="mb-3 text-ink-soft">{leadContent.success.body}</p>
      <p className="text-ink-soft">
        Mientras tanto, podés seguirme en{" "}
        <a href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer" className="font-medium text-ink underline">
          Instagram
        </a>
        .
      </p>
    </div>
  );
}
