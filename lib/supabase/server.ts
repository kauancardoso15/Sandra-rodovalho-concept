import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseEnv } from "./env";

/**
 * Cliente Supabase para uso em Server Components, Server Actions e Route
 * Handlers. Lê/grava a sessão via cookies do Next.js.
 */
export async function createClient() {
  const cookieStore = await cookies();
  const { url, anonKey } = getSupabaseEnv();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Chamado a partir de um Server Component: pode ser ignorado
          // porque o middleware já cuida da renovação de sessão.
        }
      },
    },
  });
}
