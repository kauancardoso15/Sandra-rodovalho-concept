import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { Sidebar } from "@/components/admin/Sidebar";
import { InactivityProvider } from "@/components/admin/InactivityProvider";
import { getSettings } from "@/lib/data";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  // Proteção de rota real (defesa em profundidade — o middleware já faz a
  // primeira verificação): sem sessão válida do Supabase Auth, não há
  // acesso ao painel, independentemente da URL digitada.
  if (!isSupabaseConfigured()) {
    redirect("/admin/login");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const settings = await getSettings();

  return (
    <InactivityProvider>
      <div className="flex min-h-screen flex-col bg-cream-soft md:flex-row">
        <Sidebar storeName={settings.store_name} userEmail={user.email ?? ""} />
        <main className="flex-1 px-4 py-8 sm:px-8 sm:py-10">{children}</main>
      </div>
    </InactivityProvider>
  );
}
