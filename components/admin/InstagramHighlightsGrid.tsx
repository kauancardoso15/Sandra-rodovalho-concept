import Link from "next/link";
import Image from "next/image";
import {
  deleteInstagramHighlightAction,
  toggleInstagramHighlightActiveAction,
} from "@/app/admin/(dashboard)/instagram/actions";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";
import { cn } from "@/lib/utils";
import type { InstagramHighlight } from "@/lib/types";

export function InstagramHighlightsGrid({ highlights }: { highlights: InstagramHighlight[] }) {
  if (highlights.length === 0) {
    return (
      <div className="border border-dashed border-ink/15 py-16 text-center">
        <p className="text-sm text-ink/50">
          Nenhuma imagem cadastrada ainda — a seção &ldquo;Visto no Instagram&rdquo; do site está exibindo o
          estado ilustrativo padrão.
        </p>
        <Link href="/admin/instagram/novo" className="mt-4 inline-block text-xs uppercase tracking-wide text-gold-deep">
          Adicionar a primeira imagem →
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {highlights.map((highlight) => (
        <div key={highlight.id} className="border border-ink/10 bg-white">
          <div className="relative aspect-square w-full overflow-hidden bg-ink-soft">
            <Image
              src={highlight.image_url}
              alt={highlight.caption ?? "Imagem do Instagram"}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="space-y-2 p-3">
            <p className="truncate text-xs text-ink/60">{highlight.caption || "Sem legenda"}</p>

            <form action={toggleInstagramHighlightActiveAction}>
              <input type="hidden" name="id" value={highlight.id} />
              <input type="hidden" name="value" value={(!highlight.is_active).toString()} />
              <button
                type="submit"
                className={cn(
                  "px-2 py-1 text-[10px] uppercase tracking-wide transition-colors",
                  highlight.is_active
                    ? "bg-ink text-cream"
                    : "border border-red-900/20 bg-red-50 text-red-900"
                )}
              >
                {highlight.is_active ? "Visível" : "Oculta"}
              </button>
            </form>

            <div className="flex items-center justify-between pt-1">
              <Link
                href={`/admin/instagram/${highlight.id}`}
                className="text-[11px] uppercase tracking-wide text-gold-deep hover:underline"
              >
                Editar
              </Link>
              <form action={deleteInstagramHighlightAction}>
                <input type="hidden" name="id" value={highlight.id} />
                <ConfirmSubmitButton
                  confirmMessage="Excluir esta imagem da seção Instagram?"
                  className="text-[11px] uppercase tracking-wide text-red-800/70 hover:text-red-800"
                >
                  Excluir
                </ConfirmSubmitButton>
              </form>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
