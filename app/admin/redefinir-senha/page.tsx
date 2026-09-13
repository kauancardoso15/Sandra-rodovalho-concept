import type { Metadata } from "next";
import Link from "next/link";
import { ResetPasswordForm } from "@/components/admin/ResetPasswordForm";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Redefinir senha",
  robots: { index: false, follow: false },
};

export default async function ResetPasswordPage() {
  const settings = await getSettings();

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-soft px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="font-display text-2xl text-ink">
            {settings.store_name}
          </Link>
          <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-gold-deep">Redefinir senha</p>
        </div>

        <div className="border border-ink/10 bg-white p-8 shadow-sm">
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
}
