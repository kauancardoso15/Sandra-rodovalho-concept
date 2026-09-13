import { calcDiscountPercent, formatBRL, hasActivePromotion } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function PriceTag({
  price,
  salePrice,
  size = "md",
  tone = "light",
  className,
}: {
  price: number;
  salePrice?: number | null;
  size?: "sm" | "md" | "lg";
  tone?: "light" | "dark";
  className?: string;
}) {
  const onSale = hasActivePromotion(price, salePrice);
  const base = tone === "dark" ? "text-cream" : "text-ink";
  const muted = tone === "dark" ? "text-cream/40" : "text-ink/40";

  if (!onSale) {
    return (
      <p
        className={cn(
          "font-medium",
          base,
          size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-base",
          className
        )}
      >
        {formatBRL(price)}
      </p>
    );
  }

  return (
    <div className={cn("flex flex-wrap items-baseline gap-2", className)}>
      <span className={cn(muted, "line-through", size === "lg" ? "text-base" : "text-xs")}>
        {formatBRL(price)}
      </span>
      <span
        className={cn(
          "font-semibold",
          base,
          size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-base"
        )}
      >
        {formatBRL(salePrice as number)}
      </span>
    </div>
  );
}

/** Selo de desconto calculado automaticamente — nunca digitado manualmente. */
export function DiscountBadge({
  price,
  salePrice,
  className,
}: {
  price: number;
  salePrice?: number | null;
  className?: string;
}) {
  const percent = calcDiscountPercent(price, salePrice);
  if (percent <= 0) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center bg-ink px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-gold-soft",
        className
      )}
    >
      -{percent}%
    </span>
  );
}
