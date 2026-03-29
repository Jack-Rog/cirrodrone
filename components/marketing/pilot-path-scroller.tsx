"use client";

import * as React from "react";
import type { CSSProperties } from "react";
import { Code2 } from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";

import { CirroLogo } from "@/components/brand/cirro-logo";
import {
  ApiIcon,
  AppIcon,
  CloudApiIcon,
  CloudInteractionIcon,
  DatabaseIcon,
  DownloadArrowIcon,
  DroneIcon,
  LightningBoltIcon,
  RemoteControlIcon,
  UsbCableIcon,
} from "@/components/icons/cirro-icons";
import { cn } from "@/lib/utils";

type IconLike = React.ComponentType<{
  className?: string;
  size?: number;
  style?: CSSProperties;
}>;

type PilotPathStep = {
  description: string[];
  icon: IconLike;
  id: string;
  title: string;
};

const pilotPathSteps: PilotPathStep[] = [
  {
    description: ["Install Cirro for free on your computer."],
    icon: DownloadArrowIcon,
    id: "01",
    title: "Download Cirro",
  },
  {
    description: ["Connect your remote and drone to Cirro via USB cable"],
    icon: UsbCableIcon,
    id: "02",
    title: "Plug in your remote",
  },
  {
    description: [
      "Deploy industry-leading apps in one click.",
      "Write custom workflows yourself using Python.",
      "Leverage your data in new ways.",
      "Unlock your drone's true potential purely with software.",
    ],
    icon: CloudInteractionIcon,
    id: "03",
    title: "Unlock your drone's potential",
  },
] as const;

