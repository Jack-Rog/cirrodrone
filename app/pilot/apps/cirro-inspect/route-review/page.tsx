import { History, Map, Play } from "lucide-react";

import { PilotShell } from "@/components/cirro/pilot-shell";
import { ButtonLink, CirroContainer, GlassPanel, MetricCard, SectionTag } from "@/components/cirro/shared";

export default function PilotRouteReviewPage() {
  return (
    <PilotShell active="sessions" footer={false}>
      <CirroContainer className="max-w-[1700px] pb-8 pt-6">
        <div className="grid min-h-[calc(100vh-9rem)] gap-6 lg:grid-cols-[1fr_26rem]">
          <div className="relative overflow-hidden rounded-[2.4rem] map-grid">
            <svg className="absolute inset-0 h-full w-full" fill="none" viewBox="0 0 1000 1000">
              <path
                d="M 300,360 L 710,360 L 710,600 L 320,600 L 320,790 L 720,790"
                stroke="#255e87"
                strokeDasharray="14 10"
                strokeWidth="6"
              />
              <circle cx="300" cy="360" fill="#255e87" r="12" />
              <circle cx="720" cy="790" fill="#a83836" r="13" />
            </svg>
            <div className="absolute left-6 top-6 rounded-full bg-white/85 px-5 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600 shadow-md">
              37.7749 N, 122.4194 W
            </div>
            <div className="absolute bottom-6 left-6 rounded-[1.4rem] bg-white/82 p-4 shadow-md">
              <div className="space-y-3">
                <button className="block rounded-xl p-2 hover:bg-slate-100" type="button">
                  +
                </button>
                <div className="h-px bg-slate-200" />
                <button className="block rounded-xl p-2 hover:bg-slate-100" type="button">
                  -
                </button>
              </div>
            </div>
          </div>

          <GlassPanel className="flex h-full flex-col p-8 md:p-10" strong>
            <div className="space-y-3">
              <SectionTag className="px-0 py-0 shadow-none" tone="sky">
                Mission Configuration
              </SectionTag>
              <h1 className="font-display text-4xl font-extrabold tracking-[-0.05em] text-foreground">
                Route Review
              </h1>
              <p className="text-base leading-8 text-muted-foreground">
                Validate flight parameters before initiating the autonomous sequence.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <MetricCard
                hint="Optimized for standard inspection speed and payload burn."
                icon={History}
                label="Estimated Duration"
                value="12m"
              />
              <MetricCard
                hint="Optimized for high-res multispectral mapping."
                icon={Map}
                label="Area Covered"
                tone="mint"
                value="1.5 acres"
              />
            </div>

            <div className="primary-gradient mt-8 rounded-[1.8rem] p-6 text-white shadow-[0_32px_65px_-36px_rgba(31,70,100,0.58)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-100/80">
                    Hardware Status
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight">
                    DJI Mavic 3
                  </h2>
                </div>
                <div className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                  Connected
                </div>
              </div>
              <div className="mt-4 flex gap-5 text-sm text-sky-100/80">
                <span>Battery 88%</span>
                <span>18 Sats</span>
              </div>
            </div>

            <div className="mt-auto space-y-4 pt-10">
              <ButtonLink href="/pilot/apps/cirro-inspect/live" className="w-full" size="lg">
                Run Mission
                <Play className="h-5 w-5" />
              </ButtonLink>
              <ButtonLink
                href="/pilot/apps/cirro-inspect/setup"
                className="w-full"
                size="lg"
                variant="secondary"
              >
                Edit Path
              </ButtonLink>
              <div className="rounded-[1.4rem] bg-slate-50/90 p-4 text-sm leading-7 text-muted-foreground">
                Crosswinds of 14 knots detected near waypoint three. Battery drain may
                increase during the run.
              </div>
            </div>
          </GlassPanel>
        </div>
      </CirroContainer>
    </PilotShell>
  );
}
