import Link from "next/link";
import { ProductImage } from "@/components/ui/ProductImage";
import { Badge } from "@/components/ui/Badge";
import { DiscountBadge, PriceTag } from "@/components/product/PriceTag";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductCard({
  product,
  tone = "light",
}: {
  product: Product;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";

  return (
    <Link
      href={`/produtos/${product.slug}`}
      className="group block"
      aria-label={`Ver detalhes de ${product.name}`}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <ProductImage src={product.image_url} alt={product.name} label={product.name} />
        </div>

        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.is_new && <Badge tone="new">Novidade</Badge>}
        </div>
        {product.sale_price && (
          <div className="absolute right-3 top-3">
            <DiscountBadge price={product.price} salePrice={product.sale_price} />
          </div>
        )}

        <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-cream/95 px-4 py-2.5 text-center text-[11px] uppercase tracking-[0.2em] text-ink transition-transform duration-300 group-hover:translate-y-0">
          Ver produto
        </span>
      </div>

      <div className="mt-4 space-y-1.5">
        {product.category?.name && (
          <p
            className={cn(
              "text-[11px] uppercase tracking-[0.16em]",
              isDark ? "text-cream/40" : "text-ink/40"
            )}
          >
            {product.category.name}
          </p>
        )}
        <h3
          className={cn(
            "font-display text-lg transition-colors group-hover:text-gold-soft",
            isDark ? "text-cream" : "text-ink group-hover:text-gold-deep"
          )}
        >
          {product.name}
        </h3>
        <PriceTag price={product.price} salePrice={product.sale_price} tone={tone} />
      </div>
    </Link>
  );
}
