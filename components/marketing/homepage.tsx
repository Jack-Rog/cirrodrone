"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Code2, Mail, Radio } from "lucide-react";

import { CirroLogo } from "@/components/brand/cirro-logo";
import { PilotPathScroller } from "@/components/marketing/pilot-path-scroller";
import { BetaAccessButton } from "@/components/ui/beta-access-button";
import {
  BackgroundPaths,
  BackgroundPathsBackdrop,
} from "@/components/ui/background-paths";
import {
  ApiIcon,
  AppIcon,
  CloudApiIcon,
  DatabaseIcon,
  DroneIcon,
  WorkflowIcon,
} from "@/components/icons/cirro-icons";
import { buttonVariants } from "@/lib/button-styles";
import { betaAccessAudienceContent } from "@/lib/early-access";
import { cn } from "@/lib/utils";

const heroCloudTiles = [
  { id: "apps", icon: AppIcon, label: "Apps" },
  { id: "apis", icon: ApiIcon, label: "APIs" },
  { id: "storage", icon: DatabaseIcon, label: "Data Storage" },
  { id: "workflows", icon: WorkflowIcon, label: "Workflows" },
] as const;

const betaTracks = [
  {
    eyebrow: "PILOTS",
    title: "For pilot teams",
    body: betaAccessAudienceContent.pilot.supportCopy,
    href: "/beta-access/pilot",
    icon: Radio,
    tone:
      "bg-[linear-gradient(160deg,rgba(49,100,130,0.94),rgba(40,82,111,0.96))] text-white shadow-[0_24px_68px_-34px_rgba(23,58,86,0.68)]",
    accent: "var(--cirro-primary)",
    cta: betaAccessAudienceContent.pilot.ctaLabel,
  },
  {
    eyebrow: "DEVELOPERS",
    title: "For software teams",
    body: betaAccessAudienceContent.developer.supportCopy,
    href: "/beta-access/developer",
    icon: Code2,
    tone:
      "bg-[linear-gradient(160deg,rgba(130,85,35,0.94),rgba(164,118,65,0.92))] text-white shadow-[0_24px_68px_-34px_rgba(101,67,28,0.56)]",
    accent: "var(--cirro-tertiary)",
    cta: betaAccessAudienceContent.developer.ctaLabel,
  },
];

const partnerLogos = ["DJI", "Parrot", "Autel", "Skydio", "PX4", "ArduPilot", "INAV"];

