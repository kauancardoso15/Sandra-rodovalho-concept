import type { StoreSettings } from "./types";

/**
 * Configuração central e padrão da loja.
 *
 * Estes valores são usados como FALLBACK quando o Supabase ainda não está
 * conectado/configurado, e como valores iniciais da tabela `settings`.
 * Depois que o Supabase estiver configurado, a proprietária poderá alterar
 * todos estes dados pelo painel em /admin/configuracoes — sem precisar
 * tocar em código.
 *
 * ⚠️ DADOS DEMONSTRATIVOS (DEMO): número de WhatsApp, textos e domínio
 * abaixo são fictícios/placeholder e DEVEM ser substituídos pelos dados
 * reais da Sandra Rodovalho Concept antes da publicação definitiva.
 */
export const DEFAULT_SETTINGS: StoreSettings = {
  id: "default",
  store_name: "Sandra Rodovalho Concept",
  logo_url: null,
  // DEMO — substituir pelo número real de WhatsApp da loja (com DDI+DDD)
  whatsapp_number: "5561999990000",
  instagram_handle: "@sandrarodovalhoconcept",
  instagram_url: "https://www.instagram.com/sandrarodovalhoconcept",
  home_headline: "Sandra Rodovalho Concept",
  home_subheadline: "Moda feminina com essência.",
  hero_image_url: null,
  about_text:
    "A Sandra Rodovalho Concept nasceu para vestir mulheres que valorizam a elegância, a personalidade e o estilo em cada detalhe. Cada peça é escolhida com um olhar atento à qualidade, ao caimento e às tendências que respeitam a essência feminina — para que cada cliente se sinta confiante em qualquer ocasião.",
  about_image_url: null,
  updated_at: new Date().toISOString(),
};

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sandrarodovalhoconcept.com.br";

/** Mensagem padrão do botão flutuante / CTA genérico de WhatsApp. */
export const WHATSAPP_DEFAULT_MESSAGE =
  "Olá! Encontrei o site da Sandra Rodovalho Concept e gostaria de saber mais sobre as peças.";

/** Categorias e navegação principal do site público. */
export const MAIN_NAV = [
  { label: "Início", href: "/" },
  { label: "Novidades", href: "/novidades" },
  { label: "Categorias", href: "/categorias" },
  { label: "Ofertas", href: "/ofertas" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
] as const;

/**
 * Tempo de inatividade (em milissegundos) até o logout automático do painel
 * administrativo. Altere apenas esta constante para 10, 15, 20 minutos etc.
 */
export const ADMIN_INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000;

/** Aviso exibido após o logout automático por inatividade. */
export const ADMIN_INACTIVITY_MESSAGE = "Sua sessão foi encerrada por segurança.";
