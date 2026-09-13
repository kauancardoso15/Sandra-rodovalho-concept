import type { Category, Product } from "./types";

/**
 * ============================================================================
 *  CONTEÚDO DEMONSTRATIVO (DEMO)
 * ============================================================================
 * Os dados abaixo alimentam o site quando o Supabase ainda não está
 * conectado (ambiente de demonstração/apresentação) e também servem como
 * seed inicial da base de dados real (ver /supabase/schema.sql).
 *
 * Nenhuma informação comercial real da Sandra Rodovalho Concept foi
 * utilizada aqui — nomes de peças, preços e descrições são fictícios e
 * servem apenas para demonstrar o funcionamento do site.
 *
 * IMAGENS: propositalmente sem foto (image_url: null). O site exibe, nesse
 * caso, uma moldura de marca elegante ("Imagem não cadastrada") em vez de
 * uma foto genérica ou falsa — ver components/ui/ProductImage.tsx. Assim
 * que a proprietária enviar as fotos reais pelo painel administrativo, elas
 * substituem automaticamente essa moldura.
 *
 * ⚠️ ANTES DA PUBLICAÇÃO DEFINITIVA:
 * Todo o conteúdo deste arquivo deve ser substituído pelos produtos,
 * categorias e fotos reais da loja — via painel administrativo (/admin).
 * ============================================================================
 */

export const DEMO_CATEGORIES: Category[] = [
  {
    id: "cat-vestidos",
    name: "Vestidos",
    slug: "vestidos",
    image_url: null,
    is_active: true,
    sort_order: 1,
    created_at: "2026-01-10T12:00:00.000Z",
  },
  {
    id: "cat-conjuntos",
    name: "Conjuntos",
    slug: "conjuntos",
    image_url: null,
    is_active: true,
    sort_order: 2,
    created_at: "2026-01-10T12:00:00.000Z",
  },
  {
    id: "cat-blusas",
    name: "Blusas",
    slug: "blusas",
    image_url: null,
    is_active: true,
    sort_order: 3,
    created_at: "2026-01-10T12:00:00.000Z",
  },
  {
    id: "cat-calcas",
    name: "Calças",
    slug: "calcas",
    image_url: null,
    is_active: true,
    sort_order: 4,
    created_at: "2026-01-10T12:00:00.000Z",
  },
  {
    id: "cat-saias",
    name: "Saias",
    slug: "saias",
    image_url: null,
    is_active: true,
    sort_order: 5,
    created_at: "2026-01-10T12:00:00.000Z",
  },
  {
    id: "cat-acessorios",
    name: "Acessórios",
    slug: "acessorios",
    image_url: null,
    is_active: true,
    sort_order: 6,
    created_at: "2026-01-10T12:00:00.000Z",
  },
];

