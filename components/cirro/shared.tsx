import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Search, type LucideIcon, UserRound } from "lucide-react";

import { CirroLogo } from "@/components/brand/cirro-logo";
import { cn } from "@/lib/utils";

export type NavItem = {
  href: string;
  key: string;
  label: string;
};

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";
type Tone = "sky" | "mint" | "violet" | "slate";

const toneStyles: Record<Tone, string> = {
  mint: "bg-emerald-100/85 text-emerald-700",
  sky: "bg-sky-100/85 text-sky-700",
  slate: "bg-slate-100/90 text-slate-700",
  violet: "bg-violet-100/90 text-violet-700",
};

export function buttonStyles({
  className,
  size = "md",
  variant = "primary",
}: {
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-display font-extrabold tracking-tight transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200/70",
    size === "sm" && "px-5 py-2.5 text-sm",
    size === "md" && "px-6 py-3 text-sm md:text-base",
    size === "lg" && "px-8 py-4 text-base md:text-lg",
    variant === "primary" &&
      "primary-gradient text-primary-foreground shadow-[0_26px_55px_-28px_rgba(31,70,100,0.65)] hover:-translate-y-0.5",
    variant === "secondary" &&
      "border border-white/70 bg-white/80 text-foreground shadow-[0_18px_40px_-28px_rgba(24,44,71,0.35)] hover:border-sky-200 hover:bg-white",
    variant === "ghost" &&
      "bg-slate-900/8 text-foreground hover:bg-slate-900/12",
    className
  );
}

export function ButtonLink({
  children,
  className,
  href,
  size = "md",
  variant = "primary",
}: {
  children: ReactNode;
  className?: string;
  href: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
}) {
  return (
    <Link className={buttonStyles({ className, size, variant })} href={href}>
      {children}
    </Link>
  );
}

export function BrandMark({ href }: { href: string }) {
  return (
    <Link aria-label="Cirro" className="shrink-0" href={href}>
      <CirroLogo size={36} />
    </Link>
  );
}

export function MockAvatar({ label = "AR" }: { label?: string }) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/75 bg-gradient-to-br from-sky-200 via-white to-slate-100 text-sm font-bold text-slate-700 shadow-[0_16px_30px_-24px_rgba(29,47,70,0.45)]">
      {label}
    </div>
  );
}

export function CirroBackdrop({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("cirro-shell min-h-screen", className)}>{children}</div>;
}

export function CirroContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("section-shell relative z-10", className)}>{children}</div>;
}

export function SectionTag({
  children,
  className,
  tone = "sky",
}: {
  children: ReactNode;
  className?: string;
  tone?: Tone;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.68rem] font-semibold tracking-[0.24em] uppercase shadow-[0_12px_30px_-24px_rgba(26,45,70,0.35)]",
        toneStyles[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function GlassPanel({
  children,
  className,
  strong = false,
}: {
  children: ReactNode;
  className?: string;
  strong?: boolean;
}) {
  return <div className={cn(strong ? "glass-card-strong" : "glass-card", className)}>{children}</div>;
}

export function BranchTopNav({
  activeKey,
  avatarLabel,
  brandHref,
  ctaHref,
  ctaLabel,
  items,
  searchPlaceholder,
}: {
  activeKey: string;
  avatarLabel?: string;
  brandHref: string;
  ctaHref?: string;
  ctaLabel?: string;
  items: NavItem[];
  searchPlaceholder?: string;
}) {
  return (
    <header className="sticky top-0 z-50 px-4 pt-4 md:px-6">
      <CirroContainer className="max-w-[1600px] px-0">
        <div className="glass-nav flex items-center justify-between rounded-[1.8rem] px-5 py-4 md:px-7">
          <div className="flex items-center gap-5 md:gap-10">
            <BrandMark href={brandHref} />
            <nav className="hidden items-center gap-2 md:flex">
              {items.map((item) => {
                const active = item.key === activeKey;
                return (
                  <Link
                    key={item.href}
                    className={cn(
                      "rounded-full px-4 py-2 font-display text-sm font-bold tracking-tight",
                      active
                        ? "bg-sky-100/90 text-primary shadow-[inset_0_0_0_1px_rgba(114,172,214,0.18)]"
                        : "text-slate-500 hover:bg-white/70 hover:text-foreground"
                    )}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            {searchPlaceholder ? (
              <label className="hidden items-center gap-3 rounded-full border border-white/70 bg-white/74 px-4 py-2 text-sm text-slate-500 shadow-[0_18px_35px_-28px_rgba(27,44,69,0.35)] xl:flex">
                <Search className="h-4 w-4" />
                <input
                  aria-label={searchPlaceholder}
                  className="w-56 bg-transparent text-sm text-slate-600 outline-none placeholder:text-slate-400"
                  placeholder={searchPlaceholder}
                  type="text"
                />
              </label>
            ) : null}
            {ctaHref && ctaLabel ? (
              <ButtonLink href={ctaHref} size="sm">
                {ctaLabel}
              </ButtonLink>
            ) : null}
            <MockAvatar label={avatarLabel} />
          </div>
        </div>
      </CirroContainer>
    </header>
  );
}

export function MetricCard({
  hint,
  icon: Icon,
  label,
  tone = "sky",
  value,
}: {
  hint?: string;
  icon: LucideIcon;
  label: string;
  tone?: Tone;
  value: string;
}) {
  return (
    <GlassPanel className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            {label}
          </p>
          <p className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground">
            {value}
          </p>
          {hint ? <p className="mt-2 text-sm text-muted-foreground">{hint}</p> : null}
        </div>
        <div className={cn("rounded-2xl p-3", toneStyles[tone])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </GlassPanel>
  );
}

export function ProgressRow({
  active,
  steps,
}: {
  active: number;
  steps: { label: string; title: string }[];
}) {
  return (
    <div className={`grid gap-4 ${steps.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
      {steps.map((step, index) => {
        const complete = index + 1 <= active;
        return (
          <div key={step.label} className="space-y-3">
            <div className="h-2 overflow-hidden rounded-full bg-white/50">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  complete ? "primary-gradient" : "bg-slate-200"
                )}
              />
            </div>
            <div className="space-y-1">
              <p
                className={cn(
                  "text-[0.68rem] font-semibold uppercase tracking-[0.24em]",
                  complete ? "text-primary" : "text-slate-400"
                )}
              >
                {step.label}
              </p>
              <p className="font-display text-base font-bold tracking-tight text-foreground">
                {step.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function BranchFooter({
  brandHref,
  copy,
}: {
  brandHref: string;
  copy: string;
}) {
  return (
    <CirroContainer className="pb-10 pt-6">
      <footer className="glass-card flex flex-col items-center justify-between gap-5 rounded-[1.8rem] px-6 py-6 text-center md:flex-row md:text-left">
        <div>
          <BrandMark href={brandHref} />
          <p className="mt-2 text-sm text-muted-foreground">{copy}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5 text-sm font-medium text-slate-500">
          <Link href="/">Landing</Link>
          <Link href="/pilot">Pilot Stream</Link>
          <Link href="/developer">Developer Stream</Link>
        </div>
      </footer>
    </CirroContainer>
  );
}

export function InlineArrow() {
  return <ArrowRight className="h-4 w-4" />;
}

export function UserBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
      <UserRound className="h-3.5 w-3.5" />
      {label}
    </div>
  );
}
