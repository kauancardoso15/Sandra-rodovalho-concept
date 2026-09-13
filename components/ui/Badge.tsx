import { cn } from "@/lib/utils";

type BadgeTone = "gold" | "ink" | "sale" | "new";

const toneClasses: Record<BadgeTone, string> = {
  gold: "bg-gold text-ink",
  ink: "bg-ink text-cream",
  sale: "bg-ink text-gold-soft",
  new: "bg-cream text-ink border border-ink/20",
};

export function Badge({
  children,
  tone = "ink",
  className,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em]",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
