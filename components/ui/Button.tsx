import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "whatsapp" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-ink text-cream hover:bg-ink-soft border border-ink",
  secondary: "bg-transparent text-ink border border-ink hover:bg-ink hover:text-cream",
  outline: "bg-transparent text-cream border border-cream/60 hover:bg-cream hover:text-ink",
  whatsapp: "bg-[#1e7d4f] text-cream hover:bg-[#186a42] border border-[#1e7d4f]",
  ghost: "bg-transparent text-ink hover:text-gold-deep underline underline-offset-4",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 tracking-[0.08em] uppercase font-medium transition-colors duration-300 whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none";

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
}

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/** Botão nativo (ações: enviar formulário, abrir modal, excluir, etc.) */
export function Button({ variant = "primary", size = "md", className, ...rest }: ButtonProps) {
  return <button className={buttonClasses(variant, size, className)} {...rest} />;
}

interface LinkButtonProps extends ComponentPropsWithoutRef<typeof Link> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/** Botão como link interno (navegação entre páginas do site). */
export function LinkButton({ variant = "primary", size = "md", className, ...rest }: LinkButtonProps) {
  return <Link className={buttonClasses(variant, size, className)} {...rest} />;
}

interface AnchorButtonProps extends ComponentPropsWithoutRef<"a"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/** Botão como link externo (WhatsApp, Instagram, etc.) */
export function AnchorButton({ variant = "primary", size = "md", className, ...rest }: AnchorButtonProps) {
  return <a className={buttonClasses(variant, size, className)} {...rest} />;
}
