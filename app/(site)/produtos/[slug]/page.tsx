import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProductImage } from "@/components/ui/ProductImage";
import { Badge } from "@/components/ui/Badge";
import { DiscountBadge, PriceTag } from "@/components/product/PriceTag";
import { WhatsAppBuyButton } from "@/components/product/WhatsAppBuyButton";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getProductBySlug, getProducts, getSettings } from "@/lib/data";
import { formatBRL } from "@/lib/utils";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Produto não encontrado" };

  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160),
      images: product.image_url ? [{ url: product.image_url }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [product, settings] = await Promise.all([getProductBySlug(slug), getSettings()]);

  if (!product) notFound();

  const related = (
    await getProducts(product.category?.slug ? { categorySlug: product.category.slug } : {})
  )
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="py-10 md:py-16">
      <Container>
        <nav className="mb-8 flex flex-wrap items-center gap-1.5 text-xs text-ink/40">
          <Link href="/" className="hover:text-ink">
            Início
          </Link>
          <span>/</span>
          <Link href="/produtos" className="hover:text-ink">
            Produtos
          </Link>
          {product.category && (
            <>
              <span>/</span>
              <Link href={`/categorias/${product.category.slug}`} className="hover:text-ink">
                {product.category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-ink/70">{product.name}</span>
        </nav>

        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="photo-frame relative aspect-[3/4] w-full overflow-hidden bg-ink">
            <ProductImage src={product.image_url} alt={product.name} label={product.name} priority />
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              {product.is_new && <Badge tone="new">Novidade</Badge>}
            </div>
            {product.sale_price && (
              <div className="absolute right-4 top-4">
                <DiscountBadge price={product.price} salePrice={product.sale_price} />
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            {product.category && (
              <Link
                href={`/categorias/${product.category.slug}`}
                className="text-xs uppercase tracking-[0.2em] text-gold-deep hover:underline"
              >
                {product.category.name}
              </Link>
            )}
            <h1 className="mt-3 font-display text-3xl text-ink md:text-4xl">{product.name}</h1>

            <div className="mt-5">
              <PriceTag price={product.price} salePrice={product.sale_price} size="lg" />
            </div>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/70 md:text-base">
              {product.description}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-ink/10 pt-6 text-sm">
              <div>
                <dt className="text-ink/40">Preço</dt>
                <dd className="mt-1 text-ink">{formatBRL(product.price)}</dd>
              </div>
              {product.sale_price && (
                <div>
                  <dt className="text-ink/40">Preço promocional</dt>
                  <dd className="mt-1 font-medium text-ink">{formatBRL(product.sale_price)}</dd>
                </div>
              )}
            </dl>

            <div className="mt-8">
              <WhatsAppBuyButton
                phone={settings.whatsapp_number}
                productName={product.name}
                size="lg"
                className="w-full justify-center sm:w-auto"
              />
              <p className="mt-3 text-xs text-ink/40">
                Você será direcionada ao WhatsApp da loja com uma mensagem já preenchida.
              </p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20 border-t border-ink/10 pt-16">
            <h2 className="font-display text-2xl text-ink">Você também pode gostar</h2>
            <div className="mt-8">
              <ProductGrid products={related} />
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
