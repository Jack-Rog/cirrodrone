import type { ReactNode } from "react";

import { BranchFooter, BranchTopNav, CirroBackdrop } from "@/components/cirro/shared";

const pilotNav = [
  { href: "/pilot", key: "home", label: "Home" },
  { href: "/pilot/apps", key: "apps", label: "Apps" },
  { href: "/pilot/sessions", key: "sessions", label: "Sessions" },
];

export function PilotShell({
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
        avatarLabel="PL"
        brandHref="/pilot"
        ctaHref="/pilot/apps/cirro-inspect/setup"
        ctaLabel="Connect Drone"
        items={pilotNav}
      />
      <main className="relative z-10 pt-8">{children}</main>
      {footer ? (
        <BranchFooter
          brandHref="/pilot"
          copy="Pilot-facing runtime surfaces for launching, reviewing, and replaying missions."
        />
      ) : null}
    </CirroBackdrop>
  );
}