export const DEMO_PRODUCTS: Product[] = [
  {
    id: "prod-vestido-floral",
    name: "Vestido Floral",
    slug: "vestido-floral",
    description:
      "Vestido midi com estampa floral exclusiva, caimento fluido e tecido leve — ideal para o dia a dia com elegância. Peça versátil, do almoço ao entardecer.",
    category_id: "cat-vestidos",
    price: 189.9,
    sale_price: 159.9,
    image_url: null,
    gallery: [],
    is_active: true,
    is_new: true,
    is_on_sale: true,
    stock_quantity: null,
    size: null,
    variations: null,
    created_at: "2026-02-01T12:00:00.000Z",
    updated_at: "2026-02-01T12:00:00.000Z",
  },
  {
    id: "prod-conjunto-elegance",
    name: "Conjunto Elegance",
    slug: "conjunto-elegance",
    description:
      "Conjunto de blazer alfaiataria e calça reta em tecido nobre. Corte impecável para quem busca sofisticação em qualquer compromisso.",
    category_id: "cat-conjuntos",
    price: 349.9,
    sale_price: null,
    image_url: null,
    gallery: [],
    is_active: true,
    is_new: true,
    is_on_sale: false,
    stock_quantity: null,
    size: null,
    variations: null,
    created_at: "2026-02-05T12:00:00.000Z",
    updated_at: "2026-02-05T12:00:00.000Z",
  },
  {
    id: "prod-vestido-midi",
    name: "Vestido Midi",
    slug: "vestido-midi",
    description:
      "Vestido midi em malha canelada, decote sofisticado e modelagem que valoriza a silhueta. Elegância discreta para qualquer ocasião.",
    category_id: "cat-vestidos",
    price: 219.9,
    sale_price: 179.9,
    image_url: null,
    gallery: [],
    is_active: true,
    is_new: false,
    is_on_sale: true,
    stock_quantity: null,
    size: null,
    variations: null,
    created_at: "2026-01-20T12:00:00.000Z",
    updated_at: "2026-01-20T12:00:00.000Z",
  },
  {
    id: "prod-conjunto-casual",
    name: "Conjunto Casual",
    slug: "conjunto-casual",
    description:
      "Conjunto de tricô com blusa e saia em tom neutro. Praticidade e estilo para o dia a dia, sem abrir mão do conforto.",
    category_id: "cat-conjuntos",
    price: 259.9,
    sale_price: null,
    image_url: null,
    gallery: [],
    is_active: true,
    is_new: false,
    is_on_sale: false,
    stock_quantity: null,
    size: null,
    variations: null,
    created_at: "2026-01-15T12:00:00.000Z",
    updated_at: "2026-01-15T12:00:00.000Z",
  },
  {
    id: "prod-calca-pantalona",
    name: "Calça Pantalona",
    slug: "calca-pantalona",
    description:
      "Calça pantalona de cintura alta em tecido com caimento estruturado. Alonga a silhueta e combina com praticamente tudo no guarda-roupa.",
    category_id: "cat-calcas",
    price: 169.9,
    sale_price: 139.9,
    image_url: null,
    gallery: [],
    is_active: true,
    is_new: false,
    is_on_sale: true,
    stock_quantity: null,
    size: null,
    variations: null,
    created_at: "2026-01-08T12:00:00.000Z",
    updated_at: "2026-01-08T12:00:00.000Z",
  },
  {
    id: "prod-blusa-premium",
    name: "Blusa Premium",
    slug: "blusa-premium",
    description:
      "Blusa em cetim com botões dourados e caimento fluido. Um toque de sofisticação discreta para elevar qualquer look.",
    category_id: "cat-blusas",
    price: 129.9,
    sale_price: null,
    image_url: null,
    gallery: [],
    is_active: true,
    is_new: true,
    is_on_sale: false,
    stock_quantity: null,
    size: null,
    variations: null,
    created_at: "2026-02-08T12:00:00.000Z",
    updated_at: "2026-02-08T12:00:00.000Z",
  },
  {
    id: "prod-saia-plissada",
    name: "Saia Plissada",
    slug: "saia-plissada",
    description:
      "Saia midi plissada com movimento leve e cós justo. Peça-chave para compor looks femininos e atemporais.",
    category_id: "cat-saias",
    price: 149.9,
    sale_price: null,
    image_url: null,
    gallery: [],
    is_active: true,
    is_new: false,
    is_on_sale: false,
    stock_quantity: null,
    size: null,
    variations: null,
    created_at: "2026-01-05T12:00:00.000Z",
    updated_at: "2026-01-05T12:00:00.000Z",
  },
  {
    id: "prod-bolsa-estruturada",
    name: "Bolsa Estruturada",
    slug: "bolsa-estruturada",
    description:
      "Bolsa estruturada com alça de mão e tiracolo removível, acabamento em metal dourado. O acessório final para um look completo.",
    category_id: "cat-acessorios",
    price: 199.9,
    sale_price: 169.9,
    image_url: null,
    gallery: [],
    is_active: true,
    is_new: false,
    is_on_sale: true,
    stock_quantity: null,
    size: null,
    variations: null,
    created_at: "2026-01-02T12:00:00.000Z",
    updated_at: "2026-01-02T12:00:00.000Z",
  },
];

/** Retorna a categoria de um produto (a partir dos dados DEMO). */
export function demoCategoryFor(product: Product): Category | null {
  return DEMO_CATEGORIES.find((c) => c.id === product.category_id) ?? null;
}
