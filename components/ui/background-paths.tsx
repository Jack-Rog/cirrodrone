"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BackgroundPathsProps = {
  buttonLabel?: string;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  showButton?: boolean;
  title?: string;
};

export function BackgroundPathsBackdrop({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 opacity-28">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>
    </div>
  );
}

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    duration: 20 + (i % 12) * 0.75,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        className="h-full w-full text-slate-950 dark:text-white"
        fill="none"
        viewBox="0 0 696 316"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            animate={{
              opacity: [0.3, 0.6, 0.3],
              pathLength: 1,
              pathOffset: [0, 1, 0],
            }}
            d={path.d}
            initial={{ opacity: 0.6, pathLength: 0.3 }}
            key={path.id}
            stroke="currentColor"
            strokeOpacity={0.1 + path.id * 0.03}
            strokeWidth={path.width}
            transition={{
              duration: path.duration,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths({
  buttonLabel = "Discover Excellence",
  children,
  className,
  contentClassName,
  showButton = true,
  title = "Background Paths",
}: BackgroundPathsProps) {
  const words = title.split(" ");

  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white dark:bg-neutral-950",
        className
      )}
    >
      <BackgroundPathsBackdrop />

      <div
        className={cn(
          "relative z-10 container mx-auto px-4 text-center md:px-6",
          contentClassName
        )}
      >
        {children ? (
          children
        ) : (
          <motion.div
            animate={{ opacity: 1 }}
            className="mx-auto max-w-4xl"
            initial={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            <h1 className="mb-8 text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl">
              {words.map((word, wordIndex) => (
                <span className="mr-4 inline-block last:mr-0" key={wordIndex}>
                  {word.split("").map((letter, letterIndex) => (
                    <motion.span
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-block bg-gradient-to-r from-neutral-900 to-neutral-700/80 bg-clip-text text-transparent dark:from-white dark:to-white/80"
                      initial={{ opacity: 0, y: 100 }}
                      key={`${wordIndex}-${letterIndex}`}
                      transition={{
                        damping: 25,
                        delay: wordIndex * 0.1 + letterIndex * 0.03,
                        stiffness: 150,
                        type: "spring",
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>

            {showButton ? (
              <div className="group relative inline-block overflow-hidden rounded-2xl bg-gradient-to-b from-black/10 to-white/10 p-px shadow-lg backdrop-blur-lg transition-shadow duration-300 hover:shadow-xl dark:from-white/10 dark:to-black/10">
                <Button
                  className="rounded-[1.15rem] border border-black/10 bg-white/95 px-8 py-6 text-lg font-semibold text-black transition-all duration-300 hover:bg-white/100 hover:shadow-md group-hover:-translate-y-0.5 dark:border-white/10 dark:bg-black/95 dark:text-white dark:hover:bg-black/100 dark:hover:shadow-neutral-800/50"
                  variant="ghost"
                >
                  <span className="opacity-90 transition-opacity group-hover:opacity-100">
                    {buttonLabel}
                  </span>
                  <span className="ml-3 opacity-70 transition-all duration-300 group-hover:translate-x-1.5 group-hover:opacity-100">
                    →
                  </span>
                </Button>
              </div>
            ) : null}
          </motion.div>
        )}
      </div>
    </div>
  );
}
