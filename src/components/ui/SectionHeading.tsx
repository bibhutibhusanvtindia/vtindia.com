import { clsx } from "clsx";
import { Reveal } from "@/components/ui/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal>
      <div className={clsx("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
        {eyebrow ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
            {eyebrow}
          </span>
        ) : null}
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
        {description ? <p className="mt-4 text-base leading-relaxed text-muted">{description}</p> : null}
      </div>
    </Reveal>
  );
}
