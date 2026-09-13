import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnchorButton } from "@/components/ui/Button";
import { BrandFrame } from "@/components/ui/ProductImage";
import type { StoreSettings } from "@/lib/types";

const PLACEHOLDER_TILES = 5;

export function InstagramSection({ settings }: { settings: StoreSettings }) {
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
          {Array.from({ length: PLACEHOLDER_TILES }).map((_, i) => (
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