function MotionInView({
  children,
  className,
  delay = 0,
  reducedMotion,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? undefined : { opacity: 0, y: 24 }}
      transition={{ delay, duration: reducedMotion ? 0 : 0.75, ease: "easeOut" }}
      viewport={{ amount: 0.2, once: true }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

function LogoCarousel({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = React.useRef<HTMLDivElement | null>(null);
  const [loopDistance, setLoopDistance] = React.useState(0);

  React.useEffect(() => {
    const element = groupRef.current;

    if (!element) {
      return;
    }

    const updateLoopDistance = () => {
      setLoopDistance(element.offsetWidth);
    };

    updateLoopDistance();

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(updateLoopDistance);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative overflow-hidden px-2 py-4">
      <div className="mb-4 text-center">
        <p className="text-[0.72rem] font-semibold tracking-[0.26em] text-slate-500 uppercase">
          Compatible with leading platforms
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#f8fbff] via-[#f5f8fb]/88 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#f8fbff] via-[#f5f8fb]/88 to-transparent" />

        <motion.div
          animate={reducedMotion || loopDistance === 0 ? undefined : { x: [0, -loopDistance] }}
          className="flex w-max items-center will-change-transform"
          transition={
            reducedMotion || loopDistance === 0
              ? undefined
              : {
                  duration: Math.max(18, loopDistance / 34),
                  ease: "linear",
                  repeat: Number.POSITIVE_INFINITY,
                }
          }
        >
          {[0, 1, 2].map((copyIndex) => (
            <div
              className="flex shrink-0 items-center gap-10 pr-10"
              key={copyIndex}
              ref={copyIndex === 0 ? groupRef : undefined}
            >
              {partnerLogos.map((logo) => (
                <span
                  className="min-w-20 text-center text-base font-semibold tracking-[0.12em] text-slate-500 uppercase"
                  key={`${copyIndex}-${logo}`}
                >
                  {logo}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function HeroStageCard({
  icon: Icon,
  label,
  tone = "sky",
}: {
  icon?: React.ComponentType<{ className?: string; size?: number; style?: React.CSSProperties }>;
  label: string;
  tone?: "dark" | "sky";
}) {
  const isDark = tone === "dark";

  return (
    <div className="flex min-w-0 flex-col items-center gap-4 text-center">
      <div
        className={cn(
          "flex h-[5.25rem] w-[5.25rem] shrink-0 items-center justify-center rounded-[1.7rem] border shadow-[0_24px_52px_-32px_rgba(22,40,65,0.3)] backdrop-blur-xl sm:h-24 sm:w-24",
          isDark
            ? "border-[rgba(36,69,98,0.54)] bg-[linear-gradient(145deg,rgba(17,35,51,0.96),rgba(37,79,111,0.95))] text-white shadow-[0_34px_80px_-42px_rgba(17,35,51,0.8)]"
            : "border-[rgba(49,100,130,0.14)] bg-white/88 text-[color:var(--cirro-primary)]"
        )}
      >
        <div
          className={cn("flex items-center justify-center", isDark ? "text-white" : "text-[color:var(--cirro-primary)]")}
        >
          {isDark ? (
            <CirroLogo className="justify-center" invert size={54} wordmark={false} />
          ) : Icon ? (
            <Icon size={40} />
          ) : null}
        </div>
      </div>
      <p className="text-[0.9rem] font-semibold tracking-[0.22em] text-slate-600 uppercase sm:text-[0.95rem]">
        {label}
      </p>
    </div>
  );
}

function HeroConnector({
  className,
  orientation = "horizontal",
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  return orientation === "vertical" ? (
    <div className={cn("flex h-12 items-center justify-center gap-1.5", className)} aria-hidden="true">
      <span className="block h-full w-[2px] rounded-full bg-slate-300" />
      <span className="block h-full w-[2px] rounded-full bg-slate-300" />
    </div>
  ) : (
    <div className={cn("flex w-full min-w-16 flex-col gap-1.5", className)} aria-hidden="true">
      <span className="block h-[2px] w-full rounded-full bg-slate-300" />
      <span className="block h-[2px] w-full rounded-full bg-slate-300" />
    </div>
  );
}

function HeroCloudTicker() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % heroCloudTiles.length);
    }, 2800);

    return () => window.clearInterval(intervalId);
  }, [reducedMotion]);

  const activeTile = heroCloudTiles[activeIndex] ?? heroCloudTiles[0];
  const ActiveIcon = activeTile.icon;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[1.55rem] border border-white/85 bg-white/92 shadow-[0_18px_40px_-30px_rgba(22,40,65,0.2)]">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          animate={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          className="absolute inset-0 flex items-center justify-center gap-3 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(244,239,233,0.88))] px-4 text-slate-700"
          exit={reducedMotion ? undefined : { opacity: 0, y: -18 }}
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          key={activeTile.id}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: 0.48, ease: [0.22, 1, 0.36, 1] }
          }
        >
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[rgba(130,85,35,0.08)] text-[color:var(--cirro-tertiary)] sm:size-12">
            <ActiveIcon size={20} />
          </div>
          <span className="text-sm font-semibold tracking-[0.02em] sm:text-[0.96rem]">
            {activeTile.label}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function HeroCloudContainer({ className }: { className?: string }) {
  return (
    <div className={cn("flex min-w-0 flex-col items-center gap-4", className)}>
      <div className="relative w-full pt-4 sm:pt-5">
        <div className="absolute left-1/2 -top-3 z-10 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border border-[rgba(130,85,35,0.22)] bg-white text-[color:var(--cirro-tertiary)] shadow-[0_18px_40px_-28px_rgba(73,54,26,0.24)] sm:-top-4 sm:h-16 sm:w-16">
          <CloudApiIcon size={26} />
        </div>
        <div className="flex h-[5.25rem] items-center rounded-[2.35rem] border-2 border-dashed border-[rgba(130,85,35,0.24)] bg-[linear-gradient(145deg,rgba(255,255,255,0.88),rgba(243,239,232,0.82))] px-2 shadow-[0_30px_70px_-42px_rgba(22,40,65,0.24)] backdrop-blur-xl sm:h-24 sm:px-2.5">
          <HeroCloudTicker />
        </div>
      </div>
      <p className="text-[0.9rem] font-semibold tracking-[0.22em] text-slate-600 uppercase sm:text-[0.95rem]">
        Cloud
      </p>
    </div>
  );
}

export function Homepage() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative min-h-screen bg-white text-slate-900">
      <BackgroundPathsBackdrop className="z-0 opacity-45" />
      <main className="relative z-10 pb-24">
        <section className="relative overflow-hidden px-6 pb-10 pt-14 md:pt-18">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(118,171,208,0.16),transparent_24%),radial-gradient(circle_at_84%_20%,rgba(130,85,35,0.12),transparent_20%),linear-gradient(180deg,#fbfdff_0%,#f3f7fb_40%,#ffffff_100%)]" />
          <motion.div
            animate={reducedMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.3, 0.45, 0.3] }}
            className="pointer-events-none absolute left-1/2 top-24 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(49,100,130,0.16),transparent_68%)] blur-3xl"
            transition={
              reducedMotion
                ? undefined
                : { duration: 10, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }
            }
          />

          <div className="section-shell relative">
            <BackgroundPaths
              className="min-h-[22rem] rounded-[2.8rem] border border-white/75 bg-white/68 shadow-[0_30px_80px_-42px_rgba(22,40,65,0.28)] backdrop-blur-xl sm:min-h-[24rem] lg:min-h-[27rem]"
              contentClassName="px-4 py-12 sm:px-6 sm:py-14 lg:py-16"
              showButton={false}
            >
              <motion.div
                animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                className="mx-auto max-w-4xl text-center"
                initial={reducedMotion ? undefined : { opacity: 0, y: 24 }}
                transition={{ duration: reducedMotion ? 0 : 0.8, ease: "easeOut" }}
              >
                <div className="flex justify-center">
                  <CirroLogo size={96} wordmark={false} />
                </div>
                <h1 className="mt-8 text-balance font-display text-5xl font-extrabold tracking-[-0.07em] text-slate-950 sm:text-6xl lg:text-8xl">
                  Appstore for <span className="text-primary">drones</span>
                </h1>
                <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
                  Deploy custom software to your current drone set-up, no configuration required.
                </p>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                  For pilots and developers testing real drone workflows.
                </p>
                <div className="mt-8 flex justify-center">
                  <BetaAccessButton href="/beta-access" size="lg">
                    Request beta access
                  </BetaAccessButton>
                </div>
              </motion.div>
            </BackgroundPaths>

            <div className="mt-14 lg:hidden">
              <div className="rounded-[2rem] border border-white/75 bg-white/82 p-4 shadow-[0_28px_70px_-40px_rgba(26,45,70,0.28)] backdrop-blur-xl sm:p-5">
                <div className="flex flex-col gap-4">
                  <HeroStageCard
                    icon={DroneIcon}
                    label="Drone"
                  />
                  <HeroConnector orientation="vertical" />
                  <HeroStageCard
                    label="Cirro"
                    tone="dark"
                  />
                  <HeroConnector orientation="vertical" />
                  <HeroCloudContainer className="mx-auto w-full max-w-[19rem]" />
                </div>
              </div>
            </div>

            <motion.div
              animate={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
              className="mt-14 hidden lg:block"
              initial={reducedMotion ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: reducedMotion ? 0 : 1, delay: reducedMotion ? 0 : 0.25 }}
            >
              <div className="rounded-[2.5rem] border border-white/78 bg-white/84 p-8 shadow-[0_30px_80px_-42px_rgba(22,40,65,0.28)] backdrop-blur-2xl xl:p-10">
                <div className="grid items-center gap-5 xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)]">
                  <div className="flex justify-center">
                    <HeroStageCard
                      icon={DroneIcon}
                      label="Drone"
                    />
                  </div>

                  <div className="flex w-full items-center justify-center">
                    <HeroConnector className="w-16 xl:w-24" />
                  </div>

                  <div className="flex justify-center">
                    <HeroStageCard
                      label="Cirro"
                      tone="dark"
                    />
                  </div>

                  <div className="flex w-full items-center justify-center">
                    <HeroConnector className="w-16 xl:w-24" />
                  </div>

                  <div className="flex justify-center">
                    <HeroCloudContainer className="w-full max-w-[19rem]" />
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="mt-2">
              <LogoCarousel reducedMotion={Boolean(reducedMotion)} />
            </div>
          </div>
        </section>

        <PilotPathScroller />

        <section className="section-shell pt-10" id="beta-access">
          <MotionInView reducedMotion={Boolean(reducedMotion)}>
            <div className="overflow-hidden rounded-[2.8rem] bg-[linear-gradient(135deg,#16354a_0%,#255e87_44%,#7a4f20_100%)] px-5 py-12 text-white shadow-[0_34px_90px_-38px_rgba(22,40,65,0.72)] sm:px-6 md:px-12 md:py-16">
              <div className="mx-auto max-w-3xl text-center">
                <span className="inline-flex rounded-full border border-white/18 bg-white/10 px-4 py-2 text-[0.72rem] font-semibold tracking-[0.24em] text-white/72 uppercase">
                  Beta access
                </span>
                <h2 className="mt-7 font-display text-4xl font-extrabold tracking-[-0.05em] md:text-6xl">
                  Request beta access
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/78">
                  We are looking for teams with real flight ops and real software deployment needs.
                </p>
              </div>

              <div className="mt-12 grid gap-5 justify-items-center lg:grid-cols-2 lg:gap-6 lg:justify-items-stretch">
                {betaTracks.map((track, index) => {
                  const Icon = track.icon;

                  return (
                    <MotionInView
                      className="w-full max-w-[32rem] min-w-0"
                      delay={reducedMotion ? 0 : 0.12 + index * 0.08}
                      key={track.title}
                      reducedMotion={Boolean(reducedMotion)}
                    >
                      <div className={cn("mx-auto flex h-full w-full max-w-full min-w-0 flex-col overflow-hidden rounded-[2.2rem] border p-5 text-center backdrop-blur-xl sm:p-8 sm:text-left lg:min-h-[22rem]", track.tone)}>
                        <div className="flex min-w-0 flex-col items-center gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                          <div className="min-w-0 w-full">
                            <p className="break-words font-display text-[clamp(2rem,10vw,3rem)] leading-none font-black tracking-[-0.08em] text-white sm:text-5xl">
                              {track.eyebrow}
                            </p>
                            <h3 className="mt-4 text-balance font-display text-xl font-extrabold tracking-[-0.04em] text-white sm:mt-5 sm:max-w-sm sm:text-2xl">
                              {track.title}
                            </h3>
                          </div>
                          <div
                            className="shrink-0 rounded-[1.4rem] border border-white/12 p-4 text-white shadow-[0_16px_32px_-22px_rgba(22,40,65,0.45)]"
                            style={{ backgroundColor: track.accent }}
                          >
                            <Icon className="size-7" />
                          </div>
                        </div>
                        <p className="mt-5 max-w-none break-words text-base leading-7 text-white/78 sm:max-w-xl">
                          {track.body}
                        </p>
                        <div className="mt-8 lg:mt-auto lg:pt-8">
                          <BetaAccessButton className="w-full min-w-0" href={track.href} size="lg" tone="light">
                            {track.cta}
                          </BetaAccessButton>
                        </div>
                      </div>
                    </MotionInView>
                  );
                })}
              </div>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
                <span className="max-w-full break-words text-sm text-white/68">
                  Prefer a direct conversation before filling the form?
                </span>
                <a
                  className={cn(
                    buttonVariants({ size: "sm", variant: "outline" }),
                    "min-w-0 max-w-full border-white/18 bg-white text-primary hover:bg-slate-50"
                  )}
                  href="mailto:hello@cirro-drone.com"
                >
                  <Mail className="size-4" />
                  hello@cirro-drone.com
                </a>
              </div>
            </div>
          </MotionInView>
        </section>
      </main>

      <footer className="border-t border-black/6 px-6 py-12">
        <div className="section-shell">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <Link aria-label="Cirro home" className="inline-flex" href="/">
                <CirroLogo size={46} />
              </Link>
              <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                Cirro is built for teams with a concrete drone workflow,
                integration, or operational pressure worth testing early.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white px-4 py-2 text-sm font-semibold text-primary shadow-[0_18px_40px_-28px_rgba(26,45,70,0.34)] transition hover:bg-slate-50"
                href="mailto:hello@cirro-drone.com"
              >
                <Mail className="size-4" />
                hello@cirro-drone.com
              </a>
              <BetaAccessButton href="/beta-access" size="sm">
                Request beta access
              </BetaAccessButton>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
