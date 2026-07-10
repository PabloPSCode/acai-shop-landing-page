"use client";

import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "primary" | "secondary";
  /** Stretch to the container width instead of the fixed 200px rail. */
  block?: boolean;
}

/**
 * The only two action buttons in the system. A screen shows at most one of
 * each. Interaction is colour-only: no scale, no translate, no shadow.
 */
export default function CTAButton({
  label,
  variant = "primary",
  block = false,
  className,
  ...props
}: CTAButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex min-h-10 items-center justify-center rounded-control px-4 text-nav font-medium tracking-normal",
        "border-[3px] border-transparent transition-colors duration-base",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        block ? "w-full" : "w-[200px] max-w-full",
        variant === "primary"
          ? "bg-primary-500 text-white hover:bg-primary-600"
          : "bg-bg-card text-graphite hover:bg-surface-alt",
        className,
      )}
      {...props}
    >
      {label}
    </button>
  );
}
