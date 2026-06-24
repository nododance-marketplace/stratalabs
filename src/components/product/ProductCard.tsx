import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/data/products";
import { ProductImage } from "@/components/ui/ProductImage";
import { CategoryBadge } from "./CategoryBadge";
import { ArrowRightIcon, FileTextIcon } from "@/components/ui/icons";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-base-900/60 transition-all duration-500 hover:border-white/20 hover:bg-base-800/80">
      {/* Spotlight sheen on hover — a spark of accent */}
      <div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-accent-sheen" />

      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-[4/3] w-full"
        aria-label={`View ${product.name}`}
      >
        <ProductImage
          src={product.images[0]}
          alt={product.name}
          category={product.category}
          className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="relative z-20 flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between">
          <CategoryBadge category={product.category} />
        </div>

        <h3 className="font-heading text-xl tracking-tight text-white">
          {product.name}
        </h3>

        <p className="text-sm leading-relaxed text-steel">
          {product.specLine}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4">
          {product.priceCents != null ? (
            <span className="flex items-baseline gap-2">
              <span className="text-sm text-titanium">
                {product.inquiryOnly
                  ? `From ${formatPrice(product.priceCents)}`
                  : formatPrice(product.priceCents)}
              </span>
              {product.compareAtCents != null && (
                <span className="text-xs text-steel/70 line-through">
                  {formatPrice(product.compareAtCents)}
                </span>
              )}
            </span>
          ) : (
            <span className="text-sm text-steel">Talk to sales</span>
          )}
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-accent-signal"
          >
            {product.priceCents != null && !product.inquiryOnly
              ? "View Details"
              : "Learn more"}
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {product.quotePdf && (
          <a
            href={product.quotePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 border-t border-white/[0.06] pt-3 text-xs font-medium text-accent transition-colors hover:text-accent-signal"
          >
            <FileTextIcon className="h-3.5 w-3.5" />
            View Quotation (PDF)
          </a>
        )}
      </div>
    </article>
  );
}
