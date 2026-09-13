import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { getCategories, getProducts } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/novidades`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/categorias`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/produtos`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/ofertas`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/sobre`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contato`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE_URL}/categorias/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/produtos/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
    lastModified: p.updated_at,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
