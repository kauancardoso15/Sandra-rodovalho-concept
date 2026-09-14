import type { Metadata } from "next";
import { InstagramHighlightForm } from "@/components/admin/InstagramHighlightForm";

export const metadata: Metadata = {
  title: "Nova imagem do Instagram",
  robots: { index: false, follow: false },
};

export default function NewInstagramHighlightPage() {
  return (
    <div className="max-w-xl space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gold-deep">Instagram</p>
        <h1 className="mt-2 font-display text-3xl text-ink">Nova imagem</h1>
      </div>
      <InstagramHighlightForm />
    </div>
  );
}
