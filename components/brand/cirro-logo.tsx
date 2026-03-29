import Image from "next/image";

import { cn } from "@/lib/utils";

type CirroLogoProps = {
  className?: string;
  invert?: boolean;
  size?: number;
  wordmark?: boolean;
};

export function CirroLogo({
  className,
  invert = false,
  size = 120,
  wordmark = true,
}: CirroLogoProps) {
  const height = Math.max(20, size);
  const width = wordmark ? Math.round(height * 3.42) : height;
  const src = wordmark
    ? invert
      ? "/brand/cirro-logo-full-inverse.png"
      : "/brand/cirro-logo-full.png"
    : invert
      ? "/brand/cirro-mark-white.png"
      : "/brand/cirro-mark-512.png";

  return (
    <Image
      alt=""
      aria-hidden="true"
      className={cn("inline-block select-none", className)}
      draggable="false"
      height={height}
      priority={height >= 96}
      sizes={`${width}px`}
      src={src}
      style={{ height, width }}
      unoptimized
      width={width}
    />
  );
}
