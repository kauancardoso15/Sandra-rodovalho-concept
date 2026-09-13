import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProductImage } from "@/components/ui/ProductImage";
import { LinkButton } from "@/components/ui/Button";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça a Sandra Rodovalho Concept: moda feminina que valoriza a elegância, a personalidade e o estilo de cada mulher.",
};

export default async function SobrePage() {
  const settings = await getSettings();

  return (
    <div className="py-16 md:py-24">
      <Container className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <ProductImage
            src={settings.about_image_url}
            alt={`Sobre a ${settings.store_name}`}
            label="Sobre a marca"
            priority
          />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold-deep">A marca</p>
          <h1 className="mt-4 font-display text-4xl font-medium text-ink md:text-5xl">
            {settings.store_name}
          </h1>
          <p className="mt-3 font-display text-lg italic text-ink/60">
            {settings.home_subheadline}
          </p>

          <div className="mt-8 space-y-4 text-sm leading-relaxed text-ink/70 md:text-base">
            <p>{settings.about_text}</p>
            <p>
              Cada coleção é pensada para acompanhar a mulher em diferentes momentos — do
              compromisso profissional ao encontro descontraído — sempre com um olhar atento
              a caimento, qualidade e atemporalidade.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <LinkButton href="/novidades" variant="secondary" size="md">
              Ver novidades
            </LinkButton>
            <LinkButton href="/contato" variant="ghost" size="md">
              Fale conosco
            </LinkButton>
          </div>
        </div>
      </Container>
    </div>
  );
}
