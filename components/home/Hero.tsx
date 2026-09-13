import { LinkButton, AnchorButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/product/WhatsAppBuyButton";
import { buildWhatsAppUrl } from "@/lib/utils";
import { ProductImage } from "@/components/ui/ProductImage";
import type { StoreSettings } from "@/lib/types";

export function Hero({ settings }: { settings: StoreSettings }) {
  const whatsappUrl = buildWhatsAppUrl(
    settings.whatsapp_number,
    "Olá! Vim pelo site da Sandra Rodovalho Concept e gostaria de conhecer as peças."
  );

  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <div className="container-page grid min-h-[86vh] items-center gap-10 py-24 md:min-h-[90vh] md:grid-cols-2 md:gap-16 md:py-32">
        <div className="animate-in">
          <p className="text-xs uppercase tracking-[0.35em] text-gold-soft">
            Vitrine digital
          </p>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl">
            {settings.home_headline || "Sandra Rodovalho Concept"}
          </h1>
          <p className="mt-6 font-display text-xl italic text-cream/80">
            {settings.home_subheadline || "Moda feminina com essência."}
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.3em] text-cream/50">
            Elegância • Propósito • Estilo
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <LinkButton href="/novidades" variant="outline" size="lg">
              Ver novidades
            </LinkButton>
            <AnchorButton
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
            >
              <WhatsAppIcon />
              Comprar pelo WhatsApp
            </AnchorButton>
          </div>
        </div>

        <div className="relative order-first aspect-[4/5] w-full md:order-last md:aspect-[3/4]">
          <div className="absolute -inset-3 hidden border border-gold/25 md:block" />
          <div className="relative h-full w-full overflow-hidden">
            <ProductImage
              src={settings.hero_image_url}
              alt={settings.store_name}
              label="Editorial Sandra Rodovalho Concept"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
