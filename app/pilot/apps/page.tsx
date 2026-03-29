import { ArrowRight, History, LayoutGrid, Store } from "lucide-react";
import Link from "next/link";

import { PilotShell } from "@/components/cirro/pilot-shell";
import { ButtonLink, CirroContainer, GlassPanel, SectionTag } from "@/components/cirro/shared";

const appCards = [
  {
    category: "Inspection",
    description: "AI-driven structural inspection for roofs and facades.",
    href: "/pilot/apps/cirro-inspect",
    title: "Cirro Inspect",
  },
  {
    category: "Mapping",
    description: "Corridor scanning and terrain stitching for repeatable surveys.",
    href: "/pilot/apps/cirro-inspect",
    title: "Cirro Map",
  },
  {
    category: "Security",
    description: "Perimeter patrol logic with low-latency event triggers.",
    href: "/pilot/apps/cirro-inspect",
    title: "Cirro Watch",
  },
];

export default function PilotAppsPage() {
  return (
    <PilotShell active="apps">
      <CirroContainer className="max-w-[1600px] pb-12 pt-6">
        <div className="grid gap-8 xl:grid-cols-[18rem_1fr]">
          <GlassPanel className="hidden h-fit p-6 xl:block">
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-extrabold tracking-tight">
                  Pilot Console
                </h2>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Fleet Management
                </p>
              </div>
              <nav className="space-y-2">
                <Link
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-500 hover:bg-white/80"
                  href="/pilot"
                >
                  <LayoutGrid className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-2xl bg-sky-100/90 px-4 py-3 text-sm font-semibold text-primary"
                  href="/pilot/apps"
                >
                  <Store className="h-4 w-4" />
                  App Store
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-500 hover:bg-white/80"
                  href="/pilot/sessions"
                >
                  <History className="h-4 w-4" />
                  Flight Logs
                </Link>
              </nav>
              <div className="rounded-[1.5rem] bg-slate-50/90 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Storage Status
                </p>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                  <div className="primary-gradient h-full w-[65%] rounded-full" />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">6.5 GB of 10 GB used</p>
              </div>
              <ButtonLink href="/pilot/apps/cirro-inspect/setup" className="w-full">
                New Mission
              </ButtonLink>
            </div>
          </GlassPanel>

          <div className="space-y-8">
            <section>
              <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 px-8 py-12 text-white shadow-[0_40px_90px_-42px_rgba(15,23,42,0.75)] md:px-12 md:py-16">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(110,173,223,0.35),transparent_38%),linear-gradient(135deg,rgba(9,16,28,0.2),rgba(9,16,28,0.78))]" />
                <div className="absolute inset-0 ambient-grid opacity-10" />
                <div className="relative max-w-3xl">
                  <div className="flex items-center gap-3">
                    <SectionTag className="bg-white/12 text-white shadow-none" tone="slate">
                      New Release
                    </SectionTag>
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/60">
                      Available Now
                    </span>
                  </div>
                  <h1 className="mt-6 font-display text-5xl font-extrabold tracking-[-0.06em] md:text-7xl md:leading-[0.94]">
                    Thermal
                    <br />
                    <span className="text-sky-200">Edge Pro v2.4</span>
                  </h1>
                  <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
                    Experience updated mapping precision for emergency response and
                    infrastructure analytics inside a premium operator runtime.
                  </p>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <ButtonLink href="/pilot/apps/cirro-inspect" size="lg" variant="secondary">
                      View Details
                    </ButtonLink>
                    <ButtonLink href="/pilot/apps/cirro-inspect/live" size="lg" variant="ghost" className="border border-white/20 text-white hover:bg-white/10">
                      Watch Demo
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex flex-col gap-4 border-b border-white/60 pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="font-display text-4xl font-extrabold tracking-tight">
                    Explore Apps
                  </h2>
                  <p className="mt-2 text-base text-muted-foreground">
                    Equip the fleet with world-class intelligence.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  <span className="rounded-full bg-white/90 px-4 py-2 text-primary shadow-sm">
                    All
                  </span>
                  <span className="rounded-full bg-white/60 px-4 py-2">Industrial</span>
                  <span className="rounded-full bg-white/60 px-4 py-2">Creative</span>
                  <span className="rounded-full bg-white/60 px-4 py-2">Security</span>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {appCards.map((app, index) => (
                  <Link
                    key={app.title}
                    className="group block rounded-[2rem] glass-card p-5 transition hover:-translate-y-1"
                    href={app.href}
                  >
                    <div
                      className={`relative aspect-[4/3] overflow-hidden rounded-[1.6rem] ${
                        index === 0
                          ? "bg-[linear-gradient(135deg,#375d78_0%,#8fb9d9_55%,#eff7ff_100%)]"
                          : index === 1
                            ? "bg-[linear-gradient(135deg,#3f5b67_0%,#88aebf_55%,#edf4f8_100%)]"
                            : "bg-[linear-gradient(135deg,#443d63_0%,#9fa9d9_55%,#f6f7ff_100%)]"
                      }`}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.5),transparent_30%),linear-gradient(180deg,transparent,rgba(15,23,42,0.28))]" />
                      <div className="absolute bottom-5 left-5 rounded-full bg-white/85 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-700">
                        {app.category}
                      </div>
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
                          {app.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">
                          {app.description}
                        </p>
                      </div>
                      <ArrowRight className="mt-2 h-5 w-5 shrink-0 text-primary transition group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </CirroContainer>
    </PilotShell>
  );
}
