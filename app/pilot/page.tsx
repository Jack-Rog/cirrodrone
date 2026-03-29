import { ArrowRight, CheckCircle2, Cloud, History, Radar, Settings2, UploadCloud } from "lucide-react";

import { PilotShell } from "@/components/cirro/pilot-shell";
import { ButtonLink, CirroContainer, GlassPanel, SectionTag } from "@/components/cirro/shared";

export default function PilotWelcomePage() {
  return (
    <PilotShell active="home">
      <CirroContainer className="pb-12 pt-8">
        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-8">
            <SectionTag tone="mint">
              <CheckCircle2 className="h-4 w-4" />
              Authentication Successful
            </SectionTag>
            <div className="space-y-5">
              <h1 className="font-display text-6xl font-extrabold tracking-[-0.06em] text-foreground md:text-[5.2rem] md:leading-[0.96]">
                Welcome back,
                <br />
                <span className="text-primary">Ready to Fly.</span>
              </h1>
              <p className="max-w-2xl text-xl leading-8 text-muted-foreground">
                Flight systems are synchronized and the telemetry bridge is active.
                Precision data is waiting for your next command.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/pilot/apps" size="lg">
                Go to Dashboard
              </ButtonLink>
              <ButtonLink href="/pilot/sessions" size="lg" variant="secondary">
                View Missions
              </ButtonLink>
            </div>
          </div>

          <GlassPanel className="relative overflow-hidden p-8 md:p-10" strong>
            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-sky-200/50 blur-3xl" />
            <div className="relative space-y-4">
              {[
                {
                  icon: Radar,
                  label: "System Status",
                  tone: "bg-sky-100 text-primary",
                  value: "Pre-flight check clear",
                },
                {
                  icon: Cloud,
                  label: "Environment",
                  tone: "bg-emerald-100 text-emerald-700",
                  value: "Clear skies • 12km visibility",
                },
                {
                  icon: History,
                  label: "Last Session",
                  tone: "bg-violet-100 text-violet-700",
                  value: "2 hours ago • Sector 7G",
                },
              ].map(({ icon: Icon, label, tone, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-[1.5rem] bg-white/88 p-5 shadow-[0_18px_32px_-24px_rgba(29,47,70,0.28)]"
                >
                  <div className={`rounded-2xl p-3 ${tone}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
                      {label}
                    </p>
                    <p className="mt-1 font-display text-xl font-extrabold tracking-tight text-foreground">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </section>

        <section className="grid gap-6 pt-14 md:grid-cols-3">
          <GlassPanel className="relative overflow-hidden p-8 md:col-span-2">
            <div className="absolute -right-8 -top-8 h-44 w-44 rounded-full bg-sky-200/50 blur-3xl" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <h2 className="font-display text-4xl font-extrabold tracking-tight">
                  Launch new
                  <br />
                  Automated Survey
                </h2>
                <p className="mt-4 max-w-md text-lg leading-8 text-muted-foreground">
                  Deploy a guided inspection run with thermal overlays, route review,
                  and live telemetry in one continuous pilot flow.
                </p>
              </div>
              <div className="mt-10">
                <ButtonLink href="/pilot/apps/cirro-inspect/setup" variant="secondary">
                  Setup Mission
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </div>
          </GlassPanel>

          <div className="space-y-6">
            <div className="primary-gradient rounded-[1.8rem] p-8 text-white shadow-[0_30px_65px_-32px_rgba(31,70,100,0.58)]">
              <Settings2 className="h-8 w-8" />
              <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight">
                App Marketplace
              </h3>
              <p className="mt-3 text-sm leading-7 text-sky-100/80">
                Extend the operator console with mission-specific toolkits.
              </p>
              <ButtonLink href="/pilot/apps" className="mt-6 w-full" variant="ghost">
                Browse Apps
              </ButtonLink>
            </div>

            <GlassPanel className="p-7">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-slate-100 p-4 text-primary">
                  <Settings2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-extrabold tracking-tight">
                    Console Settings
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Configure hardware, sync, and privacy preferences.
                  </p>
                </div>
              </div>
            </GlassPanel>
          </div>
        </section>

        <section className="pt-6">
          <GlassPanel className="p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-[1.8rem] primary-gradient text-white shadow-[0_26px_50px_-30px_rgba(31,70,100,0.55)]">
                <UploadCloud className="h-10 w-10" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-extrabold tracking-tight">
                  Cloud Sync Complete
                </h3>
                <p className="mt-3 max-w-3xl text-base leading-8 text-muted-foreground">
                  All 14 pending mission logs from your mobile interface have been
                  synchronized with the Pilot Console and are ready for review.
                </p>
              </div>
            </div>
          </GlassPanel>
        </section>
      </CirroContainer>
    </PilotShell>
  );
}
