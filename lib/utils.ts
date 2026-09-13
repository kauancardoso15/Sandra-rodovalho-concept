/** Combina classes condicionalmente, ignorando valores falsy. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Formata um valor numérico como moeda brasileira (R$). */
export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/**
 * Calcula o percentual de desconto automaticamente a partir do preço
 * original e do preço promocional. Nunca deve ser digitado manualmente
 * pelo administrador.
 */
export function calcDiscountPercent(price: number, salePrice: number | null | undefined): number {
  if (!salePrice || salePrice <= 0 || salePrice >= price) return 0;
  return Math.round(((price - salePrice) / price) * 100);
}

export function hasActivePromotion(price: number, salePrice: number | null | undefined): boolean {
  return calcDiscountPercent(price, salePrice) > 0;
}

/** Monta um link wa.me a partir de um número (com ou sem formatação) e uma mensagem. */
export function buildWhatsAppUrl(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** Gera a mensagem padrão de interesse em um produto específico. */
export function productWhatsAppMessage(productName: string): string {
  return `Olá! Vi o produto ${productName} no site da Sandra Rodovalho Concept e gostaria de saber mais informações.`;
}

const DIACRITICS_REGEX = new RegExp("[̀-ͯ]", "g");

/** Converte um texto livre em slug amigável para URLs. */
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(DIACRITICS_REGEX, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
