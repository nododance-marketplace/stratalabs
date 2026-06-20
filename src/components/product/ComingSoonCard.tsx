import Link from "next/link";
import type { Product } from "@/lib/types";
import { ProductImage } from "@/components/ui/ProductImage";
import { CategoryBadge } from "./CategoryBadge";
import { ArrowRightIcon } from "@/components/ui/icons";

/** Placeholder card for upcoming inventory — not purchasable. */
export function ComingSoonCard({ product }: { product: Product }) {
  return (
    <article className="relative flex flex-col overflow-hidden rounded-2xl border border-dashed border-white/[0.12] bg-base-900/40">
      <div className="relative aspect-[4/3] w-full">
        <ProductImage
          src={undefined}
          alt={product.name}
          category={product.category}
          className="h-full w-full opacity-70"
        />
        <span className="absolute left-4 top-4 rounded-full border border-accent/40 bg-base/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-accent backdrop-blur">
          Coming soon
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <CategoryBadge category={product.category} />
        <h3 className="font-heading text-xl tracking-tight text-white">
          {product.name}
        </h3>
        <p className="text-sm leading-relaxed text-steel">{product.specLine}</p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-sm text-steel">Pricing soon</span>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-accent-signal"
          >
            Register interest
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
