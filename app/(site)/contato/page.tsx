import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnchorButton } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/product/WhatsAppBuyButton";
import { buildWhatsAppUrl } from "@/lib/utils";
import { WHATSAPP_DEFAULT_MESSAGE } from "@/lib/config";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Sandra Rodovalho Concept pelo WhatsApp ou Instagram.",
};

export default async function ContatoPage() {
  const settings = await getSettings();
  const whatsappUrl = buildWhatsAppUrl(settings.whatsapp_number, WHATSAPP_DEFAULT_MESSAGE);

  return (
    <div className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Fale conosco"
          title="Contato"
          description="Prefere falar diretamente com a nossa equipe? Estamos à disposição pelo WhatsApp e pelo Instagram."
          align="center"
          className="mx-auto"
        />

        <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-4 border border-ink/10 px-8 py-12 text-center transition-colors hover:border-[#1e7d4f]"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1e7d4f] text-cream">
              <WhatsAppIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-xl text-ink">WhatsApp</p>
              <p className="mt-1 text-sm text-ink/60">Atendimento rápido e direto</p>
            </div>
            <AnchorButton
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="sm"
              className="mt-2"
            >
              Iniciar conversa
            </AnchorButton>
          </a>

          <a
            href={settings.instagram_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-4 border border-ink/10 px-8 py-12 text-center transition-colors hover:border-gold"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-gold-soft">
              <InstagramIcon />
            </span>
            <div>
              <p className="font-display text-xl text-ink">Instagram</p>
              <p className="mt-1 text-sm text-ink/60">{settings.instagram_handle}</p>
            </div>
            <AnchorButton
              href={settings.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="sm"
              className="mt-2"
            >
              Seguir no Instagram
            </AnchorButton>
          </a>
        </div>
      </Container>
    </div>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
