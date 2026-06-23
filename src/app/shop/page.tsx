import { Suspense } from "react";
import type { Metadata } from "next";
import {
  getAvailableProducts,
  getComingSoonProducts,
} from "@/data/products";
import { ShopGrid } from "@/components/product/ShopGrid";
import { ComingSoonCard } from "@/components/product/ComingSoonCard";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "Shop Printers",
  description:
    "Browse Strata Labs' catalog of industrial SLM metal 3D printers — buy online or request a quote. SLS, resin, and large-format FDM coming soon.",
};

export default function ShopPage() {
  const available = getAvailableProducts();
  const comingSoon = getComingSoonProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header video banner — real example footage, autoplay + loop + muted.
          SSR'd with the muted attribute so browsers allow autoplay. */}
      <section className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-base-900">
        <video
          className="block aspect-video w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/video/shop-real-example.mp4" type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-base/90 to-transparent" />
        <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-base/50 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-titanium backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_#FF6A00]" />
          See it in action
        </span>
      </section>

      <header className="mt-12 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.24em] text-accent">Catalog</p>
        <h1 className="mt-4 font-heading text-4xl font-medium tracking-tight text-white sm:text-5xl">
          Industrial 3D printers
        </h1>
        <p className="mt-5 text-base leading-relaxed text-steel">
          Production-grade SLM metal systems — the hard-to-source machines that
          open new doors. Buy online or request a quote, with US-based support
          from inquiry to install.
        </p>
      </header>

      <div className="mt-14">
        <Suspense fallback={<GridSkeleton />}>
          <ShopGrid products={available} />
        </Suspense>
      </div>

      {comingSoon.length > 0 && (
        <section className="mt-24">
          <FadeIn>
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.24em] text-accent">
                Coming soon
              </p>
              <h2 className="mt-4 font-heading text-3xl font-medium tracking-tight text-white sm:text-4xl">
                More inventory on the way
              </h2>
              <p className="mt-4 text-base leading-relaxed text-steel">
                We&apos;re sourcing SLS, resin, and large-format FDM systems from
                vetted manufacturers. Register your interest and we&apos;ll reach
                out the moment they land.
              </p>
            </div>
          </FadeIn>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {comingSoon.map((product, i) => (
              <FadeIn key={product.slug} delay={Math.min(i, 6) * 70}>
                <ComingSoonCard product={product} />
              </FadeIn>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-white/[0.07]"
        >
          <div className="skeleton aspect-[4/3] w-full" />
          <div className="space-y-3 p-6">
            <div className="skeleton h-4 w-20 rounded-full" />
            <div className="skeleton h-5 w-2/3 rounded" />
            <div className="skeleton h-4 w-full rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
