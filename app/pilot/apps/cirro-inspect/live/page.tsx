import { ArrowRight, Pause, X } from "lucide-react";

import { PilotShell } from "@/components/cirro/pilot-shell";
import { ButtonLink, CirroContainer, GlassPanel, buttonStyles } from "@/components/cirro/shared";

export default function PilotLiveMissionPage() {
  return (
    <PilotShell active="sessions" footer={false}>
      <CirroContainer className="max-w-[1700px] pb-8 pt-6">
        <div className="relative min-h-[calc(100vh-9rem)] overflow-hidden rounded-[2.6rem] map-grid">
          <svg className="absolute inset-0 h-full w-full" fill="none" viewBox="0 0 1000 1000">
            <path
              d="M 200 800 L 400 600 L 470 470"
              stroke="#255e87"
              strokeDasharray="14 10"
              strokeWidth="6"
            />
            <circle cx="470" cy="470" fill="#255e87" r="12" />
            <circle cx="470" cy="470" fill="none" r="24" stroke="#255e87" strokeWidth="2" />
          </svg>

          <div className="absolute left-6 right-6 top-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <GlassPanel className="flex flex-wrap items-center gap-6 px-6 py-5" strong>
              {[
                ["Mission Status", "Active Run"],
                ["Altitude", "142m"],
                ["Battery", "78%"],
                ["Signal", "Excellent"],
              ].map(([label, value], index) => (
                <div key={label} className="min-w-28">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
                    {label}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    {index === 0 ? <span className="status-dot bg-emerald-500" /> : null}
                    <p className="font-display text-2xl font-extrabold tracking-tight text-foreground">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </GlassPanel>
            <GlassPanel className="flex gap-2 p-2" strong>
              {["Layers", "Locate", "+", "-"].map((label) => (
                <button
                  key={label}
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                  type="button"
                >
                  {label}
                </button>
              ))}
            </GlassPanel>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <GlassPanel className="w-full max-w-md overflow-hidden p-1.5" strong>
              <div className="relative aspect-video rounded-[1.4rem] bg-[linear-gradient(135deg,#40526d_0%,#8bb0c9_52%,#edf5fb_100%)]">
                <div className="absolute left-4 top-4 rounded-full bg-destructive px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white">
                  Live
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(15,23,42,0.4))] p-4 text-white">
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span>Main Gimbal Feed</span>
                    <span>Expand</span>
                  </div>
                </div>
              </div>
            </GlassPanel>

            <GlassPanel className="w-full max-w-[28rem] p-6 md:p-8" strong>
              <div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Mission Progress
                    </p>
                    <p className="mt-2 font-display text-4xl font-extrabold tracking-tight text-primary">
                      45%
                    </p>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">12:45 Remaining</p>
                </div>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">
                  <div className="primary-gradient h-full w-[45%] rounded-full" />
                </div>
                <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                  <span>2.4 KM Traveled</span>
                  <span>Waypoint 3 of 8</span>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  className={buttonStyles({ className: "flex-1", size: "lg", variant: "secondary" })}
                  type="button"
                >
                  <Pause className="h-5 w-5" />
                  Pause
                </button>
                <button
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-destructive transition hover:bg-red-200"
                  type="button"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-5">
                <ButtonLink href="/pilot/sessions" className="w-full" variant="ghost">
                  Review Session Log
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </GlassPanel>
          </div>
        </div>
      </CirroContainer>
    </PilotShell>
  );
}
