import Link from "next/link";
import { ProductImage } from "@/components/ui/ProductImage";
import type { Category } from "@/lib/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/categorias/${category.slug}`} className="group block">
      <div className="photo-frame relative aspect-[4/5] w-full overflow-hidden bg-ink">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.05]">
          <ProductImage src={category.image_url} alt={category.name} label={category.name} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-display text-xl text-cream">{category.name}</h3>
          <span className="mt-1 inline-block text-[11px] uppercase tracking-[0.2em] text-gold-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Ver coleção
          </span>
        </div>
      </div>
    </Link>
  );
}
