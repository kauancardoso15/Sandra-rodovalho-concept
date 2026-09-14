import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { ProductImage } from "@/components/ui/ProductImage";
import type { StoreSettings } from "@/lib/types";

export function AboutSection({ settings }: { settings: StoreSettings }) {
  return (
    <section className="bg-cream-soft py-20 md:py-28">
      <Container className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
        <div className="photo-frame relative aspect-[4/5] w-full overflow-hidden bg-ink order-first md:order-none">
          <ProductImage
            src={settings.about_image_url}
            alt={`Sobre a ${settings.store_name}`}
            label="Sobre a marca"
          />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold-deep">A marca</p>
          <h2 className="mt-4 font-display text-3xl font-medium text-ink md:text-4xl">
            Sobre a {settings.store_name}
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-ink/70 md:text-base">
            {settings.about_text}
          </p>
          <div className="mt-8">
            <LinkButton href="/sobre" variant="secondary" size="md">
              Conheça a marca
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
