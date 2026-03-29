import Link from "next/link";
import { ArrowRight, GitBranchPlus, PlayCircle, ShieldCheck, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/lib/button-styles";
import { featuredApps } from "@/lib/mock-data/apps";
import { cn } from "@/lib/utils";

const previewSteps = [
  {
    icon: GitBranchPlus,
    title: "Bring the repo",
    body: "Start with the workflow that already works.",
  },
  {
    icon: ShieldCheck,
    title: "Package the handoff",
    body: "Show compatibility, mission fit, and guidance.",
  },
  {
    icon: PlayCircle,
    title: "Launch through Cirro",
    body: "Give operators one calmer path to run it.",
  },
];

export function HeroProductPreview() {
  const leadApp = featuredApps[0];

  return (
    <div className="relative">
      <div className="surface-panel surface-panel-dark overflow-hidden rounded-[2rem] p-5 sm:p-6">
        <div className="flex flex-col gap-4 border-b border-border/70 pb-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="space-y-3">
            <Badge className="rounded-full bg-secondary text-secondary-foreground">
              <Sparkles className="size-3" />
              Product concept
            </Badge>
            <div className="space-y-2">
              <h3 className="font-display text-2xl font-semibold tracking-tight">
                App library to launch flow
              </h3>
              <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                One clean app surface for developers to package software and hand it
                off to operators.
              </p>
            </div>
          </div>

          <Link
            className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
            href="/product/app-library"
          >
            Explore the library
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-5 grid gap-4">
          <div className="rounded-[1.7rem] border border-border/70 bg-[linear-gradient(140deg,rgba(15,125,182,0.12),rgba(255,255,255,0.85))] p-5 dark:bg-[linear-gradient(140deg,rgba(56,189,248,0.16),rgba(12,30,44,0.92))]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                  Featured app concept
                </p>
                <h4 className="font-display text-3xl font-semibold tracking-tight text-balance">
                  {leadApp.title}
                </h4>
                <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                  {leadApp.oneLineValueProp}
                </p>
              </div>

              <Badge className="rounded-full bg-background/80 text-foreground" variant="outline">
                {leadApp.readyLabel}
              </Badge>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {leadApp.tags.slice(0, 3).map((tagId) => (
                <Badge className="rounded-full bg-background/80 text-foreground" key={tagId} variant="outline">
                  {tagId.replaceAll("-", " ")}
                </Badge>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.25rem] border border-border/70 bg-background/75 px-4 py-4">
                <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  Developer value
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">
                  Package the workflow once instead of rewriting the story for every
                  prospect.
                </p>
              </div>
              <div className="rounded-[1.25rem] border border-border/70 bg-background/75 px-4 py-4">
                <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  Operator outcome
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">
                  Understand mission fit and launch steps before touching setup docs.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {previewSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  className="rounded-[1.4rem] border border-border/70 bg-background/75 p-4"
                  key={step.title}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </div>
                    <span className="font-display text-sm font-semibold tracking-[0.22em] text-muted-foreground uppercase">
                      0{index + 1}
                    </span>
                  </div>
                  <h5 className="mt-4 font-display text-xl font-semibold tracking-tight">
                    {step.title}
                  </h5>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
