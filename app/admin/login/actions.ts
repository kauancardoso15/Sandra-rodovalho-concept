"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export interface AuthActionState {
  error?: string;
  info?: string;
}

export async function signInAction(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  if (!isSupabaseConfigured()) {
    return {
      error:
        "O painel administrativo ainda não está conectado a um projeto Supabase. Configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY para habilitar o login (ver README.md).",
    };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirectTo") ?? "/admin");

  if (!email || !password) {
    return { error: "Informe e-mail e senha." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "E-mail ou senha inválidos." };
  }

  redirect(redirectTo.startsWith("/admin") ? redirectTo : "/admin");
}

export async function requestPasswordResetAction(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  if (!isSupabaseConfigured()) {
    return {
      error:
        "A recuperação de senha depende do Supabase Auth, que ainda não está configurado neste ambiente de demonstração.",
    };
  }

  const email = String(formData.get("email") ?? "").trim();
  if (!email) return { error: "Informe seu e-mail." };

  const supabase = await createClient();
  const headerList = await headers();
  const origin = headerList.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/admin/redefinir-senha`,
  });

  if (error) {
    // Não revelamos se o e-mail existe ou não, por segurança.
    return { info: "Se este e-mail estiver cadastrado, você receberá um link de redefinição em instantes." };
  }

  return { info: "Se este e-mail estiver cadastrado, você receberá um link de redefinição em instantes." };
}
