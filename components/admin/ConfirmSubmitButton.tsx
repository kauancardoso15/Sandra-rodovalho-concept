"use client";

import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface ConfirmSubmitButtonProps extends ComponentPropsWithoutRef<"button"> {
  confirmMessage: string;
}

/** Botão de submit que pede confirmação antes de disparar uma ação destrutiva (ex.: excluir). */
export function ConfirmSubmitButton({ confirmMessage, className, children, ...rest }: ConfirmSubmitButtonProps) {
  return (
    <button
      type="submit"
      className={cn(className)}
      onClick={(e) => {
        if (!window.confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
