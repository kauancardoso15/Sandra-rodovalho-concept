"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { updateSettingsAction, type SettingsFormState } from "@/app/admin/(dashboard)/configuracoes/actions";
import type { StoreSettings } from "@/lib/types";

const initialState: SettingsFormState = {};

export function SettingsForm({ settings }: { settings: StoreSettings }) {
  const [state, formAction] = useActionState(updateSettingsAction, initialState);

  return (
    <form action={formAction} className="space-y-10">
      <Section title="Identidade da loja">
        <Field label="Nome da loja" name="store_name" defaultValue={settings.store_name} required />
        <ImageUploadField
          name="logo_url"
          label="Logotipo"
          bucket="site-images"
          defaultValue={settings.logo_url}
          helpText="Opcional. PNG com fundo transparente funciona melhor."
        />
      </Section>

      <Section title="Contato e redes sociais">
        <Field
          label="Número de WhatsApp (com DDI e DDD)"
          name="whatsapp_number"
          defaultValue={settings.whatsapp_number}
          placeholder="5561999990000"
          required
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Instagram (usuário)" name="instagram_handle" defaultValue={settings.instagram_handle} placeholder="@sandrarodovalhoconcept" />
          <Field label="Instagram (link completo)" name="instagram_url" defaultValue={settings.instagram_url} placeholder="https://instagram.com/..." />
        </div>
      </Section>

      <Section title="Página inicial">
        <Field label="Título principal (hero)" name="home_headline" defaultValue={settings.home_headline} />
        <Field label="Subtítulo" name="home_subheadline" defaultValue={settings.home_subheadline} />
        <ImageUploadField
          name="hero_image_url"
          label="Imagem principal (hero)"
          bucket="site-images"
          defaultValue={settings.hero_image_url}
        />
      </Section>

      <Section title="Sobre a marca">
        <TextArea label="Texto da seção Sobre" name="about_text" defaultValue={settings.about_text} rows={5} />
        <ImageUploadField
          name="about_image_url"
          label="Imagem da seção Sobre"
          bucket="site-images"
          defaultValue={settings.about_image_url}
        />
      </Section>

      {state.error && (
        <p className="border border-red-900/20 bg-red-50 px-4 py-3 text-xs text-red-900">{state.error}</p>
      )}
      {state.success && (
        <p className="border border-ink/10 bg-cream px-4 py-3 text-xs text-ink/70">
          Configurações salvas com sucesso.
        </p>
      )}

      <SubmitButton />
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-5 border-b border-ink/10 pb-10 last:border-none">
      <h2 className="font-display text-lg text-ink">{title}</h2>
      {children}
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs uppercase tracking-wide text-ink/50">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        required={required}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className="w-full border border-ink/15 bg-cream px-4 py-3 text-sm text-ink focus:border-gold"
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
  rows = 4,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  rows?: number;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs uppercase tracking-wide text-ink/50">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? ""}
        className="w-full border border-ink/15 bg-cream px-4 py-3 text-sm text-ink focus:border-gold"
      />
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-ink px-8 py-3 text-xs uppercase tracking-[0.16em] text-cream transition-colors hover:bg-ink-soft disabled:opacity-50"
    >
      {pending ? "Salvando..." : "Salvar configurações"}
    </button>
  );
}
