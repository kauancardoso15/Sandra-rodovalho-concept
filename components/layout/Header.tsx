"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MAIN_NAV } from "@/lib/config";
import { AnchorButton } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/product/WhatsAppBuyButton";
import { buildWhatsAppUrl } from "@/lib/utils";
import { WHATSAPP_DEFAULT_MESSAGE } from "@/lib/config";
import type { StoreSettings } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Header({ settings }: { settings: StoreSettings }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const whatsappUrl = buildWhatsAppUrl(settings.whatsapp_number, WHATSAPP_DEFAULT_MESSAGE);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-colors duration-300",
        scrolled ? "border-ink/10 bg-cream/95 backdrop-blur" : "border-transparent bg-cream"
      )}
    >
      <div className="container-page flex h-18 items-center justify-between py-4">
        <Link href="/" className="font-display text-xl tracking-[0.08em] text-ink">
          {settings.store_name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {MAIN_NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-xs uppercase tracking-[0.16em] transition-colors hover:text-gold-deep",
                  active ? "text-gold-deep" : "text-ink/70"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <AnchorButton
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="sm"
          >
            <WhatsAppIcon />
            Comprar pelo WhatsApp
          </AnchorButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          <span className="relative flex h-4 w-6 flex-col justify-between">
            <span
              className={cn(
                "h-[1.5px] w-full bg-ink transition-transform",
                open && "translate-y-[7px] rotate-45"
              )}
            />
            <span className={cn("h-[1.5px] w-full bg-ink transition-opacity", open && "opacity-0")} />
            <span
              className={cn(
                "h-[1.5px] w-full bg-ink transition-transform",
                open && "-translate-y-[7px] -rotate-45"
              )}
            />
          </span>
        </button>
      </div>

      {/* Menu mobile */}
      <div
        className={cn(
          "overflow-hidden border-t border-ink/10 bg-cream transition-[max-height,opacity] duration-300 md:hidden",
          open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container-page flex flex-col gap-1 py-4">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-3 text-sm uppercase tracking-[0.14em] text-ink/80 border-b border-ink/5 last:border-none"
            >
              {item.label}
            </Link>
          ))}
          <AnchorButton
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="md"
            className="mt-4"
          >
            <WhatsAppIcon />
            Comprar pelo WhatsApp
          </AnchorButton>
        </nav>
      </div>
    </header>
  );
}
