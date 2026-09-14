import "server-only";
import { cache } from "react";
import { createClient } from "./supabase/server";
import { isSupabaseConfigured } from "./supabase/env";
import { DEFAULT_SETTINGS } from "./config";
import { DEMO_CATEGORIES, DEMO_PRODUCTS, demoCategoryFor } from "./demo-data";
import type {
  Category,
  DashboardStats,
  InstagramHighlight,
  Product,
  ProductFilters,
  StoreSettings,
} from "./types";

/**
 * Camada única de acesso a dados do catálogo.
 *
 * Sempre que o Supabase está configurado (ver lib/supabase/env.ts), os
 * dados vêm do banco real. Caso contrário — ou se a consulta falhar por
 * qualquer motivo — o site cai graciosamente para o conteúdo DEMO, para
 * que a vitrine nunca fique quebrada durante a apresentação.
 *
 * Todas as funções exportadas são memoizadas por requisição com `cache()`
 * do React: várias partes da árvore (ex.: o layout e a própria página)
 * costumam pedir os mesmos dados (settings, categorias) — sem essa
 * memoização, cada uma dispararia sua própria chamada ao Supabase,
 * multiplicando a latência à toa. Com `cache()`, a mesma chamada dentro de
 * uma única requisição reaproveita o resultado em vez de ir à rede de novo.
 */

const getSupabase = cache(async () => {
  if (!isSupabaseConfigured()) return null;
  try {
    return await createClient();
  } catch {
    return null;
  }
});

function applyFilters(products: Product[], filters: ProductFilters = {}): Product[] {
  let result = products.filter((p) => p.is_active);

  if (filters.search) {
    const term = filters.search.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)
    );
  }
  if (filters.categorySlug) {
    result = result.filter((p) => {
      const cat = p.category ?? demoCategoryFor(p);
      return cat?.slug === filters.categorySlug;
    });
  }
  if (typeof filters.minPrice === "number") {
    result = result.filter((p) => (p.sale_price ?? p.price) >= filters.minPrice!);
  }
  if (typeof filters.maxPrice === "number") {
    result = result.filter((p) => (p.sale_price ?? p.price) <= filters.maxPrice!);
  }
  if (filters.onlyNew) {
    result = result.filter((p) => p.is_new);
  }
  if (filters.onlyOnSale) {
    result = result.filter((p) => p.is_on_sale && p.sale_price && p.sale_price < p.price);
  }
  return result;
}

function withDemoCategory(product: Product): Product {
  return { ...product, category: demoCategoryFor(product) };
}

export const getSettings = cache(async (): Promise<StoreSettings> => {
  const supabase = await getSupabase();
  if (!supabase) return DEFAULT_SETTINGS;

  const { data, error } = await supabase.from("settings").select("*").eq("id", "default").maybeSingle();
  if (error || !data) return DEFAULT_SETTINGS;
  return data as StoreSettings;
});

export const getCategories = cache(async (options: { activeOnly?: boolean } = {}): Promise<Category[]> => {
  const activeOnly = options.activeOnly ?? true;
  const supabase = await getSupabase();

  if (!supabase) {
    const list = activeOnly ? DEMO_CATEGORIES.filter((c) => c.is_active) : DEMO_CATEGORIES;
    return [...list].sort((a, b) => a.sort_order - b.sort_order);
  }

  let query = supabase.from("categories").select("*").order("sort_order", { ascending: true });
  if (activeOnly) query = query.eq("is_active", true);
  const { data, error } = await query;
  if (error || !data) {
    const list = activeOnly ? DEMO_CATEGORIES.filter((c) => c.is_active) : DEMO_CATEGORIES;
    return [...list].sort((a, b) => a.sort_order - b.sort_order);
  }
  return data as Category[];
});

export const getCategoryBySlug = cache(async (slug: string): Promise<Category | null> => {
  const supabase = await getSupabase();
  if (!supabase) {
    return DEMO_CATEGORIES.find((c) => c.slug === slug && c.is_active) ?? null;
  }
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (error || !data) return null;
  return data as Category;
});

export const getProducts = cache(async (filters: ProductFilters = {}): Promise<Product[]> => {
  const supabase = await getSupabase();

  if (!supabase) {
    return applyFilters(DEMO_PRODUCTS.map(withDemoCategory), filters);
  }

  let query = supabase
    .from("products")
    .select("*, category:categories(*)")
    .eq("is_active", true);

  if (filters.search) {
    query = query.ilike("name", `%${filters.search}%`);
  }
  if (filters.categorySlug) {
    const category = await getCategoryBySlug(filters.categorySlug);
    if (category) query = query.eq("category_id", category.id);
    else return [];
  }
  if (typeof filters.minPrice === "number") {
    query = query.gte("price", filters.minPrice);
  }
  if (typeof filters.maxPrice === "number") {
    query = query.lte("price", filters.maxPrice);
  }
  if (filters.onlyNew) {
    query = query.eq("is_new", true);
  }
  if (filters.onlyOnSale) {
    query = query.eq("is_on_sale", true).not("sale_price", "is", null);
  }

  const { data, error } = await query.order("created_at", { ascending: false });
  if (error || !data) {
    return applyFilters(DEMO_PRODUCTS.map(withDemoCategory), filters);
  }
  return data as Product[];
});

