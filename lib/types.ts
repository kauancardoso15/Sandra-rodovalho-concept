/**
 * Tipos centrais do catálogo Sandra Rodovalho Concept.
 * Espelham as tabelas do Supabase definidas em /supabase/schema.sql.
 */

export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category_id: string | null;
  /** Preenchido via join/lookup quando disponível. */
  category?: Category | null;
  price: number;
  sale_price: number | null;
  image_url: string | null;
  gallery: string[];
  is_active: boolean;
  is_new: boolean;
  is_on_sale: boolean;
  /** Campos preparados para uma futura gestão de estoque/variações. Não utilizados no painel atual. */
  stock_quantity: number | null;
  size: string | null;
  variations: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface StoreSettings {
  id: string;
  store_name: string;
  logo_url: string | null;
  whatsapp_number: string;
  instagram_handle: string;
  instagram_url: string;
  home_headline: string;
  home_subheadline: string;
  hero_image_url: string | null;
  about_text: string;
  about_image_url: string | null;
  updated_at: string;
}

export interface ProductFilters {
  search?: string;
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  onlyNew?: boolean;
  onlyOnSale?: boolean;
}

export interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  onSaleProducts: number;
  newProducts: number;
  totalCategories: number;
  activeCategories: number;
}