const carouselTiles = [
  { icon: AppIcon, id: "apps", label: "Apps" },
  { icon: DatabaseIcon, id: "storage", label: "Data Storage" },
  { icon: ApiIcon, id: "apis", label: "APIs" },
  { icon: Code2, id: "code", label: "</>" },
] as const;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function mix(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

function rangeProgress(value: number, start: number, end: number) {
  if (end <= start) {
    return value >= end ? 1 : 0;
  }

  return clamp((value - start) / (end - start));
}

function emphasisOpacity(progress: number, dim = 0.08) {
  return mix(dim, 1, clamp(progress));
}

function StepCard({
  activeIndex,
  index,
  mobile = false,
  step,
}: {
  activeIndex: number;
  index: number;
  mobile?: boolean;
  step: PilotPathStep;
}) {
  const Icon = step.icon;
  const isActive = index === activeIndex;
  const isComplete = index < activeIndex;
  const isExpanded = mobile ? true : isActive;

  return (
    <motion.div
      animate={{
        opacity: isActive ? 1 : isComplete ? (mobile ? 0.92 : 0.78) : 0.44,
        scale: isExpanded ? 1 : 0.97,
        y: isExpanded ? 0 : 8,
      }}
      className={cn(
        "w-full rounded-[2rem] border transition-colors duration-300",
        isExpanded
          ? "border-[rgba(49,100,130,0.16)] bg-white shadow-[0_28px_64px_-36px_rgba(22,40,65,0.28)]"
          : "border-white/70 bg-white/68 shadow-[0_18px_44px_-34px_rgba(22,40,65,0.18)]"
      )}
      transition={{ duration: 0.32, ease: "easeOut" }}
    >
      <div className={cn("flex items-center gap-4", isExpanded ? "p-5 md:p-6" : "px-4 py-3.5 md:px-5")}>
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-[1.25rem] border transition-all duration-300",
            isExpanded
              ? "h-14 w-14 border-[rgba(49,100,130,0.14)] bg-[rgba(49,100,130,0.08)] text-primary"
              : "h-10 w-10 border-slate-200 bg-white text-slate-500"
          )}
        >
          <Icon size={isExpanded ? 28 : 20} />
        </div>

        <div className="min-w-0">
          <p className="text-[0.68rem] font-semibold tracking-[0.22em] text-slate-500 uppercase">
            Step {step.id}
          </p>
          <h3
            className={cn(
              "mt-1 font-display font-extrabold tracking-[-0.04em] text-slate-950",
              isExpanded ? "text-2xl md:text-[2rem]" : "text-lg md:text-xl"
            )}
          >
            {step.title}
          </h3>
        </div>
      </div>

      <motion.div
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        className="overflow-hidden"
        transition={{ duration: 0.26, ease: "easeOut" }}
      >
        <div className={cn("px-5 pb-5 md:px-6 md:pb-6", mobile ? "pt-0" : "pt-0")}>
          <div className="space-y-2.5">
            {step.description.map((line) => (
              <p className="text-sm leading-7 text-slate-600 md:text-base" key={line}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function UseCaseCarousel({
  active,
  mobile = false,
  reducedMotion,
}: {
  active: boolean;
  mobile?: boolean;
  reducedMotion: boolean;
}) {
  const items = [...carouselTiles, ...carouselTiles];

  return (
    <div className="relative h-full overflow-hidden rounded-[1.35rem] border border-white/85 bg-white/92 shadow-[0_18px_42px_-30px_rgba(22,40,65,0.2)]">
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-10 bg-gradient-to-r from-white via-white/90 to-transparent",
          mobile ? "w-4" : "w-7"
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-10 bg-gradient-to-l from-white via-white/90 to-transparent",
          mobile ? "w-4" : "w-7"
        )}
      />
      <motion.div
        animate={
          active && !reducedMotion
            ? { x: ["0%", "-50%"] }
            : { x: "0%" }
        }
        className={cn(
          "flex h-full w-max items-center",
          mobile ? "gap-1.5 px-2" : "gap-2.5 px-3"
        )}
        transition={
          active && !reducedMotion
            ? { duration: 10.5, ease: "linear", repeat: Number.POSITIVE_INFINITY }
            : { duration: 0.2 }
        }
      >
        {items.map((tile, index) => {
          const Icon = tile.icon;

          return (
            <div
              className={cn(
                "flex min-w-max items-center rounded-full border border-[rgba(49,100,130,0.12)] bg-[rgba(255,255,255,0.94)] font-semibold tracking-[0.14em] text-slate-600 uppercase",
                mobile ? "gap-1.5 px-2 py-1 text-[0.55rem]" : "gap-2 px-3 py-1.5 text-[0.68rem]"
              )}
              key={`${tile.id}-${index}`}
            >
              {tile.id === "code" ? (
                <span className={cn("font-mono tracking-[0.12em]", mobile ? "text-[0.62rem]" : "text-[0.78rem]")}>
                  {tile.label}
                </span>
              ) : (
                <Icon size={mobile ? 11 : 14} />
              )}
              <span>{tile.label}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

function DiagramCloud({
  mobile,
  reducedMotion,
  emphasis,
}: {
  mobile: boolean;
  reducedMotion: boolean;
  emphasis: number;
}) {
  const widthClassName = mobile ? "w-[6.9rem]" : "w-[20rem]";
  const left = mobile ? "64%" : "67%";

  return (
    <motion.div
      animate={{
        opacity: emphasisOpacity(emphasis),
      }}
      className={cn("absolute -translate-x-1/2 -translate-y-1/2", widthClassName)}
      style={{ left, top: mobile ? "24%" : "22%" }}
      transition={{ duration: reducedMotion ? 0.01 : 0.24, ease: "easeOut" }}
    >
      <div className="relative w-full pt-5 sm:pt-6">
        <div
          className={cn(
            "absolute left-1/2 z-10 flex -translate-x-1/2 items-center justify-center rounded-full border border-[rgba(130,85,35,0.22)] bg-white text-[color:var(--cirro-tertiary)] shadow-[0_18px_40px_-28px_rgba(73,54,26,0.24)]",
            mobile ? "-top-3 h-7 w-7" : "-top-5 h-10 w-10"
          )}
        >
          <CloudApiIcon size={mobile ? 10 : 14} />
        </div>
        <div
          className={cn(
            "flex items-center rounded-[2.2rem] border-2 border-dashed border-[rgba(130,85,35,0.24)] bg-white shadow-[0_28px_66px_-40px_rgba(22,40,65,0.24)] backdrop-blur-xl",
            mobile ? "h-[3rem] px-1.5" : "h-[5.35rem] px-4"
          )}
        >
          <UseCaseCarousel
            active={emphasis > 0.15}
            mobile={mobile}
            reducedMotion={reducedMotion}
          />
        </div>
      </div>
    </motion.div>
  );
}

function SceneDevice({
  mobile,
  reducedMotion,
  emphasis,
}: {
  mobile: boolean;
  reducedMotion: boolean;
  emphasis: number;
}) {
  const finalX = mobile ? 64 : 67;
  const top = mobile ? 68 : 68;
  const widthClassName = mobile ? "w-[6.9rem]" : "w-[11.2rem]";

  return (
    <motion.div
      animate={{
        opacity: emphasisOpacity(emphasis),
      }}
      className={cn("absolute -translate-x-1/2 -translate-y-1/2", widthClassName)}
      style={{ left: `${finalX}%`, top: `${top}%` }}
      transition={{ duration: reducedMotion ? 0.01 : 0.24, ease: "easeOut" }}
    >
      <div
        className={cn(
          "relative rounded-[1.9rem] border border-[rgba(49,100,130,0.16)] bg-white/96 shadow-[0_28px_62px_-34px_rgba(22,40,65,0.28)]",
          mobile ? "p-2.5" : "p-3"
        )}
      >
        <div className="relative flex aspect-[4/3] items-center justify-center rounded-[1.25rem] border border-[rgba(49,100,130,0.12)] bg-[linear-gradient(145deg,rgba(242,247,252,0.96),rgba(226,236,247,0.92))]">
          <CirroLogo size={mobile ? 22 : 38} wordmark={false} />
        </div>
      </div>
      <div className="mx-auto mt-2 h-2 w-[42%] rounded-full bg-slate-300/85" />
    </motion.div>
  );
}

function SceneRemote({
  mobile,
  emphasis,
  reducedMotion,
}: {
  mobile: boolean;
  emphasis: number;
  reducedMotion: boolean;
}) {
  const top = mobile ? 68 : 68;

  return (
    <motion.div
      animate={{
        opacity: emphasisOpacity(emphasis),
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: mobile ? "28%" : "25%", top: `${top}%` }}
      transition={{ duration: reducedMotion ? 0.01 : 0.24, ease: "easeOut" }}
    >
      <div
        className={cn(
          "rounded-[1.8rem] border border-[rgba(49,100,130,0.16)] bg-white/96 shadow-[0_26px_58px_-34px_rgba(22,40,65,0.24)]",
          mobile ? "p-2.5" : "p-3"
        )}
      >
        <RemoteControlIcon size={mobile ? 30 : 50} />
      </div>
    </motion.div>
  );
}

function SceneDrone({
  mobile,
  emphasis,
  reducedMotion,
}: {
  mobile: boolean;
  emphasis: number;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      animate={{
        opacity: emphasisOpacity(emphasis),
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: mobile ? "28%" : "25%", top: mobile ? "26%" : "22%" }}
      transition={{ duration: reducedMotion ? 0.01 : 0.24, ease: "easeOut" }}
    >
      <div
        className={cn(
          "rounded-[1.8rem] border border-[rgba(49,100,130,0.16)] bg-white/96 shadow-[0_26px_58px_-34px_rgba(22,40,65,0.24)]",
          mobile ? "p-2.5" : "p-3"
        )}
      >
        <DroneIcon size={mobile ? 30 : 50} />
      </div>
    </motion.div>
  );
}

function SceneUsbLink({
  mobile,
  emphasis,
  reducedMotion,
}: {
  mobile: boolean;
  emphasis: number;
  reducedMotion: boolean;
}) {
  const remoteX = mobile ? 34.5 : 31.4;
  const remoteY = mobile ? 68 : 68;
  const computerX = mobile ? 55.2 : 57.8;
  const computerY = mobile ? 68 : 68;
  const badgeX = mix(remoteX, computerX, 0.5);
  const badgeY = mix(remoteY, computerY, 0.5);

  return (
    <>
      <motion.svg
        className="absolute inset-0 h-full w-full overflow-visible"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <motion.path
          animate={{
            opacity: emphasisOpacity(emphasis, 0.06),
          }}
          d={`M ${remoteX} ${remoteY} L ${computerX} ${computerY}`}
          stroke="rgba(90,102,117,0.92)"
          strokeLinecap="round"
          strokeWidth={mobile ? 2.1 : 2.4}
          transition={{ duration: reducedMotion ? 0.01 : 0.24, ease: "easeOut" }}
        />
      </motion.svg>

      <motion.div
        animate={{ opacity: emphasisOpacity(emphasis, 0.06) }}
        className="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(90,102,117,0.14)] bg-white/96 p-1 text-slate-900 shadow-[0_16px_34px_-24px_rgba(22,40,65,0.22)]"
        style={{ left: `${badgeX}%`, top: `${badgeY}%` }}
        transition={{ duration: reducedMotion ? 0.01 : 0.24, ease: "easeOut" }}
      >
        <LightningBoltIcon size={mobile ? 17 : 26} />
      </motion.div>
    </>
  );
}

function SceneCloudLink({
  mobile,
  emphasis,
  reducedMotion,
}: {
  mobile: boolean;
  emphasis: number;
  reducedMotion: boolean;
}) {
  const cloudX = mobile ? 63 : 66;
  const lineTopY = mobile ? 39.5 : 36.5;
  const lineBottomY = mobile ? 51 : 48;
  const leftX = cloudX - (mobile ? 1.2 : 1.45);
  const rightX = cloudX + (mobile ? 2.2 : 3.1);
  const cloudStroke = "rgba(130,85,35,0.24)";
  const lineWidth = mobile ? 0.55 : 0.62;
  const arrowWidth = mobile ? 0.45 : 0.5;
  const arrowInset = mobile ? 1.4 : 1.55;
  const arrowGap = mobile ? 2.25 : 2.65;
  const dotPattern = mobile ? "0.12 1.18" : "0.12 1.28";

  return (
    <motion.svg
      className="absolute inset-0 h-full w-full overflow-visible"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <motion.path
        animate={{
          opacity: emphasisOpacity(emphasis, 0.06),
        }}
        d={`M ${leftX} ${lineTopY} L ${leftX} ${lineBottomY - arrowGap}`}
        stroke={cloudStroke}
        strokeDasharray={dotPattern}
        strokeLinecap="round"
        strokeWidth={lineWidth}
        transition={{ duration: reducedMotion ? 0.01 : 0.24, ease: "easeOut" }}
      />
      <motion.path
        animate={{
          opacity: emphasisOpacity(emphasis, 0.06),
        }}
        d={`M ${rightX} ${lineBottomY} L ${rightX} ${lineTopY + arrowGap}`}
        stroke={cloudStroke}
        strokeDasharray={dotPattern}
        strokeLinecap="round"
        strokeWidth={lineWidth}
        transition={{ duration: reducedMotion ? 0.01 : 0.24, ease: "easeOut" }}
      />
      <motion.path
        animate={{ opacity: emphasisOpacity(emphasis, 0.06) }}
        d={`M ${leftX - arrowInset} ${lineBottomY - 2.6} L ${leftX} ${lineBottomY} L ${leftX + arrowInset} ${lineBottomY - 2.6}`}
        stroke={cloudStroke}
        strokeLinecap="round"
        strokeWidth={arrowWidth}
        transition={{ duration: reducedMotion ? 0.01 : 0.24, ease: "easeOut" }}
      />
      <motion.path
        animate={{ opacity: emphasisOpacity(emphasis, 0.06) }}
        d={`M ${rightX - arrowInset} ${lineTopY + 2.6} L ${rightX} ${lineTopY} L ${rightX + arrowInset} ${lineTopY + 2.6}`}
        stroke={cloudStroke}
        strokeLinecap="round"
        strokeWidth={arrowWidth}
        transition={{ duration: reducedMotion ? 0.01 : 0.24, ease: "easeOut" }}
      />
    </motion.svg>
  );
}

function SceneWirelessSignal({
  mobile,
  emphasis,
  reducedMotion,
}: {
  mobile: boolean;
  emphasis: number;
  reducedMotion: boolean;
}) {
  const paths = mobile
    ? [
        "M 24.8 56.8 Q 28 53.8 31.2 56.8",
        "M 23.2 52.4 Q 28 48 32.8 52.4",
        "M 21.6 47.6 Q 28 41.8 34.4 47.6",
        "M 20.2 42.4 Q 28 35.4 35.8 42.4",
      ]
    : [
        "M 22.1 57.2 Q 25 53.8 27.9 57.2",
        "M 20.7 52.7 Q 25 48 29.3 52.7",
        "M 19.3 47.8 Q 25 41.6 30.7 47.8",
        "M 18 42.5 Q 25 35 32 42.5",
      ];

  return (
    <motion.svg
      animate={{ opacity: emphasisOpacity(emphasis, 0.06) }}
      className="absolute inset-0 h-full w-full overflow-visible"
      fill="none"
      preserveAspectRatio="none"
      transition={{ duration: reducedMotion ? 0.01 : 0.24, ease: "easeOut" }}
      viewBox="0 0 100 100"
    >
      {paths.map((path, index) => (
        <motion.path
          animate={
            reducedMotion
              ? { opacity: 0.72 }
              : {
                  opacity: [0.28, 0.92, 0.28],
                }
          }
          d={path}
          key={path}
          stroke="rgba(120,144,167,0.88)"
          strokeLinecap="round"
          strokeWidth={mobile ? 1.3 : 1.42}
          transition={
            reducedMotion
              ? { duration: 0.01 }
              : {
                  delay: index * 0.2,
                  duration: 1.9,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                }
          }
        />
      ))}
    </motion.svg>
  );
}

function PilotPathVisual({
  progress,
}: {
  progress: number;
}) {
  const reducedMotion = useReducedMotion();
  const mobile = false;
  const stepBand = 1 / 3;
  const emphasisSpan = stepBand * 0.14;
  const stepOne = rangeProgress(progress, 0, emphasisSpan);
  const stepTwo = rangeProgress(progress, stepBand, stepBand + emphasisSpan);
  const stepThree = rangeProgress(progress, stepBand * 2, stepBand * 2 + emphasisSpan);

  return (
    <div
      className="relative min-h-[32rem] overflow-hidden rounded-[2.6rem] border-2 border-[rgba(49,100,130,0.18)] bg-[linear-gradient(145deg,rgba(248,251,255,0.96),rgba(233,242,250,0.92))] shadow-[0_34px_90px_-46px_rgba(22,40,65,0.28)]"
      data-testid="pilot-path-visual-desktop"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_24%,rgba(49,100,130,0.12),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(130,85,35,0.1),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.76),rgba(243,248,252,0.86))]" />

      <SceneUsbLink mobile={mobile} emphasis={stepTwo} reducedMotion={Boolean(reducedMotion)} />
      <SceneCloudLink mobile={mobile} emphasis={stepThree} reducedMotion={Boolean(reducedMotion)} />
      <SceneWirelessSignal mobile={mobile} emphasis={stepTwo} reducedMotion={Boolean(reducedMotion)} />
      <DiagramCloud mobile={mobile} reducedMotion={Boolean(reducedMotion)} emphasis={stepThree} />
      <SceneDrone mobile={mobile} emphasis={stepTwo} reducedMotion={Boolean(reducedMotion)} />
      <SceneRemote mobile={mobile} emphasis={stepTwo} reducedMotion={Boolean(reducedMotion)} />
      <SceneDevice mobile={mobile} reducedMotion={Boolean(reducedMotion)} emphasis={stepOne} />
    </div>
  );
}

function PilotPathVisualMobile({
  progress,
}: {
  progress: number;
}) {
  const reducedMotion = useReducedMotion();
  const mobile = true;
  const stepBand = 1 / 3;
  const emphasisSpan = stepBand * 0.14;
  const stepOne = rangeProgress(progress, 0, emphasisSpan);
  const stepTwo = rangeProgress(progress, stepBand, stepBand + emphasisSpan);
  const stepThree = rangeProgress(progress, stepBand * 2, stepBand * 2 + emphasisSpan);

  return (
    <div
      className="relative h-[min(12.5rem,33svh)] min-h-[10.5rem] max-h-[33svh] overflow-hidden rounded-[2rem] border-2 border-[rgba(49,100,130,0.18)] bg-[linear-gradient(145deg,rgba(248,251,255,0.96),rgba(233,242,250,0.92))] shadow-[0_28px_74px_-42px_rgba(22,40,65,0.24)]"
      data-testid="pilot-path-visual-mobile"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_26%,rgba(49,100,130,0.1),transparent_26%),radial-gradient(circle_at_82%_14%,rgba(130,85,35,0.08),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.8),rgba(243,248,252,0.88))]" />

      <SceneUsbLink mobile={mobile} emphasis={stepTwo} reducedMotion={Boolean(reducedMotion)} />
      <SceneCloudLink mobile={mobile} emphasis={stepThree} reducedMotion={Boolean(reducedMotion)} />
      <SceneWirelessSignal mobile={mobile} emphasis={stepTwo} reducedMotion={Boolean(reducedMotion)} />
      <DiagramCloud mobile={mobile} reducedMotion={Boolean(reducedMotion)} emphasis={stepThree} />
      <SceneDrone mobile={mobile} emphasis={stepTwo} reducedMotion={Boolean(reducedMotion)} />
      <SceneRemote mobile={mobile} emphasis={stepTwo} reducedMotion={Boolean(reducedMotion)} />
      <SceneDevice mobile={mobile} reducedMotion={Boolean(reducedMotion)} emphasis={stepOne} />
    </div>
  );
}

export function PilotPathScroller() {
  const reducedMotion = useReducedMotion();
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = React.useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(clamp(latest));
  });

  const activeIndex = Math.min(
    pilotPathSteps.length - 1,
    Math.floor(
      clamp(progress * pilotPathSteps.length, 0, pilotPathSteps.length - 0.001)
    )
  );

  return (
    <section className="section-shell pt-3 sm:pt-4" id="how-it-fits">
      <div className="relative rounded-[2.8rem] border border-white/75 bg-[rgba(255,255,255,0.92)] shadow-[0_30px_80px_-42px_rgba(22,40,65,0.28)]">
        <div className="pointer-events-none absolute inset-0 rounded-[2.8rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.54),rgba(255,255,255,0.32))]" />

        <div className="relative p-4 sm:p-6 md:p-8 xl:p-10">
          <div ref={sectionRef} className="relative">
            <div className="hidden lg:block">
              <div className="sticky top-24 z-10 grid min-h-[calc(100svh-7rem)] grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] items-center gap-10">
                <div className="space-y-3">
                  {pilotPathSteps.map((step, index) => (
                    <StepCard
                      activeIndex={activeIndex}
                      index={index}
                      key={step.id}
                      step={step}
                    />
                  ))}
                </div>

                <PilotPathVisual
                  progress={reducedMotion ? (activeIndex + 1) / pilotPathSteps.length : progress}
                />
              </div>

              <div aria-hidden="true" className="pointer-events-none">
                {pilotPathSteps.map((step) => (
                  <div className="h-[76svh] sm:h-[80svh] lg:h-[88svh]" key={`spacer-${step.id}`} />
                ))}
              </div>
            </div>

            <div className="space-y-6 lg:hidden">
              <div className="sticky top-0 z-20 -mx-1 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.94)_72%,rgba(255,255,255,0)_100%)] px-1 pb-3 pt-1">
                <PilotPathVisualMobile
                  progress={reducedMotion ? (activeIndex + 1) / pilotPathSteps.length : progress}
                />
              </div>

              <div className="space-y-0 pt-1">
                {pilotPathSteps.map((step, index) => (
                  <div
                    className="flex min-h-[44svh] items-start pb-4"
                    key={step.id}
                  >
                    <StepCard
                      activeIndex={activeIndex}
                      index={index}
                      mobile
                      step={step}
                    />
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mt-3 max-w-5xl text-center md:mt-4"
              initial={reducedMotion ? undefined : { opacity: 0, y: 18 }}
              transition={{ duration: reducedMotion ? 0 : 0.41, ease: "easeOut" }}
            >
              <div className="rounded-[2rem] border border-[rgba(49,100,130,0.12)] bg-[linear-gradient(145deg,rgba(255,255,255,0.94),rgba(242,247,252,0.88))] px-5 py-6 shadow-[0_24px_56px_-38px_rgba(22,40,65,0.24)] md:px-10 md:py-8">
                <p className="text-balance font-display text-[clamp(1.95rem,4.35vw,3.95rem)] font-black tracking-[-0.075em] text-slate-950">
                  Cirro turns your regular drone into a <span className="text-primary">smart drone</span> with one click
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