export const getProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  const supabase = await getSupabase();
  if (!supabase) {
    const found = DEMO_PRODUCTS.find((p) => p.slug === slug && p.is_active);
    return found ? withDemoCategory(found) : null;
  }
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*)")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (error || !data) return null;
  return data as Product;
});

export const getNewArrivals = cache(async (limit = 8): Promise<Product[]> => {
  const products = await getProducts({ onlyNew: true });
  return products.slice(0, limit);
});

export const getOffers = cache(async (limit?: number): Promise<Product[]> => {
  const products = await getProducts({ onlyOnSale: true });
  return typeof limit === "number" ? products.slice(0, limit) : products;
});

// ---------------------------------------------------------------------------
// Instagram — imagens selecionadas exibidas na seção "Visto no Instagram"
// ---------------------------------------------------------------------------
// Sem Supabase configurado, retorna lista vazia (nunca inventamos posts reais
// do Instagram): a seção pública cai no estado "em breve" ilustrado com a
// moldura da marca em vez de fotos falsas.

export const getInstagramHighlights = cache(
  async (options: { activeOnly?: boolean } = {}): Promise<InstagramHighlight[]> => {
    const activeOnly = options.activeOnly ?? true;
    const supabase = await getSupabase();
    if (!supabase) return [];

    let query = supabase
      .from("instagram_highlights")
      .select("*")
      .order("sort_order", { ascending: true });
    if (activeOnly) query = query.eq("is_active", true);

    const { data, error } = await query;
    if (error || !data) return [];
    return data as InstagramHighlight[];
  }
);

export const getAllInstagramHighlightsAdmin = cache(async (): Promise<InstagramHighlight[]> => {
  return getInstagramHighlights({ activeOnly: false });
});

export const getInstagramHighlightByIdAdmin = cache(
  async (id: string): Promise<InstagramHighlight | null> => {
    const supabase = await getSupabase();
    if (!supabase) return null;
    const { data, error } = await supabase
      .from("instagram_highlights")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error || !data) return null;
    return data as InstagramHighlight;
  }
);

// ---------------------------------------------------------------------------
// Funções administrativas (retornam também itens inativos)
// ---------------------------------------------------------------------------

export const getAllProductsAdmin = cache(async (): Promise<Product[]> => {
  const supabase = await getSupabase();
  if (!supabase) return DEMO_PRODUCTS.map(withDemoCategory);

  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*)")
    .order("created_at", { ascending: false });
  if (error || !data) return DEMO_PRODUCTS.map(withDemoCategory);
  return data as Product[];
});

export const getProductByIdAdmin = cache(async (id: string): Promise<Product | null> => {
  const supabase = await getSupabase();
  if (!supabase) {
    const found = DEMO_PRODUCTS.find((p) => p.id === id);
    return found ? withDemoCategory(found) : null;
  }
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*)")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return null;
  return data as Product;
});

export const getAllCategoriesAdmin = cache(async (): Promise<Category[]> => {
  return getCategories({ activeOnly: false });
});

export const getCategoryByIdAdmin = cache(async (id: string): Promise<Category | null> => {
  const supabase = await getSupabase();
  if (!supabase) return DEMO_CATEGORIES.find((c) => c.id === id) ?? null;
  const { data, error } = await supabase.from("categories").select("*").eq("id", id).maybeSingle();
  if (error || !data) return null;
  return data as Category;
});

export const getDashboardStats = cache(async (): Promise<DashboardStats> => {
  const [products, categories, instagramHighlights] = await Promise.all([
    getAllProductsAdmin(),
    getAllCategoriesAdmin(),
    getAllInstagramHighlightsAdmin(),
  ]);

  return {
    totalProducts: products.length,
    activeProducts: products.filter((p) => p.is_active).length,
    onSaleProducts: products.filter((p) => p.is_on_sale && p.sale_price).length,
    newProducts: products.filter((p) => p.is_new).length,
    totalCategories: categories.length,
    instagramHighlights: instagramHighlights.length,
    activeCategories: categories.filter((c) => c.is_active).length,
  };
});
