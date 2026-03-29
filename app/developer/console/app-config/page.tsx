import { Cloud, ImagePlus, Monitor, Rocket, Settings2, Store, UploadCloud } from "lucide-react";

import { DeveloperConsoleShell } from "@/components/cirro/developer-shell";
import { ButtonLink, GlassPanel } from "@/components/cirro/shared";

export default function DeveloperAppConfigPage() {
  return (
    <DeveloperConsoleShell step={3} title="App Configuration">
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <GlassPanel className="p-8">
            <div className="mb-8 flex items-center gap-3">
              <Settings2 className="h-8 w-8 text-primary" />
              <h2 className="font-display text-3xl font-extrabold tracking-tight">
                Core Identity
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  App Name
                </label>
                <input className="cirro-input" defaultValue="Cirro Inspect" type="text" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Category
                </label>
                <select className="cirro-input">
                  <option>Inspection</option>
                  <option>Mapping & Surveying</option>
                  <option>Search & Rescue</option>
                  <option>Agriculture</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Pricing Model
                </label>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="rounded-[1.4rem] border-2 border-primary bg-sky-50/70 p-5">
                    <input className="sr-only" defaultChecked name="pricing" type="radio" />
                    <span className="font-display text-lg font-extrabold tracking-tight">
                      Free
                    </span>
                    <span className="mt-2 block text-sm text-muted-foreground">
                      Standard public access for teams piloting early marketplace runs.
                    </span>
                  </label>
                  <label className="rounded-[1.4rem] border border-white/70 bg-white/72 p-5">
                    <input className="sr-only" name="pricing" type="radio" />
                    <span className="font-display text-lg font-extrabold tracking-tight">
                      Subscription
                    </span>
                    <span className="mt-2 block text-sm text-muted-foreground">
                      Recurring billing for advanced operators and enterprise fleets.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-8">
            <div className="mb-8 flex items-center gap-3">
              <ImagePlus className="h-8 w-8 text-primary" />
              <h2 className="font-display text-3xl font-extrabold tracking-tight">
                Visual Assets
              </h2>
            </div>
            <div className="rounded-[1.8rem] border-2 border-dashed border-slate-200 bg-slate-50/90 p-12 text-center">
              <UploadCloud className="mx-auto h-10 w-10 text-slate-400" />
              <p className="mt-4 font-display text-xl font-extrabold tracking-tight">
                Upload App Screenshots
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Drag and drop PNG or JPG files at 1920x1080 or higher.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[1, 2, 3, 4].map((slot) => (
                <div
                  key={slot}
                  className="aspect-video rounded-[1.2rem] border border-dashed border-slate-200 bg-slate-50/90"
                />
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="p-8">
            <div className="mb-8 flex items-center gap-3">
              <Rocket className="h-8 w-8 text-primary" />
              <h2 className="font-display text-3xl font-extrabold tracking-tight">
                Deployment Strategy
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] border-2 border-primary bg-sky-50/70 p-6">
                <Cloud className="h-6 w-6 text-primary" />
                <p className="mt-4 font-display text-xl font-extrabold tracking-tight">
                  Internal Test Channel
                </p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Deploy to invited hardware IDs only while the runtime and safety rules
                  are being validated.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/70 bg-white/72 p-6">
                <Store className="h-6 w-6 text-primary" />
                <p className="mt-4 font-display text-xl font-extrabold tracking-tight">
                  Store Publish
                </p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Submit the release candidate to the Cirro marketplace review queue.
                </p>
              </div>
            </div>
          </GlassPanel>
        </div>

        <div className="space-y-6">
          <GlassPanel className="sticky top-28 p-8">
            <div className="mb-6 flex items-center gap-3">
              <Monitor className="h-7 w-7 text-primary" />
              <h2 className="font-display text-2xl font-extrabold tracking-tight">
                Compatibility Preview
              </h2>
            </div>
            <p className="text-sm leading-7 text-muted-foreground">
              Based on your category and capability selections, Cirro will target the
              following hardware profile.
            </p>
            <div className="mt-6 space-y-3">
              {[
                { label: "Cirro Stratus X1", note: "Fully Compatible" },
                { label: "Cirro Titan H8", note: "Fully Compatible" },
                { label: "Aero Legacy V2", note: "Limited Payload API" },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className={`rounded-[1.3rem] p-4 ${
                    index < 2 ? "bg-white/84" : "bg-slate-100/70 opacity-70"
                  }`}
                >
                  <p className="font-display text-lg font-extrabold tracking-tight">
                    {item.label}
                  </p>
                  <p
                    className={`mt-1 text-sm ${
                      index < 2 ? "text-primary" : "text-destructive"
                    }`}
                  >
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-3 rounded-[1.5rem] bg-slate-50/85 p-5 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Runtime Channel</span>
                <span className="font-semibold text-foreground">cirro-core-v1</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Manifest Status</span>
                <span className="font-semibold text-foreground">Ready</span>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
        <ButtonLink href="/developer/console/capabilities" size="lg" variant="secondary">
          Back to Capabilities
        </ButtonLink>
        <ButtonLink href="/developer/console/publish" size="lg">
          Continue to Publish
        </ButtonLink>
      </div>
    </DeveloperConsoleShell>
  );
}
