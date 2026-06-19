"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Category, Product } from "@/lib/types";
import { CATEGORIES } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { FadeIn } from "@/components/ui/FadeIn";

type Filter = "All" | Category;

const FILTERS: Filter[] = ["All", ...CATEGORIES];

export function ShopGrid({ products }: { products: Product[] }) {
  const params = useSearchParams();
  const initial = params.get("category");
  const initialFilter: Filter =
    initial && (CATEGORIES as string[]).includes(initial)
      ? (initial as Category)
      : "All";

  const [active, setActive] = useState<Filter>(initialFilter);

  const filtered = useMemo(
    () =>
      active === "All"
        ? products
        : products.filter((p) => p.category === active),
    [active, products],
  );

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2.5">
        {FILTERS.map((filter) => {
          const isActive = filter === active;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={isActive}
              className={`rounded-full border px-5 py-2 text-sm transition-all duration-300 active:scale-[0.97] ${
                isActive
                  ? "border-accent bg-accent text-base"
                  : "border-white/12 text-steel hover:border-accent/40 hover:text-accent-ember"
              }`}
            >
              {filter}
            </button>
          );
        })}
        <span className="ml-auto text-sm text-steel">
          {filtered.length} {filtered.length === 1 ? "printer" : "printers"}
        </span>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="mt-16 rounded-2xl border border-dashed border-white/10 px-8 py-20 text-center">
          <p className="text-titanium">No printers in this category yet.</p>
          <button
            type="button"
            onClick={() => setActive("All")}
            className="mt-3 text-sm text-steel underline-offset-4 hover:text-white hover:underline"
          >
            Show all printers
          </button>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, i) => (
            <FadeIn key={product.slug} delay={Math.min(i, 6) * 70}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
