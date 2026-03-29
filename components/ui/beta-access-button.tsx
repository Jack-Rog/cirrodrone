"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/lib/button-styles";
import { cn } from "@/lib/utils";

type SharedProps = {
  children: ReactNode;
  className?: string;
  size?: "sm" | "lg";
  tone?: "default" | "light";
};

type ButtonProps = SharedProps &
  Omit<ComponentPropsWithoutRef<"button">, "children" | "className"> & {
    href?: never;
  };

type LinkProps = SharedProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "children" | "className" | "href"> & {
    href: string;
  };

type BetaAccessButtonProps = ButtonProps | LinkProps;

function getToneClasses(tone: "default" | "light") {
  if (tone === "light") {
    return {
      button: "border-white/90 bg-white text-slate-950 hover:bg-slate-100",
      icon: "bg-slate-950/8 text-slate-950",
    };
  }

  return {
    button: "shadow-[0_18px_44px_-26px_rgba(31,70,100,0.42)]",
    icon: "bg-white/16 text-white",
  };
}

function ButtonInner({
  children,
  size = "lg",
  tone = "default",
}: SharedProps) {
  const classes = getToneClasses(tone);

  return (
    <>
      <span className="mr-8 transition-opacity duration-500 ease-out motion-reduce:transition-none group-hover:opacity-0">
        {children}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-y-1 right-1 z-10 grid place-items-center rounded-full transition-all duration-500 ease-out motion-reduce:transition-none group-active:scale-95",
          size === "sm" ? "w-9" : "w-10",
          "group-hover:w-[calc(100%-0.5rem)]",
          classes.icon
        )}
      >
        <ChevronRight aria-hidden="true" size={16} strokeWidth={2.2} />
      </span>
    </>
  );
}

export function BetaAccessButton(props: BetaAccessButtonProps) {
  const {
    children,
    className,
    size = "lg",
    tone = "default",
    ...rest
  } = props;
  const classes = getToneClasses(tone);
  const sharedClassName = cn(
    buttonVariants({ size, variant: tone === "light" ? "secondary" : "default" }),
    "group relative overflow-hidden pr-14 text-center",
    size === "sm" ? "min-w-[10.5rem]" : "min-w-[13rem]",
    classes.button,
    className
  );

  if ("href" in props) {
    const { href, ...linkProps } = rest as Omit<ComponentPropsWithoutRef<typeof Link>, "children" | "className">;

    return (
      <Link className={sharedClassName} href={href} {...linkProps}>
        <ButtonInner size={size} tone={tone}>
          {children}
        </ButtonInner>
      </Link>
    );
  }

  const buttonProps = rest as Omit<ComponentPropsWithoutRef<"button">, "children" | "className">;

  return (
    <Button className={sharedClassName} size={size} type={buttonProps.type ?? "button"} {...buttonProps}>
      <ButtonInner size={size} tone={tone}>
        {children}
      </ButtonInner>
    </Button>
  );
}
