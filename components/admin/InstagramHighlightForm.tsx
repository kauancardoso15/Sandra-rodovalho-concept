"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import {
  createInstagramHighlightAction,
  updateInstagramHighlightAction,
  type InstagramHighlightFormState,
} from "@/app/admin/(dashboard)/instagram/actions";
import type { InstagramHighlight } from "@/lib/types";

const initialState: InstagramHighlightFormState = {};

export function InstagramHighlightForm({ highlight }: { highlight?: InstagramHighlight }) {
  const isEdit = Boolean(highlight);
  const action = isEdit ? updateInstagramHighlightAction : createInstagramHighlightAction;
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6">
      {isEdit && <input type="hidden" name="id" value={highlight!.id} />}

      <ImageUploadField
        name="image_url"
        label="Imagem"
        bucket="instagram-images"
        defaultValue={highlight?.image_url}
        helpText="Proporção recomendada: quadrada (1:1), como no feed do Instagram."
      />

      <div>
        <label htmlFor="caption" className="mb-1.5 block text-xs uppercase tracking-wide text-ink/50">
          Legenda (opcional)
        </label>
        <input
          id="caption"
          name="caption"
          type="text"
          defaultValue={highlight?.caption ?? ""}
          placeholder="Ex.: Look do dia"
          className="w-full border border-ink/15 bg-cream px-4 py-3 text-sm text-ink focus:border-gold"
        />
      </div>

      <div>
        <label htmlFor="link" className="mb-1.5 block text-xs uppercase tracking-wide text-ink/50">
          Link do post (opcional)
        </label>
        <input
          id="link"
          name="link"
          type="text"
          defaultValue={highlight?.link ?? ""}
          placeholder="https://www.instagram.com/p/..."
          className="w-full border border-ink/15 bg-cream px-4 py-3 text-sm text-ink focus:border-gold"
        />
        <p className="mt-1 text-[11px] text-ink/40">
          Se vazio, a imagem leva para o perfil do Instagram configurado em Configurações.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="sort_order" className="mb-1.5 block text-xs uppercase tracking-wide text-ink/50">
            Ordem de exibição
          </label>
          <input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={highlight?.sort_order ?? 0}
            className="w-full border border-ink/15 bg-cream px-4 py-3 text-sm text-ink focus:border-gold"
          />
        </div>
        <div className="flex items-end pb-3">
          <label className="flex items-center gap-2 text-sm text-ink/70">
            <input
              type="checkbox"
              name="is_active"
              defaultChecked={highlight?.is_active ?? true}
              className="h-4 w-4 accent-gold-deep"
            />
            Visível no site
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
      {pending ? "Salvando..." : isEdit ? "Salvar alterações" : "Adicionar imagem"}
    </button>
  );
}
