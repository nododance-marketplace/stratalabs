import type { Category, Product } from "@/lib/types";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  STRATA LABS — PRODUCT CATALOG
 * ─────────────────────────────────────────────────────────────────────────
 *  Single source of truth for every printer on the site. No database — edit
 *  this file to update the storefront.
 *
 *  Current lineup: 5 SLM (metal) printers, filtered in the shop by use-case
 *  segment (Desktop / Dental / Industrial).
 *
 *  TO EDIT A PRODUCT:   change name / price / specLine / description / specs.
 *                       keep `slug` unique + URL-safe (it becomes the URL).
 *  TO ADD AN IMAGE:     drop a file in /public/products/ and add its path to
 *                       `images` (e.g. "/products/sl-3dmp220.png").
 *  TO FEATURE ON HOME:  set `featured: true` (homepage shows up to 4).
 *  ─────────────────────────────────────────────────────────────────────────
 */

export const CATEGORIES: Category[] = ["Desktop", "Dental", "Industrial"];

/** Human-readable copy for each category badge / filter. */
export const CATEGORY_META: Record<
  Category,
  { label: string; blurb: string }
> = {
  Desktop: {
    label: "Desktop",
    blurb:
      "Compact, all-in-one SLM systems — in-house metal printing without the floor space.",
  },
  Dental: {
    label: "Dental",
    blurb:
      "Precision SLM metal printers tuned for crowns, frameworks, and dental labs.",
  },
  Industrial: {
    label: "Industrial",
    blurb:
      "Large- and super-large-format SLM for molds, tooling, and serious mass production.",
  },
  SLS: {
    label: "SLS",
    blurb:
      "Selective Laser Sintering — strong, support-free nylon and composite parts.",
  },
  Resin: {
    label: "Resin",
    blurb: "SLA / DLP resin — ultra-fine detail and smooth surface finish.",
  },
  "Large-Format FDM": {
    label: "Large-Format FDM",
    blurb: "Industrial FDM at large build volumes for tooling and prototypes.",
  },
};

