import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  body,
  actions,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  body: string;
  actions?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "space-y-4",
        align === "center" && "mx-auto max-w-3xl text-center"
      )}
    >
      <span className="section-kicker">{eyebrow}</span>
      <div className="space-y-3">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          {body}
        </p>
      </div>
      {actions}
    </div>
  );
}
