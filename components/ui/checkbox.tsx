import * as React from "react";

import { cn } from "@/lib/utils";

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        {...props}
        className={cn(
          "mt-0.5 size-4 shrink-0 rounded-[0.4rem] border border-slate-300 bg-white text-primary accent-[var(--cirro-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40",
          className
        )}
        ref={ref}
        type="checkbox"
      />
    );
  }
);

Checkbox.displayName = "Checkbox";
