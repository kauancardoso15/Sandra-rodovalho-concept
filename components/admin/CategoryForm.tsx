"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { createCategoryAction, updateCategoryAction, type CategoryFormState } from "@/app/admin/(dashboard)/categorias/actions";
import type { Category } from "@/lib/types";

const initialState: CategoryFormState = {};

export function CategoryForm({ category }: { category?: Category }) {
  const isEdit = Boolean(category);
  const action = isEdit ? updateCategoryAction : createCategoryAction;
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6">
      {isEdit && <input type="hidden" name="id" value={category!.id} />}

      <div>
        <label htmlFor="name" className="mb-1.5 block text-xs uppercase tracking-wide text-ink/50">
          Nome da categoria
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={category?.name}
          placeholder="Ex.: Vestidos"
          className="w-full border border-ink/15 bg-cream px-4 py-3 text-sm text-ink focus:border-gold"
        />
      </div>

      <ImageUploadField
        name="image_url"
        label="Imagem de capa"
        bucket="category-images"
        defaultValue={category?.image_url}
        helpText="Proporção recomendada: retrato (4:5)."
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="sort_order" className="mb-1.5 block text-xs uppercase tracking-wide text-ink/50">
            Ordem de exibição
          </label>
          <input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={category?.sort_order ?? 0}
            className="w-full border border-ink/15 bg-cream px-4 py-3 text-sm text-ink focus:border-gold"
          />
        </div>
        <div className="flex items-end pb-3">
          <label className="flex items-center gap-2 text-sm text-ink/70">
            <input
              type="checkbox"
              name="is_active"
              defaultChecked={category?.is_active ?? true}
              className="h-4 w-4 accent-gold-deep"
            />
            Categoria ativa
          </label>
        </div>
      </div>

      {state.error && (
        <p className="border border-red-900/20 bg-red-50 px-4 py-3 text-xs text-red-900">{state.error}</p>
      )}

      <SubmitButton isEdit={isEdit} />
    </form>
  );
}

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-ink px-8 py-3 text-xs uppercase tracking-[0.16em] text-cream transition-colors hover:bg-ink-soft disabled:opacity-50"
    >
      {pending ? "Salvando..." : isEdit ? "Salvar alterações" : "Cadastrar categoria"}
    </button>
  );
}
