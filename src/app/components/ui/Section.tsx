import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
}

export default function Section({
  children,
  id,
  className,
  containerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      className={[
        "w-full scroll-mt-16 bg-background py-24 sm:py-32",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={[
          "mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-6",
          containerClassName ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </div>
    </section>
  );
}
