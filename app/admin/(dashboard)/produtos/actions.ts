"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";

export interface ProductFormState {
  error?: string;
}

function parseProductForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const categoryId = String(formData.get("category_id") ?? "") || null;
  const price = Number(formData.get("price") ?? 0);
  const salePriceRaw = String(formData.get("sale_price") ?? "").trim();
  const salePrice = salePriceRaw ? Number(salePriceRaw) : null;
  const imageUrl = String(formData.get("image_url") ?? "").trim() || null;
  const isActive = formData.get("is_active") === "on";
  const isNew = formData.get("is_new") === "on";
  const isOnSale = formData.get("is_on_sale") === "on";

  return { name, description, categoryId, price, salePrice, imageUrl, isActive, isNew, isOnSale };
}

function revalidateCatalog() {
  revalidatePath("/admin/produtos");
  revalidatePath("/admin");
  revalidatePath("/", "layout");
}

export async function createProductAction(
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const data = parseProductForm(formData);

  if (!data.name) return { error: "Informe o nome do produto." };
  if (!data.price || data.price <= 0) return { error: "Informe um preço válido." };
  if (data.salePrice && data.salePrice >= data.price) {
    return { error: "O preço promocional deve ser menor que o preço original." };
  }

  const supabase = await createClient();
  const baseSlug = slugify(data.name);
  let slug = baseSlug;

  for (let attempt = 0; attempt < 5; attempt++) {
    const { error } = await supabase.from("products").insert({
      name: data.name,
      slug,
      description: data.description,
      category_id: data.categoryId,
      price: data.price,
      sale_price: data.salePrice,
      image_url: data.imageUrl,
      is_active: data.isActive,
      is_new: data.isNew,
      is_on_sale: data.isOnSale,
    });

    if (!error) {
      revalidateCatalog();
      redirect("/admin/produtos");
    }

    if (error.code === "23505") {
      slug = `${baseSlug}-${attempt + 2}`;
      continue;
    }

    return { error: "Não foi possível salvar o produto. Tente novamente." };
  }

  return { error: "Não foi possível gerar um identificador único para este produto." };
}

export async function updateProductAction(
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Produto inválido." };

  const data = parseProductForm(formData);
  if (!data.name) return { error: "Informe o nome do produto." };
  if (!data.price || data.price <= 0) return { error: "Informe um preço válido." };
  if (data.salePrice && data.salePrice >= data.price) {
    return { error: "O preço promocional deve ser menor que o preço original." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("products")
    .update({
      name: data.name,
      description: data.description,
      category_id: data.categoryId,
      price: data.price,
      sale_price: data.salePrice,
      image_url: data.imageUrl,
      is_active: data.isActive,
      is_new: data.isNew,
      is_on_sale: data.isOnSale,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: "Não foi possível atualizar o produto. Tente novamente." };

  revalidateCatalog();
  redirect("/admin/produtos");
}

export async function deleteProductAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  await supabase.from("products").delete().eq("id", id);
  revalidateCatalog();
}

export async function toggleProductFieldAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const field = String(formData.get("field") ?? "");
  const value = formData.get("value") === "true";

  if (!id || !["is_active", "is_new", "is_on_sale"].includes(field)) return;

  const supabase = await createClient();
  await supabase
    .from("products")
    .update({ [field]: value, updated_at: new Date().toISOString() })
    .eq("id", id);

  revalidateCatalog();
}
