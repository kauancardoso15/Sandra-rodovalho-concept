import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnchorButton } from "@/components/ui/Button";
import { ProductImage, BrandFrame } from "@/components/ui/ProductImage";
import type { InstagramHighlight, StoreSettings } from "@/lib/types";

const PLACEHOLDER_TILES = 5;

export function InstagramSection({
  settings,
  highlights,
}: {
  settings: StoreSettings;
  highlights: InstagramHighlight[];
}) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={settings.instagram_handle}
            title="Visto no Instagram"
            description="Acompanhe looks, bastidores e novidades em primeira mão."
          />
          <AnchorButton
            href={settings.instagram_url}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Ver no Instagram
          </AnchorButton>
        </div>

        {highlights.length > 0 ? (
          // Largura fixa por foto (não um grid rígido de 5 colunas): com poucas
          // fotos cadastradas, a fileira continua parecendo curada e
          // proposital, em vez de deixar um vão vazio ao lado.
          <div className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-3">
            {highlights.map((highlight) => (
              <a
                key={highlight.id}
                href={highlight.link || settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="photo-frame group relative aspect-square w-[calc((100%-1rem)/3)] overflow-hidden bg-ink sm:w-[calc((100%-3rem)/5)]"
                aria-label={highlight.caption || "Ver post no Instagram"}
              >
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.05]">
                  <ProductImage
                    src={highlight.image_url}
                    alt={highlight.caption || settings.instagram_handle}
                    label={highlight.caption ?? "@"}
                    sizes="(max-width: 768px) 33vw, 20vw"
                    className="object-top"
                  />
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-5">
            {Array.from({ length: PLACEHOLDER_TILES }).map((_, i) => (
              <div key={i} className="photo-frame relative aspect-square overflow-hidden">
                <BrandFrame label="@" />
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 sm:hidden">
          <AnchorButton
            href={settings.instagram_url}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="sm"
            className="w-full justify-center"
          >
            Ver no Instagram
          </AnchorButton>
        </div>
      </Container>
    </section>
  );
}
