import Link from "next/link";
import Image from "next/image";
import { deleteCategoryAction, toggleCategoryActiveAction } from "@/app/admin/(dashboard)/categorias/actions";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/types";

export function CategoriesTable({ categories }: { categories: Category[] }) {
  if (categories.length === 0) {
    return (
      <div className="border border-dashed border-ink/15 py-16 text-center">
        <p className="text-sm text-ink/50">Nenhuma categoria cadastrada ainda.</p>
        <Link href="/admin/categorias/novo" className="mt-4 inline-block text-xs uppercase tracking-wide text-gold-deep">
          Cadastrar a primeira categoria →
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-ink/10 bg-white">
      <table className="w-full min-w-[600px] text-left text-sm">
        <thead>
          <tr className="border-b border-ink/10 text-[11px] uppercase tracking-wide text-ink/40">
            <th className="px-4 py-3 font-medium">Categoria</th>
            <th className="px-4 py-3 font-medium">Ordem</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-b border-ink/5 last:border-none">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden bg-ink-soft">
                    {category.image_url ? (
                      <Image src={category.image_url} alt={category.name} fill className="object-cover" unoptimized />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[9px] text-cream/50">
                        SR
                      </div>
                    )}
                  </div>
                  <span className="font-medium text-ink">{category.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-ink/60">{category.sort_order}</td>
              <td className="px-4 py-3">
                <form action={toggleCategoryActiveAction}>
                  <input type="hidden" name="id" value={category.id} />
                  <input type="hidden" name="value" value={(!category.is_active).toString()} />
                  <button
                    type="submit"
                    className={cn(
                      "px-2 py-1 text-[10px] uppercase tracking-wide transition-colors",
                      category.is_active
                        ? "bg-ink text-cream"
                        : "border border-red-900/20 bg-red-50 text-red-900"
                    )}
                  >
                    {category.is_active ? "Ativa" : "Inativa"}
                  </button>
                </form>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-3">
                  <Link href={`/admin/categorias/${category.id}`} className="text-xs uppercase tracking-wide text-gold-deep hover:underline">
                    Editar
                  </Link>
                  <form action={deleteCategoryAction}>
                    <input type="hidden" name="id" value={category.id} />
                    <ConfirmSubmitButton
                      confirmMessage={`Excluir a categoria "${category.name}"? Os produtos vinculados ficarão sem categoria.`}
                      className="text-xs uppercase tracking-wide text-red-800/70 hover:text-red-800"
                    >
                      Excluir
                    </ConfirmSubmitButton>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
