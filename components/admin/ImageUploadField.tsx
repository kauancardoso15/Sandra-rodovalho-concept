"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { cn } from "@/lib/utils";

interface ImageUploadFieldProps {
  name: string;
  label: string;
  bucket: "product-images" | "category-images" | "site-images";
  defaultValue?: string | null;
  helpText?: string;
}

/**
 * Campo de imagem do painel administrativo.
 *
 * - Permite enviar um arquivo, que é enviado ao Supabase Storage e
 *   transformado automaticamente em uma URL pública.
 * - Também aceita colar uma URL de imagem diretamente.
 * - Mantém um input hidden com o valor final, para ser lido pela Server
 *   Action que processa o formulário (campo `name`).
 */
export function ImageUploadField({ name, label, bucket, defaultValue, helpText }: ImageUploadFieldProps) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);

    if (!isSupabaseConfigured()) {
      setError(
        "Supabase não está configurado neste ambiente de demonstração — o upload de imagens ficará disponível assim que o projeto Supabase for conectado. Por enquanto, cole uma URL de imagem abaixo."
      );
      return;
    }

    setUploading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      setValue(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível enviar a imagem.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-xs uppercase tracking-wide text-ink/50">
        {label}
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden border border-ink/10 bg-ink-soft">
          {value ? (
            <Image src={value} alt="Pré-visualização" fill className="object-cover" unoptimized />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-wide text-cream/50">
              Sem imagem
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <input
            ref={fileInputRef}
            id={inputId}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-xs text-ink/70 file:mr-3 file:border-0 file:bg-ink file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-wide file:text-cream hover:file:bg-ink-soft"
          />
          <input
            type="text"
            placeholder="ou cole a URL de uma imagem"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={cn(
              "w-full border border-ink/15 bg-cream px-3 py-2 text-xs text-ink placeholder:text-ink/40 focus:border-gold"
            )}
          />
          {uploading && <p className="text-xs text-ink/50">Enviando imagem...</p>}
          {error && <p className="text-xs text-amber-700">{error}</p>}
          {helpText && !error && <p className="text-xs text-ink/40">{helpText}</p>}
        </div>
      </div>

      <input type="hidden" name={name} value={value} />
    </div>
  );
}
