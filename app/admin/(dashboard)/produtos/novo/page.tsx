import type { Metadata } from "next";
import { ProductForm } from "@/components/admin/ProductForm";
import { getAllCategoriesAdmin } from "@/lib/data";

export const metadata: Metadata = {
  title: "Novo produto",
  robots: { index: false, follow: false },
};

export default async function NewProductPage() {
  const categories = await getAllCategoriesAdmin();

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gold-deep">Produtos</p>
        <h1 className="mt-2 font-display text-3xl text-ink">Novo produto</h1>
      </div>
      <ProductForm categories={categories} />
    </div>
  );
}
