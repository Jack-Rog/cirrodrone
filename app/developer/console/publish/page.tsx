import {
  CheckCircle2,
  FolderGit2,
  Layers3,
  Package,
} from "lucide-react";

import { DeveloperConsoleShell } from "@/components/cirro/developer-shell";
import {
  ButtonLink,
  GlassPanel,
  MetricCard,
  buttonStyles,
} from "@/components/cirro/shared";

export default function DeveloperPublishPage() {
  return (
    <DeveloperConsoleShell step={4} title="Review & Publish.">
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <MetricCard
              hint="GitHub connection stable. Main branch synced."
              icon={FolderGit2}
              label="Repo Linked"
              value="Ready"
            />
            <MetricCard
              hint="Docker image generated and scanned."
              icon={Package}
              label="Build Validated"
              value="Passed"
              tone="mint"
            />
            <MetricCard
              hint="API endpoints verified across all regions."
              icon={Layers3}
              label="Compatibility"
              value="Verified"
              tone="violet"
            />
          </div>

          <GlassPanel className="p-8 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-5">
                <div className="rounded-full bg-sky-100 p-5 text-primary">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="font-display text-3xl font-extrabold tracking-tight">
                    Approval State
                  </h2>
                  <p className="mt-2 text-base leading-7 text-muted-foreground">
                    Your application is currently pending review by the Cirro safety
                    council.
                  </p>
                </div>
              </div>
              <div className="text-left md:text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Est. Time Remaining
                </p>
                <p className="mt-2 font-display text-4xl font-extrabold tracking-tight">
                  14h 22m
                </p>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-8 md:p-10">
            <h2 className="font-display text-3xl font-extrabold tracking-tight">
              Professional Next Steps
            </h2>
            <div className="mt-8 space-y-5">
              {[
                {
                  description:
                    "Ensure all production secrets are updated before the final push to the live cluster.",
                  title: "Configure Environment Variables",
                },
                {
                  description:
                    "Review data residency requirements for EU-Central-1 and US-East-2 regions.",
                  title: "Region Availability Check",
                },
                {
                  description:
                    "Marketplace metadata will be generated from your README once the app is published.",
                  title: "Public Marketplace Indexing",
                },
              ].map((item, index) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-display text-lg font-extrabold tracking-tight">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>

        <div className="space-y-6">
          <GlassPanel className="p-8">
            <h2 className="font-display text-2xl font-extrabold tracking-tight">
              Deployment Actions
            </h2>
            <div className="mt-6 space-y-4">
              <button className={buttonStyles({ className: "w-full", size: "lg" })} type="button">
                Publish to Store
              </button>
              <button
                className={buttonStyles({
                  className: "w-full",
                  size: "lg",
                  variant: "secondary",
                })}
                type="button"
              >
                Internal Beta Testing
              </button>
            </div>
            <p className="mt-6 text-center text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Publishing confirms the developer terms and automated safety scans.
            </p>
          </GlassPanel>

          <GlassPanel className="p-8">
            <h2 className="font-display text-2xl font-extrabold tracking-tight">
              Summary
            </h2>
            <div className="mt-5 space-y-4 text-sm">
              {[
                ["Package Name", "com.cirro.inspect.v1"],
                ["Dependencies", "14 verified"],
                ["Size", "42.8 MB"],
                ["Last Scan", "2 mins ago"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-b-0 last:pb-0"
                >
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-semibold text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="p-8">
            <h2 className="font-display text-2xl font-extrabold tracking-tight">
              Release Preview
            </h2>
            <div className="mt-5 rounded-[1.6rem] bg-slate-950 p-6 text-sm text-sky-300">
              <pre>
{`build.target = "cirro-runtime"
policy.review = "pending"
marketplace.listing = "draft"
distribution.mode = "internal-test"`}
              </pre>
            </div>
            <div className="mt-6 flex justify-end">
              <ButtonLink href="/developer" variant="ghost">
                Back to Developer Home
              </ButtonLink>
            </div>
          </GlassPanel>
        </div>
      </div>
    </DeveloperConsoleShell>
  );
}
