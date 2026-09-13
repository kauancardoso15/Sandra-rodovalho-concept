import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Novidades",
  description: "Confira as peças que acabaram de chegar na Sandra Rodovalho Concept.",
};

export default async function NovidadesPage() {
  const products = await getProducts({ onlyNew: true });

  return (
    <div className="py-16 md:py-20">
      <Container>
        <SectionHeading
          eyebrow="Acabou de chegar"
          title="Novidades"
          description="Descubra as peças que acabaram de chegar — selecionadas para elevar seu guarda-roupa nesta temporada."
        />
        <div className="mt-12">
          <ProductGrid
            products={products}
            emptyMessage="Novas peças chegam em breve. Volte para conferir as próximas novidades."
          />
        </div>
      </Container>
    </div>
  );
}
