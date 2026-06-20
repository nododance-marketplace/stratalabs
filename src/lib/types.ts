// Shared domain types for the Strata Labs storefront.

// All current machines are SLM (metal). We filter the shop by use-case
// segment, which is more useful to buyers than the (single) process type.
export type Category = "Desktop" | "Dental" | "Industrial";

export interface SpecField {
  label: string;
  value: string;
}

export interface Product {
  /** URL-safe identifier used for /products/[slug]. Must be unique. */
  slug: string;
  name: string;
  category: Category;
  /** One-line spec summary shown on cards. */
  specLine: string;
  /**
   * Price in US cents (e.g. 5900000 = $59,000). Used for display AND as the
   * authoritative amount charged at Stripe Checkout (the server re-reads this
   * by slug, so the client can never tamper with the price).
   * Set to null/omit to show "Contact for pricing" and disable online payment.
   */
  priceCents: number | null;
  /** Short marketing description shown on the product detail page. */
  description: string;
  /** Bullet highlights shown on the product detail page (optional). */
  highlights?: string[];
  /** Full spec table rows shown on the product detail page. */
  specs: SpecField[];
  /**
   * Image paths, relative to /public. Drop real images here later
   * (e.g. "/products/slm-1.jpg"). Empty array renders a styled placeholder.
   */
  images: string[];
  /** Surface this product in the homepage "Featured" grid. */
  featured?: boolean;
}
