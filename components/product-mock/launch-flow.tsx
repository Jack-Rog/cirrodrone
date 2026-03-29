import { CheckCircle2, CircleDashed, PlayCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { LaunchState } from "@/lib/types";
import { cn } from "@/lib/utils";

const stateIcon = {
  complete: CheckCircle2,
  current: PlayCircle,
  upcoming: CircleDashed,
};

export function LaunchFlowRail({ steps }: { steps: LaunchState[] }) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const Icon = stateIcon[step.status];
        return (
          <div className="flex gap-4" key={step.id}>
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "mt-1 flex size-8 items-center justify-center rounded-full border",
                  step.status === "complete" &&
                    "border-emerald-200 bg-emerald-100 text-emerald-700 dark:border-emerald-500/25 dark:bg-emerald-500/15 dark:text-emerald-200",
                  step.status === "current" &&
                    "border-sky-200 bg-sky-100 text-sky-700 dark:border-sky-500/25 dark:bg-sky-500/15 dark:text-sky-200",
                  step.status === "upcoming" &&
                    "border-border bg-muted/70 text-muted-foreground"
                )}
              >
                <Icon className="size-4" />
              </span>
              {index < steps.length - 1 ? (
                <span className="mt-2 h-full w-px bg-border/80" />
              ) : null}
            </div>
            <div className="space-y-2 pb-4">
              <div className="flex items-center gap-2">
                <p className="font-medium text-foreground">{step.label}</p>
                <Badge className="rounded-full" variant="outline">
                  {step.status}
                </Badge>
              </div>
              <p className="max-w-md text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
