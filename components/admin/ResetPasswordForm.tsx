"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

type Status = "checking" | "ready" | "invalid" | "not-configured" | "success";

/**
 * Formulário de definição de nova senha, acessado a partir do link enviado
 * por e-mail (fluxo real do Supabase Auth). O cliente Supabase detecta
 * automaticamente a sessão de recuperação presente na URL.
 */
export function ResetPasswordForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("checking");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setStatus("not-configured");
      return;
    }
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      setStatus(data.session ? "ready" : "invalid");
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setSubmitting(true);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;
      setStatus("success");
      setTimeout(() => router.replace("/admin"), 1800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível atualizar a senha.");
    } finally {
      setSubmitting(false);
    }
  }

  if (status === "checking") {
    return <p className="text-sm text-ink/50">Verificando link de redefinição...</p>;
  }

  if (status === "not-configured") {
    return (
      <p className="border border-ink/10 bg-cream px-4 py-3 text-xs leading-relaxed text-ink/70">
        A redefinição de senha depende de um projeto Supabase conectado. Configure as variáveis de
        ambiente do Supabase para habilitar este fluxo (ver README.md).
      </p>
    );
  }

  if (status === "invalid") {
    return (
      <p className="border border-ink/10 bg-cream px-4 py-3 text-xs leading-relaxed text-ink/70">
        Este link de redefinição é inválido ou expirou. Solicite um novo link na tela de login, em
        “Esqueci minha senha”.
      </p>
    );
  }

  if (status === "success") {
    return (
      <p className="border border-ink/10 bg-cream px-4 py-3 text-xs leading-relaxed text-ink/70">
        Senha atualizada com sucesso. Redirecionando para o painel...
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="password" className="mb-1.5 block text-xs uppercase tracking-wide text-ink/50">
          Nova senha
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-ink/15 bg-cream px-4 py-3 text-sm text-ink focus:border-gold"
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="mb-1.5 block text-xs uppercase tracking-wide text-ink/50">
          Confirmar nova senha
        </label>
        <input
          id="confirmPassword"
          type="password"
          required
          minLength={6}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border border-ink/15 bg-cream px-4 py-3 text-sm text-ink focus:border-gold"
        />
      </div>

      {error && (
        <p className="border border-red-900/20 bg-red-50 px-4 py-3 text-xs text-red-900">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-ink px-6 py-3 text-xs uppercase tracking-[0.16em] text-cream transition-colors hover:bg-ink-soft disabled:opacity-50"
      >
        {submitting ? "Salvando..." : "Salvar nova senha"}
      </button>
    </form>
  );
}
