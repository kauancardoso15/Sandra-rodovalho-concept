"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  /** Rótulo curto exibido na moldura elegante quando não há imagem cadastrada. */
  label?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}

/**
 * Exibe a imagem real do produto/categoria quando disponível. Quando não há
 * imagem cadastrada (ou o carregamento falha), mostra uma moldura de marca
 * elegante — nunca um ícone de imagem quebrada ou um placeholder genérico.
 *
 * Assim que a proprietária cadastrar as fotos reais pelo painel
 * administrativo, elas substituem esta moldura automaticamente.
 */
export function ProductImage({ src, alt, className, label, sizes, priority, fill = true }: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <BrandFrame label={label ?? alt} className={className} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
      priority={priority}
      // Admin pode colar URLs de qualquer origem (não só Supabase Storage);
      // desativa a otimização para nunca quebrar a renderização de uma
      // imagem legítima hospedada fora dos domínios pré-configurados.
      unoptimized
      className={cn("object-cover", className)}
      onError={() => setFailed(true)}
    />
  );
}

export function BrandFrame({ label, className }: { label?: string; className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-ink via-ink-soft to-ink text-cream/80",
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50">
        <span className="font-display text-lg tracking-widest text-gold-soft">SR</span>
      </div>
      <div className="px-6 text-center">
        <p className="font-display text-sm tracking-[0.2em] text-cream/70 uppercase">
          Imagem não cadastrada
        </p>
        {label && (
          <p className="mt-1 line-clamp-1 text-[11px] tracking-wide text-cream/40">{label}</p>
        )}
      </div>
    </div>
  );
}
