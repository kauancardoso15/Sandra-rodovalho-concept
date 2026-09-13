"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { signInAction, requestPasswordResetAction, type AuthActionState } from "@/app/admin/login/actions";
import { cn } from "@/lib/utils";

const initialState: AuthActionState = {};

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [loginState, loginAction] = useActionState(signInAction, initialState);
  const [forgotState, forgotAction] = useActionState(requestPasswordResetAction, initialState);

  if (mode === "forgot") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl text-ink">Recuperar senha</h1>
          <p className="mt-2 text-sm text-ink/60">
            Informe o e-mail cadastrado para receber um link de redefinição de senha.
          </p>
        </div>

        <form action={forgotAction} className="space-y-4">
          <Field label="E-mail" name="email" type="email" placeholder="voce@sandrarodovalhoconcept.com.br" />

          {forgotState.error && <FormMessage tone="error">{forgotState.error}</FormMessage>}
          {forgotState.info && <FormMessage tone="info">{forgotState.info}</FormMessage>}

          <SubmitButton label="Enviar link de redefinição" />
        </form>

        <button
          type="button"
          onClick={() => setMode("login")}
          className="text-xs uppercase tracking-wide text-ink/50 hover:text-ink"
        >
          ← Voltar ao login
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-ink">Painel administrativo</h1>
        <p className="mt-2 text-sm text-ink/60">Entre com seu e-mail e senha para continuar.</p>
      </div>

      <form action={loginAction} className="space-y-4">
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <Field label="E-mail" name="email" type="email" placeholder="voce@sandrarodovalhoconcept.com.br" autoFocus />
        <Field label="Senha" name="password" type="password" placeholder="••••••••" />

        {loginState.error && <FormMessage tone="error">{loginState.error}</FormMessage>}

        <SubmitButton label="Entrar" />
      </form>

      <button
        type="button"
        onClick={() => setMode("forgot")}
        className="text-xs uppercase tracking-wide text-ink/50 hover:text-ink"
      >
        Esqueci minha senha
      </button>
    </div>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  autoFocus,
}: {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  autoFocus?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs uppercase tracking-wide text-ink/50">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full border border-ink/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink/30 focus:border-gold"
      />
    </div>
  );
}

function FormMessage({ tone, children }: { tone: "error" | "info"; children: React.ReactNode }) {
  return (
    <p
      className={cn(
        "border px-4 py-3 text-xs leading-relaxed",
        tone === "error" ? "border-red-900/20 bg-red-50 text-red-900" : "border-ink/10 bg-cream-soft text-ink/70"
      )}
    >
      {children}
    </p>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-ink px-6 py-3 text-xs uppercase tracking-[0.16em] text-cream transition-colors hover:bg-ink-soft disabled:opacity-50"
    >
      {pending ? "Aguarde..." : label}
    </button>
  );
}
