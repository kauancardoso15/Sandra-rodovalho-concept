"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";

export interface CategoryFormState {
  error?: string;
}

function revalidateCatalog() {
  revalidatePath("/admin/categorias");
  revalidatePath("/admin");
  revalidatePath("/", "layout");
}

export async function createCategoryAction(
  _prevState: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const imageUrl = String(formData.get("image_url") ?? "").trim() || null;
  const sortOrder = Number(formData.get("sort_order") ?? 0);
  const isActive = formData.get("is_active") === "on";

  if (!name) return { error: "Informe o nome da categoria." };

  const supabase = await createClient();
  const baseSlug = slugify(name);
  let slug = baseSlug;

  for (let attempt = 0; attempt < 5; attempt++) {
    const { error } = await supabase.from("categories").insert({
      name,
      slug,
      image_url: imageUrl,
      sort_order: sortOrder,
      is_active: isActive,
    });

    if (!error) {
      revalidateCatalog();
      redirect("/admin/categorias");
    }

    if (error.code === "23505") {
      slug = `${baseSlug}-${attempt + 2}`;
      continue;
    }

    return { error: "Não foi possível salvar a categoria. Tente novamente." };
  }

  return { error: "Não foi possível gerar um identificador único para esta categoria." };
}

export async function updateCategoryAction(
  _prevState: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const imageUrl = String(formData.get("image_url") ?? "").trim() || null;
  const sortOrder = Number(formData.get("sort_order") ?? 0);
  const isActive = formData.get("is_active") === "on";

  if (!id) return { error: "Categoria inválida." };
  if (!name) return { error: "Informe o nome da categoria." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("categories")
    .update({ name, image_url: imageUrl, sort_order: sortOrder, is_active: isActive })
    .eq("id", id);

  if (error) return { error: "Não foi possível atualizar a categoria. Tente novamente." };

  revalidateCatalog();
  redirect("/admin/categorias");
}

export async function deleteCategoryAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  await supabase.from("categories").delete().eq("id", id);
  revalidateCatalog();
}

export async function toggleCategoryActiveAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const value = formData.get("value") === "true";
  if (!id) return;

  const supabase = await createClient();
  await supabase.from("categories").update({ is_active: value }).eq("id", id);
  revalidateCatalog();
}
