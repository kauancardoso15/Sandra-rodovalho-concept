"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { createProductAction, updateProductAction, type ProductFormState } from "@/app/admin/(dashboard)/produtos/actions";
import type { Category, Product } from "@/lib/types";

const initialState: ProductFormState = {};

export function ProductForm({ product, categories }: { product?: Product; categories: Category[] }) {
  const isEdit = Boolean(product);
  const action = isEdit ? updateProductAction : createProductAction;
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-8">
      {isEdit && <input type="hidden" name="id" value={product!.id} />}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="mb-1.5 block text-xs uppercase tracking-wide text-ink/50">
            Nome do produto
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={product?.name}
            placeholder="Ex.: Vestido Floral"
            className="w-full border border-ink/15 bg-cream px-4 py-3 text-sm text-ink focus:border-gold"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="description" className="mb-1.5 block text-xs uppercase tracking-wide text-ink/50">
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={product?.description}
            placeholder="Descreva o tecido, o caimento e os detalhes da peça..."
            className="w-full border border-ink/15 bg-cream px-4 py-3 text-sm text-ink focus:border-gold"
          />
        </div>

        <div>
          <label htmlFor="category_id" className="mb-1.5 block text-xs uppercase tracking-wide text-ink/50">
            Categoria
          </label>
          <select
            id="category_id"
            name="category_id"
            defaultValue={product?.category_id ?? ""}
            className="w-full border border-ink/15 bg-cream px-4 py-3 text-sm text-ink focus:border-gold"
          >
            <option value="">Sem categoria</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="mb-1.5 block text-xs uppercase tracking-wide text-ink/50">
              Preço (R$)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min={0}
              step="0.01"
              required
              defaultValue={product?.price}
              className="w-full border border-ink/15 bg-cream px-4 py-3 text-sm text-ink focus:border-gold"
            />
          </div>
          <div>
            <label htmlFor="sale_price" className="mb-1.5 block text-xs uppercase tracking-wide text-ink/50">
              Preço promocional
            </label>
            <input
              id="sale_price"
              name="sale_price"
              type="number"
              min={0}
              step="0.01"
              defaultValue={product?.sale_price ?? ""}
              placeholder="Opcional"
              className="w-full border border-ink/15 bg-cream px-4 py-3 text-sm text-ink focus:border-gold"
            />
            <p className="mt-1 text-[11px] text-ink/40">O desconto (%) é calculado automaticamente.</p>
          </div>
        </div>

        <div className="sm:col-span-2">
          <ImageUploadField
            name="image_url"
            label="Foto do produto"
            bucket="product-images"
            defaultValue={product?.image_url}
            helpText="Formatos recomendados: JPG ou PNG, proporção retrato (3:4)."
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6 border-t border-ink/10 pt-6">
        <Checkbox name="is_active" label="Produto ativo" defaultChecked={product?.is_active ?? true} />
        <Checkbox name="is_new" label="Marcar como novidade" defaultChecked={product?.is_new ?? false} />
        <Checkbox name="is_on_sale" label="Marcar como oferta" defaultChecked={product?.is_on_sale ?? false} />
      </div>

      {state.error && (
        <p className="border border-red-900/20 bg-red-50 px-4 py-3 text-xs text-red-900">{state.error}</p>
      )}

      <SubmitButton isEdit={isEdit} />
    </form>
  );
}

function Checkbox({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-2 text-sm text-ink/70">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4 accent-gold-deep" />
      {label}
    </label>
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
      {pending ? "Salvando..." : isEdit ? "Salvar alterações" : "Cadastrar produto"}
    </button>
  );
}
