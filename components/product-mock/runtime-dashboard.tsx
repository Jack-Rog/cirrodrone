import { AlertTriangle, CircleGauge, MapPinned, PlayCircle, Radio } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { MockApp } from "@/lib/types";
import { cn } from "@/lib/utils";

function runtimeStatsFor(app: MockApp) {
  const baseDuration =
    app.category === "survey" ? "22m" : app.category === "agriculture" ? "14m" : "12m";
  const baseArea =
    app.category === "agriculture"
      ? "18 rows"
      : app.category === "operations"
        ? "3 sectors"
        : "1.5 acres";

  return [
    {
      label: "Estimated duration",
      value: baseDuration,
      detail: app.controlStyle === "continuous" ? "live route monitoring" : "guided launch path",
      icon: CircleGauge,
    },
    {
      label: "Area covered",
      value: baseArea,
      detail: app.workflowSummary,
      icon: MapPinned,
    },
    {
      label: "Hardware status",
      value: app.firmware,
      detail: "connected through the Cirro bridge preview",
      icon: Radio,
    },
  ];
}

export function RuntimeDashboardMock({
  app,
  compact = false,
}: {
  app: MockApp;
  compact?: boolean;
}) {
  const stats = runtimeStatsFor(app);

  return (
    <div
      className={cn(
        "surface-panel overflow-hidden rounded-[2.2rem] p-5 sm:p-6",
        compact && "rounded-[2rem] p-4"
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="rounded-full bg-secondary text-secondary-foreground">
              Concept preview
            </Badge>
            <Badge className="rounded-full" variant="outline">
              Runtime dashboard
            </Badge>
          </div>
          <h3 className="mt-4 font-display text-3xl font-extrabold tracking-[-0.04em] text-balance">
            Launching {app.title}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Plausible for demos, clearly mocked for validation. This route review
            surface borrows from the stitched mission-control screens instead of
            the older generic dashboard.
          </p>
        </div>

        <div className="rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm text-muted-foreground">
          Mission configuration
        </div>
      </div>

      <div className={cn("mt-6 grid gap-6", compact ? "xl:grid-cols-[1.04fr_0.96fr]" : "xl:grid-cols-[1.18fr_0.82fr]")}>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(135deg,#0f2740_0%,#12385b_28%,#87b7d6_100%)] p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_16%,rgba(255,255,255,0.25),transparent_14%),radial-gradient(circle_at_72%_24%,rgba(255,255,255,0.14),transparent_18%)]" />
          <div className="relative h-full min-h-[22rem] overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
            <div className="absolute left-5 top-5 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-slate-700 uppercase">
              37.7749° N, 122.4194° W
            </div>
            <div className="absolute right-5 top-5 flex max-w-[18rem] gap-3 rounded-[1.35rem] bg-white/92 p-4 text-slate-700 shadow-xl">
              <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                <AlertTriangle className="size-5" />
              </div>
              <div>
                <p className="font-display text-base font-extrabold tracking-tight">Wind alert</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Crosswinds detected near waypoint 3. Battery drain may increase.
                </p>
              </div>
            </div>

            <div className="absolute left-[14%] top-[24%] h-3 w-3 rounded-full bg-sky-300 shadow-[0_0_0_8px_rgba(125,211,252,0.18)]" />
            <div className="absolute left-[70%] top-[78%] h-4 w-4 rounded-full bg-rose-400 shadow-[0_0_0_10px_rgba(248,113,113,0.16)]" />

            <div className="absolute left-[12%] top-[28%] h-[34%] w-[34%] rounded-[2rem] border-2 border-dashed border-sky-300/45" />
            <div className="absolute left-[28%] top-[46%] h-[28%] w-[42%] rounded-[2rem] border-2 border-dashed border-sky-300/45" />
            <div className="absolute left-[18%] top-[44%] h-px w-[52%] border-t-2 border-dashed border-sky-300/45" />

            <div className="absolute left-5 bottom-5 flex gap-3">
              <div className="rounded-[1.2rem] border border-white/12 bg-white/85 p-4 text-slate-700">
                <p className="text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase">
                  Flight mode
                </p>
                <p className="mt-2 font-display text-xl font-extrabold tracking-tight">
                  {app.controlStyle}
                </p>
              </div>
              <div className="rounded-[1.2rem] border border-white/12 bg-white/85 p-4 text-slate-700">
                <p className="text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase">
                  Output rail
                </p>
                <p className="mt-2 font-display text-xl font-extrabold tracking-tight">
                  {app.outputPanelTitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                className={cn(
                  "rounded-[1.8rem] border border-white/70 bg-white/76 p-5",
                  index === stats.length - 1 && "primary-gradient text-primary-foreground"
                )}
                key={stat.label}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "flex size-11 shrink-0 items-center justify-center rounded-2xl bg-secondary/80 text-secondary-foreground",
                      index === stats.length - 1 && "bg-white/12 text-primary-foreground"
                    )}
                  >
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <p
                      className={cn(
                        "text-xs font-semibold tracking-[0.18em] uppercase",
                        index === stats.length - 1
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      )}
                    >
                      {stat.label}
                    </p>
                    <p className="mt-2 font-display text-3xl font-extrabold tracking-[-0.04em]">
                      {stat.value}
                    </p>
                    <p
                      className={cn(
                        "mt-2 text-sm leading-6",
                        index === stats.length - 1
                          ? "text-primary-foreground/78"
                          : "text-muted-foreground"
                      )}
                    >
                      {stat.detail}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          <button className="primary-gradient flex h-14 cursor-pointer items-center justify-center gap-3 rounded-[1.35rem] font-display text-lg font-extrabold tracking-tight text-primary-foreground shadow-[0_22px_40px_-28px_rgba(34,88,118,0.9)] transition-transform duration-200 active:scale-[0.99]">
            Run Mission
            <PlayCircle className="size-5" />
          </button>
          <button className="flex h-14 cursor-pointer items-center justify-center rounded-[1.35rem] border border-white/70 bg-white/76 font-display text-base font-bold tracking-tight text-foreground transition-colors duration-200 hover:bg-white">
            Edit Path
          </button>

          {!compact ? (
            <div className="flex items-center justify-between px-2 pt-2 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
              <span>Mission review</span>
              <span>Version 2.4.1 stable</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
