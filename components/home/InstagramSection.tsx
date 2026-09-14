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

        <div className="mt-12 grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-5">
          {highlights.length > 0
            ? highlights.map((highlight) => (
                <a
                  key={highlight.id}
                  href={highlight.link || settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-square overflow-hidden"
                  aria-label={highlight.caption || "Ver post no Instagram"}
                >
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.05]">
                    <ProductImage
                      src={highlight.image_url}
                      alt={highlight.caption || settings.instagram_handle}
                      label={highlight.caption ?? "@"}
                      sizes="(max-width: 768px) 33vw, 20vw"
                    />
                  </div>
                </a>
              ))
            : Array.from({ length: PLACEHOLDER_TILES }).map((_, i) => (
                <div key={i} className="relative aspect-square overflow-hidden">
                  <BrandFrame label="@" />
                </div>
              ))}
        </div>

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
