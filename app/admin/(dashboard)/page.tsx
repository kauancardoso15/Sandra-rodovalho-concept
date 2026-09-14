import type { Metadata } from "next";
import Link from "next/link";
import { StatCard } from "@/components/admin/StatCard";
import { getDashboardStats } from "@/lib/data";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gold-deep">Visão geral</p>
        <h1 className="mt-2 font-display text-3xl text-ink">Dashboard</h1>
        <p className="mt-2 text-sm text-ink/60">
          Um resumo rápido de como está o catálogo da sua loja.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
        <StatCard label="Produtos cadastrados" value={stats.totalProducts} />
        <StatCard label="Produtos ativos" value={stats.activeProducts} />
        <StatCard label="Em oferta" value={stats.onSaleProducts} />
        <StatCard label="Novidades" value={stats.newProducts} />
        <StatCard label="Categorias" value={stats.totalCategories} />
        <StatCard label="Categorias ativas" value={stats.activeCategories} />
        <StatCard label="Fotos do Instagram" value={stats.instagramHighlights} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/admin/produtos/novo"
          className="border border-ink/10 bg-white px-6 py-6 transition-colors hover:border-gold"
        >
          <p className="font-display text-lg text-ink">+ Adicionar produto</p>
          <p className="mt-1 text-sm text-ink/50">Cadastre uma nova peça no catálogo.</p>
        </Link>
        <Link
          href="/admin/categorias/novo"
          className="border border-ink/10 bg-white px-6 py-6 transition-colors hover:border-gold"
        >
          <p className="font-display text-lg text-ink">+ Adicionar categoria</p>
          <p className="mt-1 text-sm text-ink/50">Organize seu catálogo por coleções.</p>
        </Link>
        <Link
          href="/admin/instagram/novo"
          className="border border-ink/10 bg-white px-6 py-6 transition-colors hover:border-gold"
        >
          <p className="font-display text-lg text-ink">+ Adicionar foto do Instagram</p>
          <p className="mt-1 text-sm text-ink/50">Escolha as imagens da seção &ldquo;Visto no Instagram&rdquo;.</p>
        </Link>
      </div>
    </div>
  );
}
