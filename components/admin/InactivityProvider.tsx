"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ADMIN_INACTIVITY_TIMEOUT_MS } from "@/lib/config";

const ACTIVITY_EVENTS = [
  "mousemove",
  "mousedown",
  "keydown",
  "touchstart",
  "scroll",
  "click",
] as const;

/**
 * Encerra automaticamente a sessão do painel administrativo após um período
 * de INATIVIDADE (não de tempo total de página aberta). Qualquer interação
 * do administrador — mouse, teclado, toque, scroll, cliques — reinicia a
 * contagem. O tempo é controlado por ADMIN_INACTIVITY_TIMEOUT_MS
 * (lib/config.ts).
 */
export function InactivityProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTimeout = useCallback(async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // Ignora falhas de rede ao encerrar sessão — o redirecionamento ainda ocorre.
    }
    router.replace("/admin/login?timeout=1");
  }, [router]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(handleTimeout, ADMIN_INACTIVITY_TIMEOUT_MS);
  }, [handleTimeout]);

  useEffect(() => {
    resetTimer();
    ACTIVITY_EVENTS.forEach((evt) => window.addEventListener(evt, resetTimer, { passive: true }));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      ACTIVITY_EVENTS.forEach((evt) => window.removeEventListener(evt, resetTimer));
    };
  }, [resetTimer]);

  return <>{children}</>;
}
