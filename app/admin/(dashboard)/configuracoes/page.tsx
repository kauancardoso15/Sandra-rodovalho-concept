import type { Metadata } from "next";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Configurações",
  robots: { index: false, follow: false },
};

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gold-deep">Painel</p>
        <h1 className="mt-2 font-display text-3xl text-ink">Configurações</h1>
        <p className="mt-2 text-sm text-ink/60">
          Dados centralizados da loja — alterados aqui, refletem em todo o site automaticamente.
        </p>
      </div>
      <SettingsForm settings={settings} />
    </div>
  );
}
