import Link from "next/link";
import { ArrowUpRight, Orbit, Play, Video } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { compatibilityTags, getCategoryBySlug } from "@/lib/mock-data/apps";
import type { CompatibilityTone, MockApp } from "@/lib/types";
import { cn } from "@/lib/utils";

const toneClasses: Record<CompatibilityTone, string> = {
  sky: "bg-[#d4e4f6] text-[#31414f]",
  slate: "bg-slate-200/85 text-slate-700",
  amber: "bg-[#f3e2d4] text-[#8b5d3b]",
  emerald: "bg-emerald-100 text-emerald-700",
};

const categoryVisuals = {
  inspection: {
    mediaClass:
      "bg-[linear-gradient(135deg,#d7ecfa_0%,#f9fbfd_44%,#d9e2ea_100%)]",
    glowClass: "bg-primary/15",
    featureTitle: "Automated capture",
    featureDetail: "Thermal overlays and repeatable inspection passes",
    chip: "Precision Tool",
  },
  agriculture: {
    mediaClass:
      "bg-[linear-gradient(135deg,#dbe7bf_0%,#f5f7ec_42%,#c7d48e_100%)]",
    glowClass: "bg-emerald-500/15",
    featureTitle: "Field intelligence",
    featureDetail: "Coverage health and anomaly clustering by block",
    chip: "Mission Ready",
  },
  survey: {
    mediaClass:
      "bg-[linear-gradient(135deg,#d8edf4_0%,#ffffff_38%,#bfd9ea_100%)]",
    glowClass: "bg-sky-500/15",
    featureTitle: "Live route logic",
    featureDetail: "Perimeter coverage with guided alert rails",
    chip: "Continuous View",
  },
  operations: {
    mediaClass:
      "bg-[linear-gradient(135deg,#dde0ea_0%,#f9fafc_42%,#c9cfdf_100%)]",
    glowClass: "bg-indigo-500/15",
    featureTitle: "Ops workflow",
    featureDetail: "Operator prompts, output checks, and launch rituals",
    chip: "Guided Run",
  },
} as const;

export function tagClassFor(tagId: string) {
  const tag = compatibilityTags.find((item) => item.id === tagId);
  return tag ? toneClasses[tag.tone] : toneClasses.slate;
}

export function getAppVisual(app: MockApp) {
  return categoryVisuals[app.category];
}

export function AppCard({
  app,
  active = false,
  href = `/product/app/${app.slug}`,
}: {
  app: MockApp;
  active?: boolean;
  href?: string;
}) {
  const category = getCategoryBySlug(app.category);
  const visual = getAppVisual(app);

  return (
    <Link className="block cursor-pointer" href={href}>
      <Card
        className={cn(
          "h-full overflow-hidden rounded-[2rem] py-0 transition-transform duration-300 hover:-translate-y-1",
          active && "ring-2 ring-primary/15"
        )}
      >
        <div className={cn("relative aspect-[4/3] overflow-hidden border-b border-white/70", visual.mediaClass)}>
          <div className={cn("absolute -right-10 -top-10 size-40 rounded-full blur-3xl", visual.glowClass)} />
          <div className="absolute inset-x-5 top-5 flex items-center justify-between gap-3">
            <Badge className="rounded-full bg-white/80 text-foreground shadow-sm">
              <Orbit className="size-3" />
              {category?.label}
            </Badge>
            <Badge className="rounded-full bg-primary/90 text-primary-foreground">
              {visual.chip}
            </Badge>
          </div>

          <div className="absolute inset-x-5 bottom-5 rounded-[1.5rem] border border-white/60 bg-white/55 p-4 glass-panel">
            <p className="text-[0.65rem] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
              {visual.featureTitle}
            </p>
            <p className="mt-2 font-display text-2xl font-extrabold tracking-tight text-foreground">
              {app.title}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {visual.featureDetail}
            </p>
          </div>
        </div>

        <CardHeader className="space-y-3 border-b border-white/70 py-5">
          <div className="flex items-center justify-between gap-4">
            <Badge className={cn("rounded-full", tagClassFor(app.tags[0] ?? ""))}>
              {app.readyLabel}
            </Badge>
            <ArrowUpRight className="size-4 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl">{app.title}</CardTitle>
            <CardDescription className="leading-6">{app.oneLineValueProp}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 py-5">
          <div className="flex flex-wrap gap-2">
            {app.tags.slice(0, 3).map((tagId) => {
              const tag = compatibilityTags.find((item) => item.id === tagId);
              return (
                <Badge className={cn("rounded-full", tagClassFor(tagId))} key={tagId}>
                  {tag?.label ?? tagId}
                </Badge>
              );
            })}
          </div>

          <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <div className="rounded-[1.35rem] bg-muted/70 p-3">
              <p className="font-medium text-foreground">Control style</p>
              <p className="mt-1 capitalize">{app.controlStyle}</p>
            </div>
            <div className="rounded-[1.35rem] bg-muted/70 p-3">
              <p className="font-medium text-foreground">Launch feel</p>
              <p className="mt-1 capitalize">{app.operatorComplexity}</p>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-[1.35rem] border border-white/70 bg-white/70 px-4 py-3 text-sm">
            <div>
              <p className="font-medium text-foreground">{app.firmware}</p>
              <p className="text-muted-foreground">{app.outputPanelTitle}</p>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              {app.usesVideo ? <Video className="size-4" /> : null}
              <Play className="size-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
