"use client";

import { useState } from "react";
import type { Category } from "@/lib/types";
import { ProductImage } from "@/components/ui/ProductImage";

interface ProductGalleryProps {
  images: string[];
  name: string;
  category: Category;
}

/**
 * Large image gallery with thumbnail selection. When no real images exist
 * yet, it renders branded placeholders so the layout stays intact.
 */
export function ProductGallery({ images, name, category }: ProductGalleryProps) {
  // Always show at least 3 frames so the gallery reads as a gallery.
  const frames = images.length > 0 ? images : [undefined, undefined, undefined];
  const [active, setActive] = useState(0);

  return (
    <div>
      <ProductImage
        src={frames[active]}
        alt={`${name} view ${active + 1}`}
        category={category}
        priority
        className="aspect-[4/3] w-full rounded-2xl border border-white/[0.07]"
      />

      {frames.length > 1 && (
      <div className="mt-4 grid grid-cols-3 gap-3">
        {frames.map((frame, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            aria-current={i === active}
            className={`overflow-hidden rounded-xl border transition-all ${
              i === active
                ? "border-titanium"
                : "border-white/[0.07] opacity-60 hover:opacity-100"
            }`}
          >
            <ProductImage
              src={frame}
              alt={`${name} thumbnail ${i + 1}`}
              category={category}
              className="aspect-[4/3] w-full"
            />
          </button>
        ))}
      </div>
      )}
    </div>
  );
}
