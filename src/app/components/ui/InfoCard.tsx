import Subtitle from "./Subtitle";
import Title from "./Title";

interface InfoCardProps {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
}

export default function InfoCard({
  eyebrow,
  title,
  description,
  className,
}: InfoCardProps) {
  return (
    <div
      className={[
        // Level 0: no border, no shadow. Separation comes from spacing alone.
        "min-h-[220px] overflow-hidden rounded-surface bg-bg-card p-6",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Subtitle as="span" className="text-nav font-medium text-primary-500">
        {eyebrow}
      </Subtitle>
      <Title
        as="h3"
        className="mt-3 line-clamp-2 !text-product-name sm:!text-[1.5rem]"
      >
        {title}
      </Title>
      <Subtitle className="mt-2 line-clamp-3 text-pewter">
        {description}
      </Subtitle>
    </div>
  );
}
