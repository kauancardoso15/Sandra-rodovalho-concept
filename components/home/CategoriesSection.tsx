import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryCard } from "@/components/category/CategoryCard";
import type { Category } from "@/lib/types";

export function CategoriesSection({ categories }: { categories: Category[] }) {
  if (categories.length === 0) return null;

  return (
    <section className="bg-cream-soft py-20 md:py-28">
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
    </section>
  );
}
