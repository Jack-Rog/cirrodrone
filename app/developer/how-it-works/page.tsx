import { Code2, Compass, Store } from "lucide-react";

import { DeveloperShell } from "@/components/cirro/developer-shell";
import { ButtonLink, CirroContainer, GlassPanel, SectionTag } from "@/components/cirro/shared";

export default function DeveloperHowItWorksPage() {
  return (
    <DeveloperShell active="how-it-works">
      <CirroContainer className="pb-12 pt-10">
        <section className="max-w-4xl pb-12">
          <SectionTag tone="mint">Process Overview</SectionTag>
          <h1 className="mt-6 font-display text-6xl font-extrabold tracking-[-0.06em] text-foreground md:text-[4.6rem]">
            From Code to <span className="text-primary">Flight.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-muted-foreground">
            Cirro provides the bridge between software logic and industrial drone
            hardware. The developer stream stays focused on tooling, packaging, and
            distribution.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              description:
                "Developers define flight patterns, operator UI, and mission triggers with familiar frontend and mobile tooling.",
              icon: Code2,
              title: "1. Logic & UI",
            },
            {
              description:
                "Cirro owns the hardware abstraction layer so controller quirks and telemetry differences do not leak into your app.",
              icon: Compass,
              title: "2. Execution",
            },
            {
              description:
                "Publish into the marketplace as free, private, or commercial software with compatibility rules attached.",
              icon: Store,
              title: "3. Distribution",
            },
          ].map(({ description, icon: Icon, title }) => (
            <GlassPanel key={title} className="p-8 md:p-10">
              <div className="mb-8 inline-flex rounded-2xl bg-sky-100 p-4 text-primary">
                <Icon className="h-7 w-7" />
              </div>
              <h2 className="font-display text-2xl font-extrabold tracking-tight">{title}</h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">{description}</p>
            </GlassPanel>
          ))}
        </section>

        <section className="pt-14">
          <div className="primary-gradient rounded-[2.4rem] px-8 py-12 text-center text-white shadow-[0_34px_80px_-34px_rgba(31,70,100,0.58)] md:px-14 md:py-16">
            <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
              Ready to launch your first mission?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-sky-100/80">
              Start the console flow and move directly into repo connection, capability
              declaration, and release review.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <ButtonLink href="/developer/console/connect-repo" size="lg" variant="secondary">
                Start Building
              </ButtonLink>
              <ButtonLink href="/developer" size="lg" variant="ghost" className="border border-white/20 text-white hover:bg-white/10">
                Back to Home
              </ButtonLink>
            </div>
          </div>
        </section>
      </CirroContainer>
    </DeveloperShell>
  );
}
