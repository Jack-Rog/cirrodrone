import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

import { CirroLogo } from "@/components/brand/cirro-logo";
import { BetaAccessForm } from "@/components/forms/beta-access-form";
import { buttonVariants } from "@/lib/button-styles";
import {
  genericBetaAccessContent,
  type EarlyAccessAudience,
} from "@/lib/early-access";
import { cn } from "@/lib/utils";

export function BetaAccessPage({
  preferredAudience,
}: {
  preferredAudience?: EarlyAccessAudience;
}) {
  const content = genericBetaAccessContent;

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(118,171,208,0.18),transparent_24%),radial-gradient(circle_at_86%_16%,rgba(130,85,35,0.12),transparent_20%),linear-gradient(180deg,#fbfdff_0%,#f3f7fb_42%,#ffffff_100%)]" />
        <div className="pointer-events-none absolute left-1/2 top-18 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(49,100,130,0.14),transparent_68%)] blur-3xl" />

        <main className="section-shell relative py-8 sm:py-10 lg:py-12">
          <div className="flex items-center justify-between gap-4">
            <Link aria-label="Cirro home" className="inline-flex" href="/">
              <CirroLogo size={46} wordmark={false} />
            </Link>

            <Link
              className={cn(
                buttonVariants({ size: "sm", variant: "outline" }),
                "border-white/85 bg-white/84 text-primary hover:bg-white"
              )}
              href="/#beta-access"
            >
              <ArrowLeft className="size-4" />
              Back home
            </Link>
          </div>

          <div className="grid gap-10 pb-10 pt-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start lg:gap-14 lg:pt-14">
            <section className="max-w-xl">
              <h1 className="text-balance font-display text-4xl font-extrabold tracking-[-0.06em] text-slate-950 sm:text-5xl lg:text-6xl">
                {content.heading}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                {content.supportCopy}
              </p>

              <div className="mt-8 rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-[0_24px_60px_-42px_rgba(22,40,65,0.22)]">
                <p className="text-lg font-semibold tracking-[-0.02em] text-slate-950">
                  Keep it short.
                </p>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  We only need your name, email, current platforms, biggest pain, and why you want access now.
                </p>
                <a
                  className={cn(
                    buttonVariants({ size: "sm", variant: "outline" }),
                    "mt-5 border-white/90 bg-white text-primary hover:bg-slate-50"
                  )}
                  href="mailto:hello@cirro.dev"
                >
                  <Mail className="size-4" />
                  hello@cirro.dev
                </a>
              </div>
            </section>

            <section>
              <BetaAccessForm initialAudiences={preferredAudience ? [preferredAudience] : []} />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
