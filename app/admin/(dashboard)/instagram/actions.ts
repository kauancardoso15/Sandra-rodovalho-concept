"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface InstagramHighlightFormState {
  error?: string;
}

function revalidateHome() {
  revalidatePath("/admin/instagram");
  revalidatePath("/admin");
  revalidatePath("/", "layout");
}

export async function createInstagramHighlightAction(
  _prevState: InstagramHighlightFormState,
  formData: FormData
): Promise<InstagramHighlightFormState> {
  const imageUrl = String(formData.get("image_url") ?? "").trim();
  const caption = String(formData.get("caption") ?? "").trim() || null;
  const link = String(formData.get("link") ?? "").trim() || null;
  const sortOrder = Number(formData.get("sort_order") ?? 0);
  const isActive = formData.get("is_active") === "on";

  if (!imageUrl) return { error: "Envie ou cole a URL de uma imagem." };

  const supabase = await createClient();
  const { error } = await supabase.from("instagram_highlights").insert({
    image_url: imageUrl,
    caption,
    link,
    sort_order: sortOrder,
    is_active: isActive,
  });

  if (error) return { error: "Não foi possível salvar a imagem. Tente novamente." };

  revalidateHome();
  redirect("/admin/instagram");
}

export async function updateInstagramHighlightAction(
  _prevState: InstagramHighlightFormState,
  formData: FormData
): Promise<InstagramHighlightFormState> {
  const id = String(formData.get("id") ?? "");
  const imageUrl = String(formData.get("image_url") ?? "").trim();
  const caption = String(formData.get("caption") ?? "").trim() || null;
  const link = String(formData.get("link") ?? "").trim() || null;
  const sortOrder = Number(formData.get("sort_order") ?? 0);
  const isActive = formData.get("is_active") === "on";

  if (!id) return { error: "Imagem inválida." };
  if (!imageUrl) return { error: "Envie ou cole a URL de uma imagem." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("instagram_highlights")
    .update({ image_url: imageUrl, caption, link, sort_order: sortOrder, is_active: isActive })
    .eq("id", id);

  if (error) return { error: "Não foi possível atualizar a imagem. Tente novamente." };

  revalidateHome();
  redirect("/admin/instagram");
}

export async function deleteInstagramHighlightAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  await supabase.from("instagram_highlights").delete().eq("id", id);
  revalidateHome();
}

export async function toggleInstagramHighlightActiveAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const value = formData.get("value") === "true";
  if (!id) return;

  const supabase = await createClient();
  await supabase.from("instagram_highlights").update({ is_active: value }).eq("id", id);
  revalidateHome();
}
