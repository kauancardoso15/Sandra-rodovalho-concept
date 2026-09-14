import type { Metadata } from "next";
import Link from "next/link";
import { InstagramHighlightsGrid } from "@/components/admin/InstagramHighlightsGrid";
import { getAllInstagramHighlightsAdmin } from "@/lib/data";

export const metadata: Metadata = {
  title: "Instagram",
  robots: { index: false, follow: false },
};

export default async function AdminInstagramPage() {
  const highlights = await getAllInstagramHighlightsAdmin();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold-deep">Site</p>
          <h1 className="mt-2 font-display text-3xl text-ink">Visto no Instagram</h1>
          <p className="mt-2 max-w-xl text-sm text-ink/60">
            Escolha as imagens exibidas na seção &ldquo;Visto no Instagram&rdquo; da Home. Cada imagem pode
            levar a um post específico ou, se deixar o link em branco, ao seu perfil.
          </p>
        </div>
        <Link
          href="/admin/instagram/novo"
          className="bg-ink px-6 py-3 text-xs uppercase tracking-[0.14em] text-cream transition-colors hover:bg-ink-soft"
        >
          + Adicionar imagem
        </Link>
      </div>

      <InstagramHighlightsGrid highlights={highlights} />
    </div>
  );
}
