// Shared domain types for the Strata Labs storefront.

// Buyable machines (all SLM metal) are filtered by use-case segment. The
// process types below are reserved for upcoming "coming soon" inventory.
export type Category =
  | "Desktop"
  | "Dental"
  | "Industrial"
  | "Design"
  | "AI"
  | "SLS"
  | "Resin"
  | "Large-Format FDM";

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
  /**
   * Optional competitor "compare-at" price in US cents, shown struck-through
   * next to ours to highlight the savings (e.g. 14_500_000 = $145,000).
   */
  compareAtCents?: number;
  /** Link to the competitor's listing, shown as "See for yourself". */
  compareUrl?: string;
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
  /**
   * Optional downloadable spec sheet / brochure (path under /public, e.g.
   * "/docs/sl-3dmpdesk.pdf"). Shows a "Download spec sheet" button when set.
   */
  datasheet?: string;
  /**
   * Optional downloadable quotation PDF (path under /public, e.g.
   * "/quotes/sl-3dmp140-quote.pdf"). Shows a "View Quotation (PDF)" button
   * on the product card and detail page when set.
   */
  quotePdf?: string;
  /** Surface this product in the homepage "Featured" grid. */
  featured?: boolean;
  /**
   * Show the price as an anchor ("From $X") but route the CTA to a sales
   * conversation (Talk to Sales → /contact) instead of online checkout.
   * For bespoke, scoped engagements that you want to close on a call.
   */
  inquiryOnly?: boolean;
  /**
   * Upcoming inventory placeholder. Shown in the shop's "Coming soon" section
   * with no price and a "Register interest" CTA (not purchasable, no detail
   * page). When the real machine arrives: fill in specs/description/images,
   * set priceCents (or leave null for "Talk to Sales"), and remove this flag.
   */
  comingSoon?: boolean;
}
