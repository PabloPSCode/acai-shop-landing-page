import type { ReactNode } from "react";

interface SubtitleProps {
  children: ReactNode;
  className?: string;
  as?: "p" | "span";
}

export default function Subtitle({
  children,
  className,
  as = "p",
}: SubtitleProps) {
  const Component = as;

  return (
    <Component
      className={[
        "min-w-0 font-primary break-words text-body font-normal tracking-normal text-graphite",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Component>
  );
}
