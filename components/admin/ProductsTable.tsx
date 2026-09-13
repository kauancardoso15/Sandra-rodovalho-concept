import Link from "next/link";
import Image from "next/image";
import { deleteProductAction, toggleProductFieldAction } from "@/app/admin/(dashboard)/produtos/actions";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";
import { formatBRL } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductsTable({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="border border-dashed border-ink/15 py-16 text-center">
        <p className="text-sm text-ink/50">Nenhum produto cadastrado ainda.</p>
        <Link href="/admin/produtos/novo" className="mt-4 inline-block text-xs uppercase tracking-wide text-gold-deep">
          Cadastrar o primeiro produto →
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-ink/10 bg-white">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-ink/10 text-[11px] uppercase tracking-wide text-ink/40">
            <th className="px-4 py-3 font-medium">Produto</th>
            <th className="px-4 py-3 font-medium">Categoria</th>
            <th className="px-4 py-3 font-medium">Preço</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-ink/5 last:border-none">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden bg-ink-soft">
                    {product.image_url ? (
                      <Image src={product.image_url} alt={product.name} fill className="object-cover" unoptimized />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[9px] text-cream/50">
                        SR
                      </div>
                    )}
                  </div>
                  <span className="font-medium text-ink">{product.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-ink/60">{product.category?.name ?? "—"}</td>
              <td className="px-4 py-3">
                {product.sale_price ? (
                  <div>
                    <span className="block text-xs text-ink/40 line-through">{formatBRL(product.price)}</span>
                    <span className="text-ink">{formatBRL(product.sale_price)}</span>
                  </div>
                ) : (
                  <span className="text-ink">{formatBRL(product.price)}</span>
                )}
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1.5">
                  <ToggleBadge product={product} field="is_active" activeLabel="Ativo" inactiveLabel="Inativo" />
                  <ToggleBadge product={product} field="is_new" activeLabel="Novidade" inactiveLabel="+ Novidade" subtle />
                  <ToggleBadge product={product} field="is_on_sale" activeLabel="Oferta" inactiveLabel="+ Oferta" subtle />
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-3">
                  <Link href={`/admin/produtos/${product.id}`} className="text-xs uppercase tracking-wide text-gold-deep hover:underline">
                    Editar
                  </Link>
                  <form action={deleteProductAction}>
                    <input type="hidden" name="id" value={product.id} />
                    <ConfirmSubmitButton
                      confirmMessage={`Excluir "${product.name}"? Esta ação não pode ser desfeita.`}
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

function ToggleBadge({
  product,
  field,
  activeLabel,
  inactiveLabel,
  subtle,
}: {
  product: Product;
  field: "is_active" | "is_new" | "is_on_sale";
  activeLabel: string;
  inactiveLabel: string;
  subtle?: boolean;
}) {
  const isActive = product[field];

  return (
    <form action={toggleProductFieldAction}>
      <input type="hidden" name="id" value={product.id} />
      <input type="hidden" name="field" value={field} />
      <input type="hidden" name="value" value={(!isActive).toString()} />
      <button
        type="submit"
        className={cn(
          "px-2 py-1 text-[10px] uppercase tracking-wide transition-colors",
          isActive
            ? "bg-ink text-cream"
            : subtle
              ? "border border-ink/15 text-ink/40 hover:border-gold"
              : "border border-red-900/20 bg-red-50 text-red-900"
        )}
      >
        {isActive ? activeLabel : inactiveLabel}
      </button>
    </form>
  );
}
