import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { getCategoryByIdAdmin } from "@/lib/data";

export const metadata: Metadata = {
  title: "Editar categoria",
  robots: { index: false, follow: false },
};

interface EditCategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = await params;
  const category = await getCategoryByIdAdmin(id);
  if (!category) notFound();

  return (
    <div className="max-w-xl space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gold-deep">Categorias</p>
        <h1 className="mt-2 font-display text-3xl text-ink">Editar categoria</h1>
      </div>
      <CategoryForm category={category} />
    </div>
  );
}
