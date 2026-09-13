"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface SettingsFormState {
  error?: string;
  success?: boolean;
}

export async function updateSettingsAction(
  _prevState: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  const storeName = String(formData.get("store_name") ?? "").trim();
  const whatsappNumber = String(formData.get("whatsapp_number") ?? "").trim();
  const instagramHandle = String(formData.get("instagram_handle") ?? "").trim();
  const instagramUrl = String(formData.get("instagram_url") ?? "").trim();
  const homeHeadline = String(formData.get("home_headline") ?? "").trim();
  const homeSubheadline = String(formData.get("home_subheadline") ?? "").trim();
  const heroImageUrl = String(formData.get("hero_image_url") ?? "").trim() || null;
  const aboutText = String(formData.get("about_text") ?? "").trim();
  const aboutImageUrl = String(formData.get("about_image_url") ?? "").trim() || null;
  const logoUrl = String(formData.get("logo_url") ?? "").trim() || null;

  if (!storeName) return { error: "Informe o nome da loja." };
  if (!whatsappNumber || whatsappNumber.replace(/\D/g, "").length < 10) {
    return { error: "Informe um número de WhatsApp válido, com DDI e DDD (ex.: 5561999990000)." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("settings").upsert({
    id: "default",
    store_name: storeName,
    whatsapp_number: whatsappNumber.replace(/\D/g, ""),
    instagram_handle: instagramHandle,
    instagram_url: instagramUrl,
    home_headline: homeHeadline,
    home_subheadline: homeSubheadline,
    hero_image_url: heroImageUrl,
    about_text: aboutText,
    about_image_url: aboutImageUrl,
    logo_url: logoUrl,
    updated_at: new Date().toISOString(),
  });

  if (error) return { error: "Não foi possível salvar as configurações. Tente novamente." };

  revalidatePath("/", "layout");
  revalidatePath("/admin/configuracoes");
  return { success: true };
}
