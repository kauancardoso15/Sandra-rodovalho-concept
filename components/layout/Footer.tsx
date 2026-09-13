import Link from "next/link";
import { MAIN_NAV, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/config";
import { buildWhatsAppUrl } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/product/WhatsAppBuyButton";
import type { StoreSettings } from "@/lib/types";

export function Footer({ settings }: { settings: StoreSettings }) {
  const whatsappUrl = buildWhatsAppUrl(settings.whatsapp_number, WHATSAPP_DEFAULT_MESSAGE);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cream/10 bg-ink text-cream">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl tracking-[0.06em]">{settings.store_name}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/60">
            {settings.home_subheadline || "Moda feminina com essência."}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a
              href={settings.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-gold"
              aria-label="Instagram da Sandra Rodovalho Concept"
            >
              <InstagramIcon />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-gold"
              aria-label="WhatsApp da Sandra Rodovalho Concept"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold-soft">Navegação</p>
          <ul className="mt-4 space-y-2.5">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-cream/70 hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold-soft">Fale conosco</p>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
            <li>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                {settings.instagram_handle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-page flex flex-col gap-2 py-6 text-[11px] text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {settings.store_name}. Todos os direitos reservados.
          </p>
          <p>Moda feminina com essência.</p>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
