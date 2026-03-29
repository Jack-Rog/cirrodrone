import { Cloud, Compass, Download, History, Settings2 } from "lucide-react";

import { PilotShell } from "@/components/cirro/pilot-shell";
import { ButtonLink, CirroContainer, GlassPanel, MetricCard, buttonStyles } from "@/components/cirro/shared";

const sessions = [
  {
    app: "Cirro Inspect",
    date: "Oct 24, 2023 • 14:20",
    result: "342 images captured",
    title: "Northern Grid Maintenance",
    vehicle: "DJI Matrice 300 RTK",
  },
  {
    app: "Cirro Map",
    date: "Oct 22, 2023 • 09:15",
    result: "1,204 points rendered",
    title: "Sunset Ridge Survey",
    vehicle: "Autel EVO II Pro",
  },
  {
    app: "Cirro Scan",
    date: "Oct 18, 2023 • 11:45",
    result: "LiDAR scan complete",
    title: "Evergreen Forest Biomass",
    vehicle: "Freefly Astro",
  },
];

export default function PilotSessionsPage() {
  return (
    <PilotShell active="sessions">
      <CirroContainer className="max-w-[1500px] pb-12 pt-8">
        <section className="max-w-4xl">
          <h1 className="font-display text-5xl font-extrabold tracking-[-0.05em] text-foreground md:text-6xl">
            Sessions History
          </h1>
          <p className="mt-5 text-xl leading-8 text-muted-foreground">
            Review previous flight data, export captures, and jump back into the most
            recent operator workflows.
          </p>
        </section>

        <section className="grid gap-6 py-10 md:grid-cols-4">
          <MetricCard icon={History} label="Total Missions" value="128" />
          <MetricCard icon={Compass} label="Flight Hours" value="42.5h" tone="mint" />
          <MetricCard icon={Cloud} label="Data Captured" value="1.2 TB" tone="violet" />
          <GlassPanel className="flex items-center justify-between p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Filter By
              </p>
              <p className="mt-3 font-display text-2xl font-extrabold tracking-tight text-foreground">
                All Apps
              </p>
            </div>
            <Settings2 className="h-5 w-5 text-slate-400" />
          </GlassPanel>
        </section>

        <section className="space-y-5">
          {sessions.map((session, index) => (
            <GlassPanel key={session.title} className="p-3 md:p-4">
              <div className="flex flex-col gap-5 md:flex-row md:items-center">
                <div
                  className={`h-40 rounded-[1.6rem] md:w-56 ${
                    index === 0
                      ? "bg-[linear-gradient(135deg,#375d78_0%,#8fb9d9_55%,#edf5fb_100%)]"
                      : index === 1
                        ? "bg-[linear-gradient(135deg,#42606b_0%,#97bdcc_55%,#eef4f7_100%)]"
                        : "bg-[linear-gradient(135deg,#53616e_0%,#9ec0c6_55%,#f1f7f5_100%)]"
                  }`}
                />
                <div className="flex flex-1 flex-col gap-5 px-2 py-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-sky-100 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-primary">
                        {session.app}
                      </span>
                      <span className="text-sm text-muted-foreground">{session.date}</span>
                    </div>
                    <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight">
                      {session.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">{session.vehicle}</p>
                  </div>
                  <div className="flex flex-col gap-4 md:items-end">
                    <div className="text-left md:text-right">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                        Result
                      </p>
                      <p className="mt-2 text-sm font-semibold text-foreground">
                        {session.result}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button className={buttonStyles({ variant: "secondary" })} type="button">
                        <Download className="h-4 w-4" />
                        Export
                      </button>
                      <ButtonLink href="/pilot/apps/cirro-inspect" variant="primary">
                        View Data
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              </div>
            </GlassPanel>
          ))}
        </section>
      </CirroContainer>
    </PilotShell>
  );
}