export const products: Product[] = [
  {
    slug: "sl-3dmpdesk",
    name: "SL 3DMPDESK",
    category: "Desktop",
    specLine: "Ø100 × 70 mm build · 300 W fiber laser · CoCr & titanium",
    priceCents: 3_300_000, // $33,000 — live for online checkout.
    description:
      "An all-in-one true desktop SLM metal printer built for dental labs and small-batch metal work. Compact 0.39 m² footprint, AI one-click printing, and a maintenance-free permanent filter make it the easiest entry point into in-house metal additive manufacturing.",
    highlights: [
      "All-in-one integrated desktop design — 600×650×800 mm, only 0.39 m² floor space",
      "Permanent filter: 30,000-hour service life, maintenance-free, tool-free, zero install errors",
      "One-click AI printing — scan to design in ~5 minutes",
      "Multi-material modular cartridge: CoCr, Ti and more, switchable",
      "Hassle-free install with 4-color coded, mistake-proof conduits",
      "Exclusive LFPT (Laser Follow Powder Technology) boosts efficiency ~20%",
    ],
    specs: [
      { label: "Process", value: "SLM (Selective Laser Melting)" },
      { label: "Printer Model", value: "SL 3DMPDESK" },
      { label: "Dimensions", value: "615×655×850 mm (W×D×H)" },
      { label: "Weight", value: "140 kg" },
      { label: "Building Size", value: "Ø100×70 mm (baseplate included)" },
      { label: "Spot Size", value: "20–80 µm" },
      { label: "Laser Power", value: "Single laser, 300 W" },
      { label: "Laser Type", value: "CW Fiber Laser" },
      { label: "Min. Oxygen", value: "≤100 ppm" },
      { label: "Scan Speed", value: "0–7 m/s" },
      { label: "Layer Thickness", value: "20–80 µm" },
      {
        label: "Recoating",
        value: "Upper feeding & one-way recoating, flexible soft blade",
      },
      { label: "Printing Accuracy", value: "±0.05 mm (L≤100 mm)" },
      { label: "Powder Capacity", value: "1.5 L" },
      { label: "Power Failure", value: "Auto Resume" },
      { label: "Baseplate Fixing", value: "Magnetic" },
      { label: "Filtration", value: "Permanent filter ≥30,000 hours" },
      {
        label: "Printable Materials",
        value: "CoCr, Titanium Alloy, Pure Titanium",
      },
      { label: "Software", value: "Strata slicing & control suite" },
      { label: "Cooling", value: "Water-cooled" },
      { label: "Power Input", value: "220 V AC single phase, ~1 kW avg" },
      { label: "Protective Gas", value: "Nitrogen / Argon ≤1 L/h" },
    ],
    images: ["/products/sl-3dmpdesk.png"],
    featured: true,
  },
  {
    slug: "sl-3dmp140",
    name: "SL 3DMP140",
    category: "Dental",
    specLine: "Ø140 × 170 mm build · 500 W laser · ~150 teeth per run",
    priceCents: null, // Awaiting vendor price + markup. Set cents to enable checkout (e.g. 9_500_000 = $95,000).
    description:
      "A specialized single-laser SLM dental metal printer with a Ø140 mm build and one-click dental typesetting. Built for precise, customized dental components with high throughput.",
    highlights: [
      "Stable optical system with one-click dental typesetting",
      "Fast building — ~150 teeth per shot",
      "No-filter-cartridge waste, high powder utilization",
      "Complete typesetting and data processing in ~5 minutes",
      "Camera-equipped for safe remote monitoring",
      "Control software supports up to 36-galvanometer multi-laser splicing",
    ],
    specs: [
      { label: "Process", value: "SLM (Selective Laser Melting)" },
      { label: "Product Model", value: "SL 3DMP140" },
      { label: "Print Volume", value: "Ø140 mm × H170 mm" },
      { label: "Dimension", value: "970×815×1750 mm (L×W×H)" },
      { label: "Spot Size", value: "50–100 µm (adjustable)" },
      { label: "Powder Layer Thickness", value: "20–120 µm (adjustable)" },
      { label: "Scraper Type", value: "Flexible scraper" },
      { label: "Number of Lasers", value: "Single laser" },
      { label: "Laser Power", value: "500 W" },
      { label: "Power Supply", value: "Single phase 220 V, ~1.5 kW" },
      { label: "Protective Gas", value: "Nitrogen, Argon" },
      { label: "Min. Oxygen", value: "≤100 ppm" },
      { label: "Cooling", value: "Water cooling" },
      { label: "Baseplate Fixing", value: "Magnetic / Screw" },
      { label: "Powder Spreading", value: "Top feeding, one-way recoating" },
      { label: "Scan Speed", value: "0–10 m/s" },
      {
        label: "Accuracy",
        value: "±0.1 mm (L≤100 mm); ±0.1%×L (L>100 mm)",
      },
      { label: "Max Powder / Charge", value: "3 L" },
      { label: "Power-Failure Resume", value: "Yes" },
      { label: "Auto Shutdown", value: "Yes" },
      { label: "Printable Materials", value: "CoCr, TC4, Pure Ti" },
      { label: "Filter", value: "Permanent ≥30,000 hours" },
      { label: "Warranty", value: "1 year" },
      { label: "Connection", value: "WiFi" },
      { label: "Production Capacity", value: "2000 pcs/year" },
    ],
    images: ["/products/sl-3dmp140.png"],
  },
  {
    slug: "sl-3dmp220",
    name: "SL 3DMP220",
    category: "Dental",
    specLine: "220 × 140 × 100 mm · dual 500 W lasers · 300 crowns/run",
    priceCents: null, // Awaiting vendor price + markup. Set cents to enable checkout (e.g. 14_500_000 = $145,000).
    description:
      "A dual-laser SLM metal printer with a large build volume — print up to 300 crowns or 30 frameworks in a single run. Permanent filter, LFPT efficiency tech, and free-forever in-house software.",
    highlights: [
      "Dual-laser, large build — 220×140×100 mm (up to H200 mm); 300 crowns or 30 frameworks per run",
      "Permanent filter: 30,000-hour lifetime, zero replacement cost",
      "LFPT cuts single-layer powder time by 9 s (~20% efficiency gain)",
      "One-click layout (5 min) and one-click printing; software free forever",
      "Cost-price core components and 24-hour technical support",
    ],
    specs: [
      { label: "Process", value: "SLM (Selective Laser Melting), dual-laser" },
      { label: "Product Model", value: "SL 3DMP220" },
      {
        label: "Printing Size",
        value: "220×140×100 mm (up to 220×140×200 mm)",
      },
      { label: "Beam Size", value: "60–100 µm (adjustable)" },
      { label: "Powder Layer Thickness", value: "20–150 µm (adjustable)" },
      { label: "Recoat Type", value: "Silicon rubber" },
      { label: "Number of Lasers", value: "Dual lasers" },
      { label: "Laser Power", value: "2 × 500 W" },
      { label: "Power Supply", value: "AC 220 V ±10% / 50 Hz, 2 kW" },
      { label: "Protective Gas", value: "Nitrogen / Argon ≤1 L/h" },
      { label: "Min. Oxygen", value: "≤100 ppm" },
      { label: "Cooling", value: "Water cooling" },
      { label: "Baseplate Fixing", value: "Magnetic / Screw" },
      { label: "Powder Spreading", value: "Top-down powder feeding" },
      { label: "Scan Speed", value: "0–10 m/s" },
      {
        label: "Accuracy",
        value: "±0.1 mm (L≤100 mm); ±0.1%×L (L>100 mm)",
      },
      { label: "Typesetting", value: "Fully automatic layout & path planning" },
      { label: "Filter", value: "Permanent ≥30,000 hours" },
      {
        label: "Printable Materials",
        value: "CoCr, Titanium alloy, Pure Titanium",
      },
      { label: "Printer Dimension", value: "1200×750×1820 mm (L×W×H)" },
      { label: "Max Powder Addition", value: "7 L" },
      { label: "Net Weight", value: "550 kg" },
      { label: "Software", value: "Strata slicing & control suite" },
    ],
    images: ["/products/sl-3dmp220.png"],
    featured: true,
  },
  {
    slug: "sl-3dmp300",
    name: "SL 3DMP300",
    category: "Industrial",
    specLine: "Large-format SLM · steel, nickel, titanium & aluminum alloys",
    priceCents: null, // Awaiting vendor price + markup. Set cents to enable checkout (e.g. 21_900_000 = $219,000).
    description:
      "A large-format SLM metal printer for industrial molds, tooling and high-volume dental work. Bidirectional powder spreading and one-click typesetting for fast, stable mass production.",
    highlights: [
      "Stable optical system with one-click typesetting",
      "Fast building — ~300 teeth / 5 hours, 30 supports / 6 hours",
      "Bidirectional powder spreading, high powder utilization",
      "Complete typesetting and data processing in ~5 minutes",
      "Camera remote monitoring; strong stability and easy install",
      "CE certified; used in aerospace, automotive, medical and education",
    ],
    specs: [
      { label: "Model No.", value: "SL 3DMP300" },
      { label: "Dimensions", value: "1960×930×2222 mm (L×W×H)" },
      { label: "Forming Technology", value: "SLM (Selective Laser Melting)" },
      {
        label: "Material Class",
        value:
          "Metal powder — stainless steel, tool steel, nickel alloy, aluminum alloy, titanium alloy",
      },
      { label: "Operating System", value: "Windows 10" },
      { label: "File Formats", value: "STEP, IGES, SLC, CLI, STL" },
      { label: "Nozzle Number", value: "1" },
      { label: "Connection", value: "WiFi" },
      { label: "Warranty", value: "One Year" },
      { label: "Production Capacity", value: "2000 pcs/year" },
    ],
    images: ["/products/sl-3dmp300.png"],
    featured: true,
  },
  {
    slug: "sl-3dmp420",
    name: "SL 3DMP420",
    category: "Industrial",
    specLine: "Super-large multi-laser SLM · powder circulation system",
    priceCents: null, // Awaiting vendor price + markup. Set cents to enable checkout (e.g. 31_900_000 = $319,000).
    description:
      "The flagship super-large-format multi-laser SLM metal printer, built for serious mass production with a powder circulation system for high-volume runs.",
    highlights: [
      "Super-large multi-laser build for mass production",
      "Powder circulation system to facilitate high-volume runs",
      "No filter-cartridge waste, reduced powder usage",
      "Typesetting and data processing within ~5 minutes",
      "Bidirectional powder spreading for speed",
      "Camera remote monitoring for safe, hands-off operation",
      "CE certified",
    ],
    specs: [
      { label: "Model No.", value: "SL 3DMP420" },
      { label: "Dimensions", value: "2753×1150×2340 mm (L×W×H)" },
      {
        label: "Forming Technology",
        value: "SLM (Selective Laser Melting), multi-laser",
      },
      {
        label: "Material Class",
        value:
          "Metal powder — stainless steel, tool steel, nickel alloy, aluminum alloy, titanium alloy",
      },
      { label: "Operating System", value: "Windows 10" },
      { label: "File Formats", value: "STEP, IGES, SLC, CLI, STL" },
      { label: "Nozzle Number", value: "1" },
      { label: "Connection", value: "WiFi" },
      { label: "Warranty", value: "One Year" },
      { label: "Production Capacity", value: "2000 pcs/year" },
    ],
    images: ["/products/sl-3dmp420.png"],
    featured: true,
  },

  // ─── COMING SOON ─────────────────────────────────────────────────────────
  // Placeholders for inventory being sourced. They show in the shop's
  // "Coming soon" section (no price, no checkout, no detail page). When a real
  // machine lands: fill in specLine/description/specs/images, set priceCents
  // (or leave null for "Talk to Sales"), add the category to CATEGORIES if you
  // want it filterable, and delete `comingSoon: true`.
  {
    slug: "sls-coming-soon",
    name: "SLS Nylon Printer",
    category: "SLS",
    specLine: "Selective Laser Sintering · nylon & composite parts",
    priceCents: null,
    description: "Specs and pricing coming soon.",
    specs: [],
    images: [],
    comingSoon: true,
  },
  {
    slug: "resin-coming-soon",
    name: "Resin Printer",
    category: "Resin",
    specLine: "SLA / DLP resin · ultra-fine detail & smooth finish",
    priceCents: null,
    description: "Specs and pricing coming soon.",
    specs: [],
    images: [],
    comingSoon: true,
  },
  {
    slug: "large-format-fdm-coming-soon",
    name: "Large-Format FDM Printer",
    category: "Large-Format FDM",
    specLine: "Industrial FDM · large build volumes",
    priceCents: null,
    description: "Specs and pricing coming soon.",
    specs: [],
    images: [],
    comingSoon: true,
  },
];

/** Format a price in cents as USD, e.g. 5900000 → "$59,000". */
export function formatPrice(priceCents: number | null): string {
  if (priceCents == null) return "Contact for pricing";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(priceCents / 100);
}

/** Look up a single product by its slug. Returns undefined if not found. */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Buyable / available products (excludes coming-soon placeholders). */
export function getAvailableProducts(): Product[] {
  return products.filter((p) => !p.comingSoon);
}

/** Upcoming inventory placeholders. */
export function getComingSoonProducts(): Product[] {
  return products.filter((p) => p.comingSoon);
}

/** Products flagged for the homepage featured grid (never coming-soon). */
export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured && !p.comingSoon);
}
