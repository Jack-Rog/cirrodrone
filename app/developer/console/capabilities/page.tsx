import { ArrowRight, Compass, Map, Radar, ShieldCheck, Video, Wrench } from "lucide-react";

import { DeveloperConsoleShell } from "@/components/cirro/developer-shell";
import { ButtonLink, GlassPanel, MetricCard } from "@/components/cirro/shared";

export default function DeveloperCapabilitiesPage() {
  const permissions = [
    {
      description: "Real-time altitude, speed, and battery health data stream.",
      enabled: true,
      icon: Radar,
      title: "Telemetry Access",
    },
    {
      description: "Access to primary FPV and payload camera video buffers.",
      enabled: true,
      icon: Video,
      title: "Video Streaming",
    },
    {
      description: "Sub-meter precision coordinate access for pathing.",
      enabled: true,
      icon: Map,
      title: "GPS & Positioning",
    },
    {
      description: "Authority to override waypoints and landing sequences.",
      enabled: false,
      icon: Wrench,
      title: "Mission Control Actions",
    },
    {
      description: "Adjust pitch, yaw, roll, and zoom parameters in-flight.",
      enabled: false,
      icon: Compass,
      title: "Camera & Gimbal Controls",
    },
  ];

  return (
    <DeveloperConsoleShell step={2} title="Capability Manifest">
      <div className="grid gap-6 md:grid-cols-12">
        <GlassPanel className="p-8 md:col-span-8">
          <div className="mb-8 flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <h2 className="font-display text-3xl font-extrabold tracking-tight">
              App Permissions
            </h2>
          </div>
          <div className="space-y-4">
            {permissions.map(({ description, enabled, icon: Icon, title }) => (
              <div
                key={title}
                className="flex items-start justify-between gap-4 rounded-[1.4rem] border border-white/65 bg-white/72 p-5"
              >
                <div className="flex gap-4">
                  <div className="rounded-2xl bg-sky-100 p-3 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-extrabold tracking-tight">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
                <div
                  className={`cirro-toggle relative mt-1 shrink-0 ${
                    enabled ? "bg-sky-500" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                      enabled ? "left-[1.35rem]" : "left-0.5"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        <div className="space-y-6 md:col-span-4">
          <GlassPanel className="p-8">
            <h2 className="font-display text-2xl font-extrabold tracking-tight">
              Sensor Compatibility
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Select hardware expectations so Cirro can narrow deployment targets.
            </p>
            <div className="mt-6 space-y-3 text-sm font-medium text-foreground">
              {[
                "Thermal Imaging (IR)",
                "LiDAR Scanner",
                "Multispectral Sensor",
                "Obstacle Avoidance",
              ].map((item, index) => (
                <label
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-slate-50/90 p-4"
                >
                  <input
                    className="h-4 w-4 rounded border-slate-300 text-primary"
                    defaultChecked={index === 1}
                    type="checkbox"
                  />
                  {item}
                </label>
              ))}
            </div>
          </GlassPanel>

          <MetricCard
            hint="Policy overrides are enforced by the runtime on every launch."
            icon={ShieldCheck}
            label="Safety Review"
            tone="mint"
            value="Enabled"
          />
          <MetricCard
            hint="Video storage inherits the workspace retention policy."
            icon={Video}
            label="Data Policy"
            tone="violet"
            value="Inherited"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
        <ButtonLink href="/developer/console/connect-repo" size="lg" variant="secondary">
          Back to Repo
        </ButtonLink>
        <ButtonLink href="/developer/console/app-config" size="lg">
          Continue to App Config
          <ArrowRight className="h-5 w-5" />
        </ButtonLink>
      </div>
    </DeveloperConsoleShell>
  );
}
