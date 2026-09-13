import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "ink",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "ink" | "cream";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-xs uppercase tracking-[0.3em]",
            tone === "cream" ? "text-gold-soft" : "text-gold-deep"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl md:text-4xl font-medium text-balance",
          tone === "cream" ? "text-cream" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-sm md:text-base leading-relaxed",
            tone === "cream" ? "text-cream/70" : "text-ink/60"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
