import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { Product } from "@/lib/types";

export function NewArrivalsSection({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Acabou de chegar"
            title="Novidades"
            description="Descubra as peças que acabaram de chegar."
          />
          <LinkButton href="/novidades" variant="secondary" size="sm" className="hidden sm:inline-flex">
            Ver todas
          </LinkButton>
        </div>

        <div className="mt-12">
          <ProductGrid products={products} />
        </div>

        <div className="mt-10 sm:hidden">
          <LinkButton href="/novidades" variant="secondary" size="sm" className="w-full justify-center">
            Ver todas as novidades
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
