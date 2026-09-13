"use client";

import { buildWhatsAppUrl } from "@/lib/utils";
import { WHATSAPP_DEFAULT_MESSAGE } from "@/lib/config";
import { WhatsAppIcon } from "@/components/product/WhatsAppBuyButton";

export function WhatsAppFloatingButton({ phone }: { phone: string }) {
  const url = buildWhatsAppUrl(phone, WHATSAPP_DEFAULT_MESSAGE);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1e7d4f] text-cream shadow-lg shadow-ink/20 transition-transform hover:scale-105 md:bottom-8 md:right-8"
      aria-label="Falar no WhatsApp"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
