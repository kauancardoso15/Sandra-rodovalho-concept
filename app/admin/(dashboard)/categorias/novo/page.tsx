import type { Metadata } from "next";
import { CategoryForm } from "@/components/admin/CategoryForm";

export const metadata: Metadata = {
  title: "Nova categoria",
  robots: { index: false, follow: false },
};

export default function NewCategoryPage() {
  return (
    <div className="max-w-xl space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gold-deep">Categorias</p>
        <h1 className="mt-2 font-display text-3xl text-ink">Nova categoria</h1>
      </div>
      <CategoryForm />
    </div>
  );
}
