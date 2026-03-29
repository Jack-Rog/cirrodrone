import Link from "next/link";

import { buttonStyles } from "@/components/cirro/shared";

export default function NotFound() {
  return (
    <div className="cirro-shell flex min-h-screen items-center">
      <div className="section-shell relative z-10 py-16">
        <div className="glass-card-strong mx-auto max-w-2xl p-10 text-center">
          <span className="pill-label">Route unavailable</span>
          <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-balance">
            This view is not part of the new Cirro flow.
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Start from the landing page and explore the current pilot or developer
            preview surfaces from there.
          </p>
          <div className="mt-8 flex justify-center">
            <Link className={buttonStyles({ size: "lg" })} href="/">
              Return to Cirro
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
