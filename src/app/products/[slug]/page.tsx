import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, products, CATEGORY_META, formatPrice } from "@/data/products";
import { ProductGallery } from "@/components/product/ProductGallery";
import { CategoryBadge } from "@/components/product/CategoryBadge";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import {
  ArrowRightIcon,
  CheckIcon,
  DownloadIcon,
  CubeIcon,
} from "@/components/ui/icons";

interface PageProps {
  params: { slug: string };
}

// Pre-render every (available) product page at build time.
export function generateStaticParams() {
  return products.filter((p) => !p.comingSoon).map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: `${product.name} — ${product.specLine}. ${product.description}`,
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug);
  if (!product || product.comingSoon) notFound();

  const related = products
    .filter(
      (p) =>
        p.category === product.category &&
        p.slug !== product.slug &&
        !p.comingSoon,
    )
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-steel">
        <Link href="/shop" className="transition-colors hover:text-accent-ember">
          Shop
        </Link>
        <span className="text-steel/40">/</span>
        <span className="text-titanium">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Gallery */}
        <ProductGallery
          images={product.images}
          name={product.name}
          category={product.category}
        />

        {/* Details */}
        <div>
          <CategoryBadge category={product.category} />
          <h1 className="mt-4 font-heading text-4xl font-medium tracking-tight text-white sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-3 text-sm text-steel">{product.specLine}</p>

          <p className="mt-6 max-w-prose text-base leading-relaxed text-steel">
            {product.description}
          </p>

          {product.priceCents != null ? (
            <>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <span className="font-heading text-2xl text-white">
                  {formatPrice(product.priceCents)}
                </span>
                <AddToCartButton product={product} />
              </div>
              <p className="mt-3 text-xs text-steel">
                Secure checkout powered by Stripe. Need volume pricing,
                financing, or freight details?{" "}
                <Link
                  href="/contact"
                  className="text-accent hover:text-accent-signal"
                >
                  Contact our US-based team
                </Link>
                .
              </p>
            </>
          ) : (
            <>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <span className="text-sm uppercase tracking-[0.2em] text-steel">
                  Pricing on request
                </span>
                <Link href="/contact" className="btn-spark group px-7 py-3.5 text-sm">
                  Talk to Sales
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <p className="mt-3 text-xs text-steel">
                This machine is configured to order. Our US-based team will
                prepare a quote with freight and installation included.
              </p>
            </>
          )}

          {/* Cross-sell: Design Partner included free with any printer */}
          {product.category !== "Design" &&
            product.category !== "Consultation" && (
            <Link
              href="/products/design-partner"
              className="group mt-8 flex items-start gap-3 rounded-2xl border border-accent/30 bg-accent/[0.06] p-5 transition-colors hover:border-accent/60"
            >
              <CubeIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                <p className="font-heading text-sm text-white">
                  Includes a 3-month Design Partner —{" "}
                  <span className="text-accent">free</span>
                </p>
                <p className="mt-1 text-xs leading-relaxed text-steel">
                  Buy this printer and get a dedicated 3D designer for 3 months —
                  a $12,000 value — to turn your ideas into print-ready parts.{" "}
                  <span className="text-accent group-hover:text-accent-signal">
                    See what&apos;s included →
                  </span>
                </p>
              </div>
            </Link>
          )}

          {/* Downloadable spec sheet */}
          {product.datasheet && (
            <a
              href={product.datasheet}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-titanium transition-all hover:border-accent/50 hover:text-accent-ember"
            >
              <DownloadIcon className="h-4 w-4" />
              Download spec sheet (PDF)
            </a>
          )}

          {/* Key highlights */}
          {product.highlights && product.highlights.length > 0 && (
            <div className="mt-12">
              <h2 className="font-heading text-sm uppercase tracking-[0.2em] text-steel">
                Key highlights
              </h2>
              <ul className="mt-5 space-y-3">
                {product.highlights.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-titanium">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Spec table */}
          <div className="mt-12">
            <h2 className="font-heading text-sm uppercase tracking-[0.2em] text-steel">
              Specifications
            </h2>
            <dl className="mt-5 divide-y divide-white/[0.07] border-y border-white/[0.07]">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="grid grid-cols-2 gap-4 py-4 text-sm"
                >
                  <dt className="text-steel">{spec.label}</dt>
                  <dd className="text-right text-titanium">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8 rounded-2xl border border-white/[0.07] bg-base-900/60 p-5 text-sm text-steel">
            {CATEGORY_META[product.category].blurb}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-28">
          <div className="flex items-end justify-between">
            <h2 className="font-heading text-2xl tracking-tight text-white">
              More {product.category}
            </h2>
            <Link
              href={`/shop?category=${encodeURIComponent(product.category)}`}
              className="group inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-accent-signal"
            >
              View category
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group flex items-center justify-between rounded-xl border border-white/[0.07] bg-base-900/60 p-5 transition-colors hover:border-accent/30"
              >
                <div>
                  <p className="font-heading text-white">{p.name}</p>
                  <p className="mt-1 text-xs text-steel">{p.specLine}</p>
                </div>
                <ArrowRightIcon className="h-4 w-4 shrink-0 text-steel transition-transform group-hover:translate-x-1 group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
