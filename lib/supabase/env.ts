/**
 * O site funciona em dois modos:
 *
 * 1) MODO DEMONSTRAÇÃO (sem Supabase configurado): o catálogo público é
 *    exibido a partir de /lib/demo-data.ts. Ideal para apresentar o projeto
 *    imediatamente, sem precisar configurar infraestrutura.
 *
 * 2) MODO PRODUÇÃO (Supabase configurado via variáveis de ambiente): todo o
 *    conteúdo passa a vir do banco de dados real, e o painel /admin permite
 *    editar produtos, categorias e configurações.
 *
 * Basta preencher NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY
 * (ver .env.local.example) para migrar do modo 1 para o modo 2 — nenhuma
 * alteração de código é necessária.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      "Supabase não está configurado. Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }
  return { url, anonKey };
}
