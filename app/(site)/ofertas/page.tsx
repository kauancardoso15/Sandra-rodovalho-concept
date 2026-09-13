import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getOffers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Ofertas",
  description: "Peças selecionadas com condições especiais na Sandra Rodovalho Concept — desconto calculado automaticamente.",
};

export default async function OfertasPage() {
  const products = await getOffers();

  return (
    <div className="bg-ink py-16 text-cream md:py-20">
      <Container>
        <SectionHeading
          eyebrow="Por tempo limitado"
          title="Ofertas"
          description="Peças selecionadas com condições especiais. O desconto é sempre calculado automaticamente sobre o preço original."
          tone="cream"
        />
        <div className="mt-12">
          <ProductGrid
            products={products}
            tone="dark"
            emptyMessage="Nenhuma oferta ativa no momento. Volte em breve."
          />
        </div>
      </Container>
    </div>
  );
}
