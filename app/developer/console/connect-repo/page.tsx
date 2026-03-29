import { ArrowRight, CheckCircle2, FolderGit2 } from "lucide-react";

import { DeveloperConsoleShell } from "@/components/cirro/developer-shell";
import {
  ButtonLink,
  GlassPanel,
  SectionTag,
  UserBadge,
  buttonStyles,
} from "@/components/cirro/shared";

export default function DeveloperConnectRepoPage() {
  return (
    <DeveloperConsoleShell step={1} title="Link your source code.">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_2.15fr]">
        <GlassPanel className="p-7">
          <div className="space-y-8">
            {[
              {
                description: "Connect your GitHub account",
                state: "active",
                title: "Authentication",
              },
              {
                description: "Select your project",
                state: "upcoming",
                title: "Repository",
              },
              {
                description: "Configure and publish",
                state: "upcoming",
                title: "Deploy",
              },
            ].map((step, index) => (
              <div key={step.title} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-extrabold ${
                      step.state === "active"
                        ? "primary-gradient text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < 2 ? <div className="mt-3 h-16 w-px bg-slate-200" /> : null}
                </div>
                <div className="pt-1">
                  <p className="font-display text-lg font-extrabold tracking-tight">
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        <div className="space-y-6">
          <GlassPanel className="p-8 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-display text-3xl font-extrabold tracking-tight">
                  Connect GitHub Account
                </h2>
                <p className="mt-3 text-lg leading-8 text-muted-foreground">
                  Authorize Cirro to read your repositories and set up build hooks.
                </p>
              </div>
              <UserBadge label="Linked as @aero_dev" />
            </div>
            <div className="mt-8 flex items-center gap-4 rounded-[1.6rem] bg-slate-50/90 p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sky-300 to-slate-100 text-lg font-bold text-slate-700">
                AR
              </div>
              <div className="flex-1">
                <p className="font-display text-xl font-extrabold tracking-tight">
                  Alex Rivero
                </p>
                <p className="text-sm text-muted-foreground">
                  alex.rivero@cirro-labs.io
                </p>
              </div>
              <button className={buttonStyles({ variant: "ghost" })} type="button">
                Switch Account
              </button>
            </div>
          </GlassPanel>

          <GlassPanel className="p-8 md:p-10">
            <h2 className="font-display text-3xl font-extrabold tracking-tight">
              Select a Repository
            </h2>
            <label className="mt-6 flex items-center gap-3 rounded-full border border-white/70 bg-slate-50/90 px-5 py-4 text-slate-500">
              <FolderGit2 className="h-5 w-5" />
              <input
                className="w-full bg-transparent text-base text-slate-600 outline-none placeholder:text-slate-400"
                placeholder="Search your repositories..."
                type="text"
              />
            </label>
            <div className="mt-6 space-y-3">
              <div className="rounded-[1.5rem] border-2 border-primary bg-sky-50/70 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <FolderGit2 className="h-7 w-7 text-primary" />
                    <div>
                      <p className="font-display text-lg font-extrabold tracking-tight">
                        cirro-drones / fleet-manager-v2
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Updated 2 hours ago • Public
                      </p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                    Selected
                  </div>
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-white/70 bg-white/70 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <FolderGit2 className="h-7 w-7 text-slate-400" />
                    <div>
                      <p className="font-display text-lg font-extrabold tracking-tight">
                        cirro-drones / sky-nav-module
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Updated 3 days ago • Private
                      </p>
                    </div>
                  </div>
                  <button className={buttonStyles({ variant: "secondary" })} type="button">
                    Select
                  </button>
                </div>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-8 md:p-10">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-3xl font-extrabold tracking-tight">
                manifest.json Preview
              </h2>
              <SectionTag className="px-3 py-1 text-[0.62rem]" tone="slate">
                Read Only
              </SectionTag>
            </div>
            <div className="mt-6 rounded-[1.6rem] bg-slate-950 p-6 text-sm text-sky-300 shadow-[0_28px_55px_-38px_rgba(15,23,42,0.78)]">
              <pre className="overflow-x-auto">
{`{
  "id": "cirro-fleet-manager",
  "version": "2.4.0",
  "entry": "src/index.ts",
  "permissions": ["telemetry.read", "flight_path.write"],
  "environment": { "runtime": "cirro-core-v1" }
}`}
              </pre>
            </div>
            <div className="mt-8 flex justify-end">
              <ButtonLink href="/developer/console/capabilities" size="lg">
                Continue to Capabilities
                <ArrowRight className="h-5 w-5" />
              </ButtonLink>
            </div>
          </GlassPanel>
        </div>
      </div>
    </DeveloperConsoleShell>
  );
}
