import Link from "next/link";
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";

import { CirroLogo } from "@/components/brand/cirro-logo";
import { buttonVariants } from "@/lib/button-styles";
import {
  betaAccessAudienceContent,
  isEarlyAccessAudience,
  normalizeEarlyAccessAudiences,
} from "@/lib/early-access";
import { cn } from "@/lib/utils";

type ThankYouPageProps = {
  searchParams: Promise<{
    audience?: string;
    audiences?: string;
    type?: string;
  }>;
};

function getThankYouContent(type?: string, audience?: string, audiencesParam?: string) {
  const audiences = audiencesParam
    ? normalizeEarlyAccessAudiences(audiencesParam.split(","))
    : [];

  if (type === "early-access" && audiences.length > 1) {
    return {
      body: "We will review the pilot and developer context behind your request, then follow up if Cirro looks like a strong fit.",
      title: "Beta request received",
    };
  }

  if (type === "early-access" && audience && isEarlyAccessAudience(audience)) {
    const content = betaAccessAudienceContent[audience];

    return {
      body: content.successBody,
      title: content.successTitle,
    };
  }

  if (type === "repo") {
    return {
      body: "We captured your repo submission. If it looks like a strong fit, we will follow up with the next step.",
      title: "Repo submission received",
    };
  }

  if (type === "design-partner") {
    return {
      body: "We captured your design partner application. Strong fits will be nudged toward direct founder follow-up.",
      title: "Design partner application received",
    };
  }

  return {
    body: "Thanks for getting in touch with Cirro. We will follow up if your request is a strong fit for the next step.",
    title: "Thanks for your interest",
  };
}

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const { audience, audiences, type } = await searchParams;
  const content = getThankYouContent(type, audience, audiences);

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(118,171,208,0.18),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(130,85,35,0.1),transparent_18%),linear-gradient(180deg,#fbfdff_0%,#f3f7fb_42%,#ffffff_100%)]" />

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
              href="/"
            >
              <ArrowLeft className="size-4" />
              Return home
            </Link>
          </div>

          <div className="mx-auto max-w-3xl pb-10 pt-14 text-center">
            <div className="mx-auto inline-flex rounded-full border border-[rgba(49,100,130,0.14)] bg-white/88 p-5 text-primary shadow-[0_24px_52px_-36px_rgba(22,40,65,0.24)]">
              <CheckCircle2 className="size-10" />
            </div>

            <h1 className="mt-8 text-balance font-display text-4xl font-extrabold tracking-[-0.06em] text-slate-950 sm:text-5xl lg:text-6xl">
              {content.title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              {content.body}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link className={buttonVariants({ size: "lg" })} href="/">
                Back to Cirro
              </Link>
              <a
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "border-white/90 bg-white/88 text-primary hover:bg-white"
                )}
                href="mailto:hello@cirro-drone.com"
              >
                <Mail className="size-4" />
                hello@cirro-drone.com
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
