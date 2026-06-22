import Image from "next/image";
import type { Category } from "@/lib/types";

interface ProductImageProps {
  src?: string;
  alt: string;
  category: Category;
  /** Larger motif + sizing for the detail page gallery. */
  priority?: boolean;
  className?: string;
}

/**
 * Renders the real product photo when one is supplied in products.ts.
 * Until then it shows a branded, on-theme placeholder so the layout never
 * looks broken. Drop images into /public/products/ and reference them in
 * the product's `images` array to replace this automatically.
 */
export function ProductImage({
  src,
  alt,
  category,
  priority,
  className = "",
}: ProductImageProps) {
  if (src) {
    // Studio product shots sit on a white tile so the full machine reads
    // cleanly against the dark UI (no cropping of tall units).
    return (
      <div className={`relative overflow-hidden bg-white ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 33vw"
          // SVGs (e.g. the CAD illustration) bypass the image optimizer.
          unoptimized={src.endsWith(".svg")}
          className="object-contain p-4"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-base-800 ${className}`}
      role="img"
      aria-label={`${alt} — image coming soon`}
    >
      {/* Faint blueprint grid */}
      <div className="absolute inset-0 bg-grid-faint [background-size:28px_28px]" />
      {/* Diagonal steel sheen */}
      <div className="absolute inset-0 bg-steel-sheen" />
      {/* Layered cube motif — echoes additive manufacturing */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width="40%"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="text-steel/40"
          strokeWidth={0.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2.5 21 7v10l-9 4.5L3 17V7l9-4.5Z" />
          <path d="M3 7l9 4.5L21 7M12 11.5V21" opacity={0.6} />
        </svg>
      </div>
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-steel/70">
        <span>{category}</span>
        <span>Image coming soon</span>
      </div>
    </div>
  );
}
