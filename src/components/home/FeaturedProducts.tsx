import Link from "next/link";
import { getFeaturedProducts } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { ArrowRightIcon } from "@/components/ui/icons";

export function FeaturedProducts() {
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-accent">
              Featured
            </p>
            <h2 className="mt-4 font-heading text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Machines on the floor
            </h2>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-accent-signal"
          >
            View all printers
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </FadeIn>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((product, i) => (
          <FadeIn key={product.slug} delay={i * 80}>
            <ProductCard product={product} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
