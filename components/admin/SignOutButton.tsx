"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function SignOutButton({ className }: { className?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={loading}
      className={cn(
        "text-xs uppercase tracking-[0.14em] text-cream/60 transition-colors hover:text-cream disabled:opacity-50",
        className
      )}
    >
      {loading ? "Saindo..." : "Sair"}
    </button>
  );
}
