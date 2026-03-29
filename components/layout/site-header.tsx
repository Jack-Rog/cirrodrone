"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, RadioTower } from "lucide-react";

import { buttonVariants } from "@/lib/button-styles";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home", match: (pathname: string) => pathname === "/" },
  {
    href: "/product/app-library",
    label: "Apps",
    match: (pathname: string) => pathname.startsWith("/product"),
  },
  {
    href: "/sessions",
    label: "Sessions",
    match: (pathname: string) => pathname.startsWith("/sessions"),
  },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isMarketing =
    pathname === "/" ||
    pathname.startsWith("/submit-repo") ||
    pathname.startsWith("/design-partner") ||
    pathname.startsWith("/thank-you");

  const cta = isMarketing
    ? { href: "/submit-repo", label: "Start Building" }
    : { href: "/product/runtime-preview", label: "Connect Drone" };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/70 bg-white/80 glass-panel shadow-[0_12px_30px_-28px_rgba(32,47,63,0.8)]">
      <div className="section-shell flex h-20 items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-6 lg:gap-12">
          <Link className="min-w-0 font-display text-2xl font-extrabold tracking-[-0.04em] text-primary" href="/">
            Cirro
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                aria-current={link.match(pathname) ? "page" : undefined}
                className={cn(
                  "border-b-2 border-transparent pb-1 font-display text-sm font-bold tracking-tight text-muted-foreground hover:text-primary",
                  link.match(pathname) && "border-primary text-primary"
                )}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link className={cn(buttonVariants({ size: "lg" }), "h-11 rounded-full px-6 text-sm")} href={cta.href}>
            {cta.label}
          </Link>
          <span className="hidden size-10 items-center justify-center rounded-full border border-border/80 bg-white/80 text-primary shadow-[0_10px_20px_-18px_rgba(32,47,63,0.8)] sm:flex">
            <RadioTower className="size-4" />
          </span>
          <Link
            className="flex size-10 items-center justify-center rounded-full border border-border/80 bg-white/80 text-primary shadow-[0_10px_20px_-18px_rgba(32,47,63,0.8)]"
            href={isMarketing ? "/design-partner" : "/submit-repo"}
          >
            <ArrowUpRight className="size-4" />
            <span className="sr-only">Open Cirro portal</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
