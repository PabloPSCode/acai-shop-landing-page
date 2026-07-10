import type { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span";
}

export default function Title({
  children,
  className,
  as = "h2",
}: TitleProps) {
  const Component = as;

  return (
    <Component
      className={[
        // 40px (text-hero) is the ceiling at every breakpoint — type never grows past it.
        "min-w-0 font-secondary text-balance break-words text-[1.75rem] font-medium leading-[1.2] tracking-normal text-foreground sm:text-[2.125rem] lg:text-hero",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Component>
  );
}
