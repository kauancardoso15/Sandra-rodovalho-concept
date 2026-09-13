import type { Category } from "@/lib/types";

interface ProductFiltersProps {
  categories: Category[];
  defaultValues: {
    q?: string;
    categoria?: string;
    min?: string;
    max?: string;
    novo?: string;
    oferta?: string;
  };
  /** Rota de destino do formulário (permite reutilizar em /produtos, /ofertas, /novidades). */
  action?: string;
}

/**
 * Busca e filtros de produtos. Implementado como um formulário GET nativo:
 * funciona perfeitamente em qualquer dispositivo, inclusive sem JavaScript,
 * e mantém os filtros na própria URL (compartilhável, voltar/avançar do
 * navegador funciona corretamente).
 */
export function ProductFilters({ categories, defaultValues, action = "/produtos" }: ProductFiltersProps) {
  return (
    <form action={action} method="get" className="space-y-5">
      <div>
        <label htmlFor="q" className="sr-only">
          Buscar produtos
        </label>
        <div className="relative">
          <input
            id="q"
            name="q"
            type="text"
            placeholder="Buscar vestido..."
            defaultValue={defaultValues.q}
            className="w-full border border-ink/15 bg-cream px-4 py-3 pl-11 text-sm text-ink placeholder:text-ink/40 focus:border-gold"
          />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="categoria" className="mb-1.5 block text-[11px] uppercase tracking-wide text-ink/50">
            Categoria
          </label>
          <select
            id="categoria"
            name="categoria"
            defaultValue={defaultValues.categoria ?? ""}
            className="w-full border border-ink/15 bg-cream px-3 py-2.5 text-sm text-ink focus:border-gold"
          >
            <option value="">Todas</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="min" className="mb-1.5 block text-[11px] uppercase tracking-wide text-ink/50">
            Preço mín.
          </label>
          <input
            id="min"
            name="min"
            type="number"
            min={0}
            step="0.01"
            inputMode="decimal"
            placeholder="R$ 0"
            defaultValue={defaultValues.min}
            className="w-full border border-ink/15 bg-cream px-3 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-gold"
          />
        </div>

        <div>
          <label htmlFor="max" className="mb-1.5 block text-[11px] uppercase tracking-wide text-ink/50">
            Preço máx.
          </label>
          <input
            id="max"
            name="max"
            type="number"
            min={0}
            step="0.01"
            inputMode="decimal"
            placeholder="R$ 999"
            defaultValue={defaultValues.max}
            className="w-full border border-ink/15 bg-cream px-3 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-gold"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <label className="flex items-center gap-2 text-sm text-ink/70">
          <input
            type="checkbox"
            name="novo"
            value="1"
            defaultChecked={defaultValues.novo === "1"}
            className="h-4 w-4 accent-gold-deep"
          />
          Somente novidades
        </label>
        <label className="flex items-center gap-2 text-sm text-ink/70">
          <input
            type="checkbox"
            name="oferta"
            value="1"
            defaultChecked={defaultValues.oferta === "1"}
            className="h-4 w-4 accent-gold-deep"
          />
          Somente ofertas
        </label>

        <button
          type="submit"
          className="ml-auto inline-flex items-center bg-ink px-6 py-2.5 text-xs uppercase tracking-[0.14em] text-cream transition-colors hover:bg-ink-soft"
        >
          Filtrar
        </button>
      </div>
    </form>
  );
}
