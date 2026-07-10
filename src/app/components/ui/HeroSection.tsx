import type { ReactNode } from "react";

interface HeroSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  /** Full-bleed media (video/photo) rendered edge-to-edge behind the content. */
  background?: ReactNode;
  /** Wash over the media to hold text contrast. Defaults to a flat neutral. */
  scrim?: boolean;
  /** Override the scrim's appearance (e.g. a branded gradient mask). */
  scrimClassName?: string;
}

export default function HeroSection({
  children,
  id,
  className,
  containerClassName,
  background,
  scrim = false,
  scrimClassName = "bg-scrim",
}: HeroSectionProps) {
  return (
    <section
      id={id}
      className={[
        "relative min-h-screen w-full overflow-hidden",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {background ? (
        <div className="absolute inset-0 z-0 [&_video]:h-full [&_video]:w-full [&_video]:object-cover">
          {background}
        </div>
      ) : null}

      {scrim ? (
        <div
          aria-hidden="true"
          className={[
            "pointer-events-none absolute inset-0 z-10",
            scrimClassName,
          ].join(" ")}
        />
      ) : null}

      <div
        className={[
          "relative z-20 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 sm:px-6",
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
