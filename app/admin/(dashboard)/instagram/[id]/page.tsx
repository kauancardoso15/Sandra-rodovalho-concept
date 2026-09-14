import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InstagramHighlightForm } from "@/components/admin/InstagramHighlightForm";
import { getInstagramHighlightByIdAdmin } from "@/lib/data";

export const metadata: Metadata = {
  title: "Editar imagem do Instagram",
  robots: { index: false, follow: false },
};

interface EditInstagramHighlightPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditInstagramHighlightPage({ params }: EditInstagramHighlightPageProps) {
  const { id } = await params;
  const highlight = await getInstagramHighlightByIdAdmin(id);
  if (!highlight) notFound();

  return (
    <div className="max-w-xl space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gold-deep">Instagram</p>
        <h1 className="mt-2 font-display text-3xl text-ink">Editar imagem</h1>
      </div>
      <InstagramHighlightForm highlight={highlight} />
    </div>
  );
}
