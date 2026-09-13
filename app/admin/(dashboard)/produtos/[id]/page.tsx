import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { getAllCategoriesAdmin, getProductByIdAdmin } from "@/lib/data";

export const metadata: Metadata = {
  title: "Editar produto",
  robots: { index: false, follow: false },
};

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const [product, categories] = await Promise.all([getProductByIdAdmin(id), getAllCategoriesAdmin()]);

  if (!product) notFound();

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gold-deep">Produtos</p>
        <h1 className="mt-2 font-display text-3xl text-ink">Editar produto</h1>
      </div>
      <ProductForm product={product} categories={categories} />
    </div>
  );
}
