import { Suspense } from "react";
import type { Metadata } from "next";
import { products } from "@/data/products";
import { ShopGrid } from "@/components/product/ShopGrid";

export const metadata: Metadata = {
  title: "Shop Printers",
  description:
    "Browse Strata Labs' catalog of industrial SLM, SLS, and large-format FDM 3D printers. Filter by category.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.24em] text-accent">Catalog</p>
        <h1 className="mt-4 font-heading text-4xl font-medium tracking-tight text-white sm:text-5xl">
          Industrial 3D printers
        </h1>
        <p className="mt-5 text-base leading-relaxed text-steel">
          Production-grade metal, nylon, and large-format polymer systems — the
          hard-to-source machines that open new doors. Pricing is provided per
          quote; add any machine to your inquiry list and US-based support will
          follow up.
        </p>
      </header>

      <div className="mt-14">
        <Suspense fallback={<GridSkeleton />}>
          <ShopGrid products={products} />
        </Suspense>
      </div>
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
