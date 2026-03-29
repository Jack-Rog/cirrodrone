import { ArrowRight, Compass, Layers3, ShieldCheck } from "lucide-react";

import { PilotShell } from "@/components/cirro/pilot-shell";
import { ButtonLink, CirroContainer, GlassPanel, ProgressRow, buttonStyles } from "@/components/cirro/shared";

const missionSteps = [
  { label: "Step 1", title: "Type" },
  { label: "Step 2", title: "Route" },
  { label: "Step 3", title: "Confirm" },
];

export default function PilotSetupPage() {
  return (
    <PilotShell active="apps">
      <CirroContainer className="max-w-[1300px] pb-12 pt-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="font-display text-5xl font-extrabold tracking-[-0.05em] text-foreground md:text-6xl">
              New Inspection
            </h1>
          </div>
          <GlassPanel className="p-6 md:p-7" strong>
            <ProgressRow active={1} steps={missionSteps} />
          </GlassPanel>
          <div className="text-center">
            <h2 className="font-display text-4xl font-extrabold tracking-tight">
              What are we inspecting today?
            </h2>
            <p className="mt-3 text-lg leading-8 text-muted-foreground">
              Select an inspection module to begin pre-flight calibration.
            </p>
          </div>
        </div>

        <section className="grid gap-6 py-10 md:grid-cols-3">
          {[
            {
              description:
                "High-resolution thermal and structural mapping for residential and industrial rooftops.",
              icon: Layers3,
              title: "Roof Inspection",
            },
            {
              description:
                "Automated linear tracking to detect structural wear along property lines.",
              icon: ShieldCheck,
              title: "Perimeter Fence",
            },
            {
              description:
                "Vertical flight patterns for masonry and glass facade assessments.",
              icon: Compass,
              title: "Facade & Wall",
            },
          ].map(({ description, icon: Icon, title }) => (
            <GlassPanel key={title} className="p-8 transition hover:-translate-y-1">
              <div className="rounded-2xl bg-sky-100 p-4 text-primary">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight">
                {title}
              </h3>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                {description}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Select Type
                <ArrowRight className="h-4 w-4" />
              </div>
            </GlassPanel>
          ))}
        </section>

        <GlassPanel className="overflow-hidden">
          <div className="map-grid relative h-72" />
          <div className="flex flex-col gap-4 border-t border-white/60 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Current Workspace
              </p>
              <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight">
                Industrial Site Alpha
              </h3>
            </div>
            <button className={buttonStyles({ variant: "secondary" })} type="button">
              Change Location
            </button>
          </div>
        </GlassPanel>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-between">
          <ButtonLink href="/pilot" size="lg" variant="ghost">
            Cancel Session
          </ButtonLink>
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              className={buttonStyles({
                className: "opacity-50",
                size: "lg",
                variant: "secondary",
              })}
              disabled
              type="button"
            >
              Back
            </button>
            <ButtonLink href="/pilot/apps/cirro-inspect/route-review" size="lg">
              Next: Route Review
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
          </div>
        </div>
      </CirroContainer>
    </PilotShell>
  );
}
