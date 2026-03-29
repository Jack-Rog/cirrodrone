import Link from "next/link";

import { SITE_COPY } from "@/lib/copy";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/80 bg-white/72 py-12 backdrop-blur-sm">
      <div className="section-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <p className="font-display text-2xl font-extrabold tracking-[-0.04em] text-primary">
            {SITE_COPY.companyName}
          </p>
          <p className="max-w-xl text-base leading-7 text-muted-foreground">
            Building the universal software layer for drone workflows, operator
            handoffs, and mission-ready app distribution.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <div className="space-y-3">
            <p className="font-display text-sm font-bold tracking-[0.16em] uppercase text-foreground">
              Product
            </p>
            <div className="grid gap-2 text-sm text-muted-foreground">
              <Link className="hover:text-primary" href="/product/app-library">
                App library
              </Link>
              <Link className="hover:text-primary" href="/product/runtime-preview">
                Runtime preview
              </Link>
              <Link className="hover:text-primary" href="/sessions">
                Sessions
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-display text-sm font-bold tracking-[0.16em] uppercase text-foreground">
              Builder
            </p>
            <div className="grid gap-2 text-sm text-muted-foreground">
              <Link className="hover:text-primary" href="/submit-repo">
                Submit a repo
              </Link>
              <Link className="hover:text-primary" href="/design-partner">
                Design partner
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-display text-sm font-bold tracking-[0.16em] uppercase text-foreground">
              Company
            </p>
            <div className="grid gap-2 text-sm text-muted-foreground">
              <Link className="hover:text-primary" href="/">
                Home
              </Link>
              <Link className="hover:text-primary" href="/thank-you">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
