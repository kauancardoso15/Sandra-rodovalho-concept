import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getCategoryBySlug, getProducts } from "@/lib/data";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Categoria não encontrada" };

  return {
    title: category.name,
    description: `Confira a coleção de ${category.name.toLowerCase()} da Sandra Rodovalho Concept.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const products = await getProducts({ categorySlug: slug });

  return (
    <div className="py-16 md:py-20">
      <Container>
        <SectionHeading eyebrow="Categoria" title={category.name} />
        <div className="mt-12">
          <ProductGrid
            products={products}
            emptyMessage="Nenhum produto cadastrado nesta categoria no momento."
          />
        </div>
      </Container>
    </div>
  );
}
