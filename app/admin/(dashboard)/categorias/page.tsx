import type { Metadata } from "next";
import Link from "next/link";
import { CategoriesTable } from "@/components/admin/CategoriesTable";
import { getAllCategoriesAdmin } from "@/lib/data";

export const metadata: Metadata = {
  title: "Categorias",
  robots: { index: false, follow: false },
};

export default async function AdminCategoriesPage() {
  const categories = await getAllCategoriesAdmin();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold-deep">Catálogo</p>
          <h1 className="mt-2 font-display text-3xl text-ink">Categorias</h1>
        </div>
        <Link
          href="/admin/categorias/novo"
          className="bg-ink px-6 py-3 text-xs uppercase tracking-[0.14em] text-cream transition-colors hover:bg-ink-soft"
        >
          + Adicionar categoria
        </Link>
      </div>

      <CategoriesTable categories={categories} />
    </div>
  );
}
