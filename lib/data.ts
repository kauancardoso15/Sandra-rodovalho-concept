import "server-only";
import { createClient } from "./supabase/server";
import { isSupabaseConfigured } from "./supabase/env";
import { DEFAULT_SETTINGS } from "./config";
import { DEMO_CATEGORIES, DEMO_PRODUCTS, demoCategoryFor } from "./demo-data";
import type { Category, DashboardStats, Product, ProductFilters, StoreSettings } from "./types";

/**
 * Camada única de acesso a dados do catálogo.
 *
 * Sempre que o Supabase está configurado (ver lib/supabase/env.ts), os
 * dados vêm do banco real. Caso contrário — ou se a consulta falhar por
 * qualquer motivo — o site cai graciosamente para o conteúdo DEMO, para
 * que a vitrine nunca fique quebrada durante a apresentação.
 */

async function safeSupabase() {
  if (!isSupabaseConfigured()) return null;
  try {
    return await createClient();
  } catch {
    return null;
  }
}

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

export async function getSettings(): Promise<StoreSettings> {
  const supabase = await safeSupabase();
  if (!supabase) return DEFAULT_SETTINGS;

  const { data, error } = await supabase.from("settings").select("*").eq("id", "default").maybeSingle();
  if (error || !data) return DEFAULT_SETTINGS;
  return data as StoreSettings;
}

export async function getCategories(options: { activeOnly?: boolean } = {}): Promise<Category[]> {
  const activeOnly = options.activeOnly ?? true;
  const supabase = await safeSupabase();

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
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = await safeSupabase();
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
}

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  const supabase = await safeSupabase();

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
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await safeSupabase();
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
}

export async function getNewArrivals(limit = 8): Promise<Product[]> {
  const products = await getProducts({ onlyNew: true });
  return products.slice(0, limit);
}

export async function getOffers(limit?: number): Promise<Product[]> {
  const products = await getProducts({ onlyOnSale: true });
  return typeof limit === "number" ? products.slice(0, limit) : products;
}

// ---------------------------------------------------------------------------
// Funções administrativas (retornam também itens inativos)
// ---------------------------------------------------------------------------

export async function getAllProductsAdmin(): Promise<Product[]> {
  const supabase = await safeSupabase();
  if (!supabase) return DEMO_PRODUCTS.map(withDemoCategory);

  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*)")
    .order("created_at", { ascending: false });
  if (error || !data) return DEMO_PRODUCTS.map(withDemoCategory);
  return data as Product[];
}

export async function getProductByIdAdmin(id: string): Promise<Product | null> {
  const supabase = await safeSupabase();
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
}

export async function getAllCategoriesAdmin(): Promise<Category[]> {
  return getCategories({ activeOnly: false });
}

export async function getCategoryByIdAdmin(id: string): Promise<Category | null> {
  const supabase = await safeSupabase();
  if (!supabase) return DEMO_CATEGORIES.find((c) => c.id === id) ?? null;
  const { data, error } = await supabase.from("categories").select("*").eq("id", id).maybeSingle();
  if (error || !data) return null;
  return data as Category;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [products, categories] = await Promise.all([
    getAllProductsAdmin(),
    getAllCategoriesAdmin(),
  ]);

  return {
    totalProducts: products.length,
    activeProducts: products.filter((p) => p.is_active).length,
    onSaleProducts: products.filter((p) => p.is_on_sale && p.sale_price).length,
    newProducts: products.filter((p) => p.is_new).length,
    totalCategories: categories.length,
    activeCategories: categories.filter((c) => c.is_active).length,
  };
}
