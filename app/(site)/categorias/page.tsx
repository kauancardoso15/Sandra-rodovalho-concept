import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryCard } from "@/components/category/CategoryCard";
import { getCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Categorias",
  description: "Navegue pelas categorias da Sandra Rodovalho Concept: vestidos, conjuntos, blusas, calças, saias e acessórios.",
};

export default async function CategoriasPage() {
  const categories = await getCategories();

  return (
    <div className="py-16 md:py-20">
      <Container>
        <SectionHeading
          eyebrow="Explore"
          title="Categorias"
          description="Encontre a peça certa para cada momento, organizada em coleções pensadas para o seu estilo."
        />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </div>
  );
}
