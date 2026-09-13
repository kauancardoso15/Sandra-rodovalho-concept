import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/lib/types";

export function ProductGrid({
  products,
  emptyMessage = "Nenhum produto encontrado.",
  tone = "light",
}: {
  products: Product[];
  emptyMessage?: string;
  tone?: "light" | "dark";
}) {
  if (products.length === 0) {
    return (
      <div
        className={
          tone === "dark"
            ? "rounded-sm border border-dashed border-cream/20 py-16 text-center"
            : "rounded-sm border border-dashed border-ink/15 py-16 text-center"
        }
      >
        <p className={tone === "dark" ? "text-sm text-cream/50" : "text-sm text-ink/50"}>
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} tone={tone} />
      ))}
    </div>
  );
}
