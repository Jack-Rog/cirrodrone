import {
  Code2,
  Cpu,
  Monitor,
  Radar,
  ShieldCheck,
  Video,
} from "lucide-react";

import { DeveloperShell } from "@/components/cirro/developer-shell";
import { ButtonLink, CirroContainer, GlassPanel, SectionTag } from "@/components/cirro/shared";

export default function DeveloperHomePage() {
  return (
    <DeveloperShell active="home">
      <CirroContainer className="pb-12 pt-10 md:pb-16 md:pt-16">
        <section className="relative overflow-hidden pb-24 pt-10 text-center">
          <div className="hero-rings absolute left-1/2 top-0 h-[32rem] w-[48rem] -translate-x-1/2 rounded-full opacity-70" />
          <div className="relative mx-auto max-w-5xl">
            <SectionTag>Developer Ecosystem</SectionTag>
            <h1 className="mt-8 font-display text-6xl font-extrabold tracking-[-0.06em] text-foreground md:text-[5.6rem] md:leading-[0.96]">
              Build for the App Store
              <br className="hidden md:block" /> for Drones.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-muted-foreground md:text-2xl">
              One codebase. Infinite missions. Cirro handles the runtime, safety,
              and hardware translation across the industry&apos;s leading fleet.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <ButtonLink href="/developer/console/connect-repo" size="lg">
                Start Building
              </ButtonLink>
              <ButtonLink href="/developer/how-it-works" size="lg" variant="secondary">
                Read Documentation
              </ButtonLink>
            </div>
          </div>
        </section>

        <section className="space-y-10 border-y border-white/60 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
              Architected for Interoperability
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Eliminate hardware silos. Write mission logic once and let Cirro handle
              command translation, safety envelopes, and runtime state.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <GlassPanel className="p-8">
              <div className="mb-6 inline-flex rounded-2xl bg-sky-100 p-4 text-primary">
                <Code2 className="h-8 w-8" />
              </div>
              <h3 className="font-display text-2xl font-extrabold tracking-tight">
                Developer App
              </h3>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Build rich interfaces with the high-level SDK and keep your mission
                logic expressive without controller-specific edge cases.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                <span className="rounded-full bg-slate-100 px-3 py-2">React</span>
                <span className="rounded-full bg-slate-100 px-3 py-2">Swift</span>
                <span className="rounded-full bg-slate-100 px-3 py-2">Kotlin</span>
              </div>
            </GlassPanel>

            <div className="primary-gradient rounded-[2rem] px-8 py-10 text-center text-white shadow-[0_36px_75px_-32px_rgba(31,70,100,0.55)]">
              <div className="mx-auto mb-6 inline-flex rounded-[1.5rem] border border-white/20 bg-white/10 p-5">
                <Cpu className="h-9 w-9" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-100/80">
                Core Engine
              </p>
              <h3 className="mt-4 font-display text-3xl font-extrabold tracking-tight">
                Cirro Runtime
              </h3>
              <p className="mt-4 text-base leading-7 text-sky-100/80">
                Standardizes translation, mission safety, and state synchronization
                across the fleet.
              </p>
            </div>

            <GlassPanel className="p-8">
              <div className="mb-6 inline-flex rounded-2xl bg-slate-100 p-4 text-primary">
                <Radar className="h-8 w-8" />
              </div>
              <h3 className="font-display text-2xl font-extrabold tracking-tight">
                Supported Fleet
              </h3>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Native integrations keep enterprise hardware on the table while Cirro
                stays responsible for compatibility and release safety.
              </p>
              <div className="mt-6 space-y-3 text-sm font-semibold text-slate-600">
                <p>DJI Enterprise Series</p>
                <p>Autel Robotics Fleet</p>
                <p>Parrot Anafi Platform</p>
              </div>
            </GlassPanel>
          </div>
        </section>

        <section className="grid gap-6 py-16 md:grid-cols-4 md:grid-rows-2">
          <GlassPanel className="relative overflow-hidden p-10 md:col-span-2 md:row-span-2">
            <div className="absolute -bottom-16 -right-12 h-56 w-56 rounded-full bg-sky-200/50 blur-3xl" />
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Precision Performance
            </p>
            <h3 className="mt-8 font-display text-5xl font-extrabold tracking-tight text-foreground">
              The Runtime of
              <br /> Global Records.
            </h3>
            <p className="mt-6 max-w-md text-lg leading-8 text-muted-foreground">
              Mission execution, safety policies, and telemetry orchestration stay
              inside one runtime so your app can focus on the operator experience.
            </p>
            <div className="mt-10 rounded-[1.5rem] bg-slate-950 p-6 shadow-[0_26px_55px_-35px_rgba(15,23,42,0.75)]">
              <code className="text-sm text-sky-300">
                cirro.execute(missionPlan).on(&quot;telem&quot;, updateUI)
              </code>
            </div>
          </GlassPanel>

          <GlassPanel className="flex items-center gap-6 p-8 md:col-span-2">
            <div className="rounded-[1.5rem] bg-sky-100 p-5 text-primary">
              <Monitor className="h-8 w-8" />
            </div>
            <div>
              <h4 className="font-display text-2xl font-extrabold tracking-tight">
                Cross-Platform Sync
              </h4>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                Keep Android tablets, iOS surfaces, and smart controllers aligned
                without a second frontend branch.
              </p>
            </div>
          </GlassPanel>

          <GlassPanel className="p-8">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <h4 className="mt-6 font-display text-xl font-extrabold tracking-tight">
              Safety Protocol
            </h4>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Geofencing, failsafes, and operator constraints can be declared once and
              enforced consistently.
            </p>
          </GlassPanel>

          <GlassPanel className="p-8">
            <Video className="h-8 w-8 text-primary" />
            <h4 className="mt-6 font-display text-xl font-extrabold tracking-tight">
              Live Insights
            </h4>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Stream payload video and telemetry to the runtime while keeping operator
              UI updates fast and resilient.
            </p>
          </GlassPanel>
        </section>

        <section className="pb-8">
          <div className="primary-gradient relative overflow-hidden rounded-[2.6rem] px-8 py-16 text-center text-white shadow-[0_40px_90px_-38px_rgba(31,70,100,0.62)] md:px-14 md:py-24">
            <div className="ambient-grid absolute inset-0 opacity-10" />
            <div className="relative mx-auto max-w-3xl">
              <h2 className="font-display text-5xl font-extrabold tracking-[-0.06em] md:text-6xl">
                Ready to take flight?
              </h2>
              <p className="mt-6 text-xl leading-8 text-sky-100/80">
                Step into the packaging workflow and move from repo connection to
                publish-ready deployment.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <ButtonLink href="/developer/console/connect-repo" size="lg" variant="secondary">
                  Start Developing
                </ButtonLink>
                <ButtonLink href="/developer/how-it-works" size="lg" variant="ghost" className="border border-white/20 text-white hover:bg-white/10">
                  Learn the Flow
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      </CirroContainer>
    </DeveloperShell>
  );
}
