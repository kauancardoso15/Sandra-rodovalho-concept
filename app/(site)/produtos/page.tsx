import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductFilters } from "@/components/product/ProductFilters";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getCategories, getProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Produtos",
  description: "Explore todo o catálogo da Sandra Rodovalho Concept: vestidos, conjuntos, blusas, calças, saias e acessórios.",
};

interface ProdutosPageProps {
  searchParams: Promise<{
    q?: string;
    categoria?: string;
    min?: string;
    max?: string;
    novo?: string;
    oferta?: string;
  }>;
}

export default async function ProdutosPage({ searchParams }: ProdutosPageProps) {
  const params = await searchParams;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({
      search: params.q,
      categorySlug: params.categoria,
      minPrice: params.min ? Number(params.min) : undefined,
      maxPrice: params.max ? Number(params.max) : undefined,
      onlyNew: params.novo === "1",
      onlyOnSale: params.oferta === "1",
    }),
  ]);

  return (
    <div className="py-16 md:py-20">
      <Container>
        <SectionHeading eyebrow="Catálogo" title="Produtos" description="Todas as peças da coleção, em um só lugar." />

        <div className="mt-10 border-b border-ink/10 pb-10">
          <ProductFilters categories={categories} defaultValues={params} />
        </div>

        <div className="mt-10">
          <p className="mb-6 text-xs uppercase tracking-wide text-ink/40">
            {products.length} {products.length === 1 ? "produto encontrado" : "produtos encontrados"}
          </p>
          <ProductGrid
            products={products}
            emptyMessage="Nenhum produto encontrado para esses filtros. Tente ajustar a busca."
          />
        </div>
      </Container>
    </div>
  );
}
