import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/admin/LoginForm";
import { ADMIN_INACTIVITY_MESSAGE } from "@/lib/config";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Acesso ao painel",
  robots: { index: false, follow: false },
};

interface LoginPageProps {
  searchParams: Promise<{ redirectTo?: string; timeout?: string }>;
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const [{ redirectTo, timeout }, settings] = await Promise.all([searchParams, getSettings()]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-soft px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="font-display text-2xl text-ink">
            {settings.store_name}
          </Link>
          <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-gold-deep">
            Painel administrativo
          </p>
        </div>

        <div className="border border-ink/10 bg-white p-8 shadow-sm">
          {timeout === "1" && (
            <p className="mb-6 border border-ink/10 bg-cream px-4 py-3 text-xs text-ink/60">
              {ADMIN_INACTIVITY_MESSAGE}
            </p>
          )}
          <LoginForm redirectTo={redirectTo ?? "/admin"} />
        </div>

        <p className="mt-6 text-center text-xs text-ink/40">
          <Link href="/" className="hover:text-ink">
            ← Voltar para o site
          </Link>
        </p>
      </div>
    </div>
  );
}
