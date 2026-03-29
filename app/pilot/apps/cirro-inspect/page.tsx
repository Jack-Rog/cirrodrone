import { Cloud, Compass } from "lucide-react";

import { PilotShell } from "@/components/cirro/pilot-shell";
import { ButtonLink, CirroContainer, GlassPanel, SectionTag, buttonStyles } from "@/components/cirro/shared";

export default function PilotAppDetailsPage() {
  return (
    <PilotShell active="apps">
      <CirroContainer className="max-w-[1500px] pb-12 pt-8">
        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-4">
              <SectionTag tone="mint">Precision Tool</SectionTag>
              <span className="text-sm font-medium text-muted-foreground">
                Compatible with DJI Mavic 3
              </span>
            </div>
            <h1 className="mt-6 font-display text-6xl font-extrabold tracking-[-0.06em] text-foreground md:text-7xl">
              Cirro Inspect
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-muted-foreground">
              Automated high-fidelity visual inspections for critical infrastructure.
              Transform raw telemetry into actionable structural insight.
            </p>
          </div>
          <div className="space-y-4">
            <ButtonLink href="/pilot/apps/cirro-inspect/setup" className="w-full" size="lg">
              Launch App
            </ButtonLink>
            <a className={buttonStyles({ className: "w-full", size: "lg", variant: "secondary" })} href="#intelligence">
              View Documentation
            </a>
          </div>
        </section>

        <section className="grid gap-6 py-12 md:grid-cols-12">
          <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#315974_0%,#8fb8d4_52%,#edf5fb_100%)] md:col-span-8 md:min-h-[32rem]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.5),transparent_28%),linear-gradient(180deg,transparent,rgba(15,23,42,0.28))]" />
            <div className="absolute bottom-8 left-8 max-w-md text-white">
              <h2 className="font-display text-3xl font-extrabold tracking-tight">
                Automated Roof Analysis
              </h2>
              <p className="mt-3 text-base leading-7 text-sky-50/85">
                Identify moisture traps and structural weaknesses with AI-assisted
                thermal mapping.
              </p>
            </div>
          </div>
          <div className="space-y-6 md:col-span-4">
            <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#435464_0%,#8db1bf_58%,#edf3f6_100%)] p-6 text-white shadow-[0_30px_60px_-40px_rgba(25,42,58,0.45)]">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(15,23,42,0.28))]" />
              <div className="relative">
                <h3 className="font-display text-2xl font-extrabold tracking-tight">
                  Perimeter Security
                </h3>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#5a617c_0%,#adb5df_58%,#f4f6ff_100%)] p-6 text-white shadow-[0_30px_60px_-40px_rgba(25,42,58,0.45)]">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(15,23,42,0.28))]" />
              <div className="relative">
                <h3 className="font-display text-2xl font-extrabold tracking-tight">
                  Facade Digitization
                </h3>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-10 border-t border-white/60 pt-12 lg:grid-cols-3" id="intelligence">
          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight">
              The Intelligence
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Computer vision models identify structural anomalies, moisture patterns,
              and surface degradation from a guided pilot-friendly workflow.
            </p>
            <GlassPanel className="mt-6 p-5">
              <div className="flex gap-4">
                <div className="rounded-2xl bg-sky-100 p-3 text-primary">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-xl font-extrabold tracking-tight">
                    Sub-millimeter Accuracy
                  </p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    Precision GPS tagging for every frame captured in the run.
                  </p>
                </div>
              </div>
            </GlassPanel>
          </div>

          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight">
              Deployment
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              One-tap launch keeps pilots focused on safety while Cirro manages route
              generation, hardware checks, and data acquisition.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              <span className="rounded-full bg-slate-100 px-3 py-2">4K 60FPS</span>
              <span className="rounded-full bg-slate-100 px-3 py-2">LiDAR Ready</span>
              <span className="rounded-full bg-slate-100 px-3 py-2">RTK Support</span>
              <span className="rounded-full bg-slate-100 px-3 py-2">Offline Sync</span>
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight">
              Integrations
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {["Azure Cloud", "Autodesk", "SharePoint", "Tableau"].map((item) => (
                <GlassPanel key={item} className="p-5 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-primary">
                    <Cloud className="h-5 w-5" />
                  </div>
                  <p className="mt-3 font-display text-lg font-extrabold tracking-tight">
                    {item}
                  </p>
                </GlassPanel>
              ))}
            </div>
          </div>
        </section>
      </CirroContainer>
    </PilotShell>
  );
}
