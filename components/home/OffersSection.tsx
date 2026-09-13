import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { Product } from "@/lib/types";

export function OffersSection({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="bg-ink py-20 text-cream md:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Por tempo limitado"
            title="Ofertas"
            description="Peças selecionadas com condições especiais — desconto calculado automaticamente."
            tone="cream"
          />
          <LinkButton href="/ofertas" variant="outline" size="sm" className="hidden sm:inline-flex">
            Ver todas
          </LinkButton>
        </div>

        <div className="mt-12">
          <ProductGrid products={products} tone="dark" />
        </div>

        <div className="mt-10 sm:hidden">
          <LinkButton href="/ofertas" variant="outline" size="sm" className="w-full justify-center">
            Ver todas as ofertas
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
