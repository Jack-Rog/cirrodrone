import type { ReactNode } from "react";

import {
  BranchFooter,
  BranchTopNav,
  CirroBackdrop,
  CirroContainer,
  GlassPanel,
  ProgressRow,
  SectionTag,
} from "@/components/cirro/shared";

const developerNav = [
  { href: "/developer", key: "home", label: "Home" },
  { href: "/developer/how-it-works", key: "how-it-works", label: "How It Works" },
  { href: "/developer/console/connect-repo", key: "console", label: "Console" },
  { href: "/developer/console/publish", key: "publish", label: "Publish" },
];

const consoleSteps = [
  { label: "Step 1", title: "Connect Repo" },
  { label: "Step 2", title: "Capabilities" },
  { label: "Step 3", title: "App Config" },
  { label: "Step 4", title: "Publish" },
];

export function DeveloperShell({
  active,
  children,
  footer = true,
}: {
  active: string;
  children: ReactNode;
  footer?: boolean;
}) {
  return (
    <CirroBackdrop>
      <BranchTopNav
        activeKey={active}
        avatarLabel="DX"
        brandHref="/developer"
        ctaHref="/developer/console/connect-repo"
        ctaLabel="Build an App"
        items={developerNav}
        searchPlaceholder="Search developer docs..."
      />
      <main className="relative z-10 pt-8">{children}</main>
      {footer ? (
        <BranchFooter
          brandHref="/developer"
          copy="Developer tooling for packaging, validating, and publishing drone software."
        />
      ) : null}
    </CirroBackdrop>
  );
}

export function DeveloperConsoleShell({
  children,
  step,
  title,
}: {
  children: ReactNode;
  step: number;
  title: string;
}) {
  return (
    <DeveloperShell active={step === 4 ? "publish" : "console"}>
      <CirroContainer className="pb-16 pt-6">
        <div className="mb-8 space-y-4">
          <SectionTag tone="sky">Developer Console</SectionTag>
          <div className="space-y-3">
            <h1 className="font-display text-5xl font-extrabold tracking-[-0.05em] text-foreground md:text-6xl">
              {title}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              Progress through the Cirro packaging pipeline and keep the developer
              branch focused on code, compatibility, and release quality.
            </p>
          </div>
        </div>
        <GlassPanel className="mb-10 p-6 md:p-7" strong>
          <ProgressRow active={step} steps={consoleSteps} />
        </GlassPanel>
        {children}
      </CirroContainer>
    </DeveloperShell>
  );
}
