import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured } from "./env";

/**
 * Renova a sessão Supabase a cada requisição e protege as rotas do painel
 * administrativo (/admin/**), redirecionando visitantes não autenticados
 * para /admin/login. É a camada real de proteção de rotas — a rota não é
 * apenas "escondida" da navegação, ela é verificada no servidor.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isPublicAdminRoute =
    request.nextUrl.pathname === "/admin/login" ||
    request.nextUrl.pathname === "/admin/redefinir-senha";

  if (!isSupabaseConfigured()) {
    // Supabase ainda não configurado: deixamos a própria página de login
    // exibir uma mensagem explicativa em vez de autenticar de forma falsa.
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isAdminRoute && !isPublicAdminRoute && !user) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (request.nextUrl.pathname === "/admin/login" && user) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return supabaseResponse;
}
