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

export const CATEGORIES: Category[] = [
  "Desktop",
  "Dental",
  "Industrial",
  "Design",
  "AI",
];

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
  Design: {
    label: "Design",
    blurb:
      "A dedicated 3D designer on your team — turn ideas into print-ready parts.",
  },
  AI: {
    label: "AI",
    blurb:
      "AI integration, automations, agents & websites — built to move your business years ahead.",
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
    datasheet: "/docs/sl-3dmpdesk.pdf",
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

  // ─── DENTAL SCANNER ──────────────────────────────────────────────────────
  {
    slug: "sl-intraoral-scanner",
    name: "SL Intraoral Scanner",
    category: "Dental",
    specLine: "8µm accuracy · open system · STL/PLY/OBJ · autoclavable tips",
    priceCents: 500_000, // $5,000
    description:
      "A high-technology intraoral scanner that turns a chairside scan into a precise 3D model in seconds — the perfect front end for in-house dental printing. Capture accurate digital impressions at 8µm single-crown accuracy, skip the messy trays, and send print-ready STL/PLY/OBJ files straight to your SLM dental printer. It’s an open system (no license fees), with autoclavable tips, built-in anti-fog heating, and AI tools for model building, occlusion and undercut analysis, and smile simulation. Lightweight (≤240g) and fast, it pairs perfectly with our dental metal printers to take you from scan to finished crown — all under one roof.",
    highlights: [
      "8µm single-crown accuracy — print-ready STL / PLY / OBJ in seconds",
      "Open system: no license fees, works with your existing CAD/CAM workflow",
      "Built-in anti-fog heating; autoclavable tips (134°C), 100–150 cycles",
      "AI tools: model builder, occlusion & undercut analysis, smile simulator",
      "Lightweight ≤240g, USB 3.0; standard + pediatric scanning tips included",
      "Pairs perfectly with our SLM dental printers — scan to crown, in-house",
    ],
    specs: [
      { label: "Type", value: "Intraoral 3D dental scanner" },
      { label: "Accuracy (single crown)", value: "8 µm (±11 µm)" },
      { label: "Anti-Fog Technology", value: "Built-in automatic heating fan" },
      { label: "Output Format", value: "STL / PLY / OBJ" },
      { label: "Scan Speed", value: "<25 s (single arch)" },
      { label: "Scan Depth", value: "23 mm" },
      { label: "Cable Length", value: "2 m" },
      { label: "Data Transmission", value: "USB 3.0" },
      {
        label: "Scanning Tip Size",
        value: "Standard 95.3×22.5×16.6 mm; Pediatric 94×17.9×13.2 mm",
      },
      {
        label: "Scanning Tips",
        value: "3× standard + 1× pediatric; autoclavable 134°C, 100–150 cycles",
      },
      { label: "Weight", value: "≤240 g" },
      { label: "Scanner Size", value: "240 (L) × 45 (W) × 36 (H) mm" },
      { label: "Sensor", value: "High-speed CMOS" },
      {
        label: "System Requirements",
        value:
          "Intel i7-13700HX, NVIDIA RTX 4060 6G, 32GB RAM, 1TB SSD, Windows 11 64-bit, USB 3.2 Gen 1",
      },
    ],
    images: ["/products/sl-intraoral-scanner.png"],
    datasheet: "/docs/sl-intraoral-scanner.pdf",
  },

  // ─── SERVICE ─────────────────────────────────────────────────────────────
  {
    slug: "design-partner",
    name: "Design Partner — 3-Month Plan",
    category: "Design",
    specLine: "A dedicated 3D designer for 3 months · free with any printer",
    priceCents: 1_200_000, // $12,000 for the 3-month engagement
    description:
      "Your printer is only as good as the files you feed it. The Design Partner puts a dedicated senior 3D/CAD designer on your team for three months — turning rough sketches, reference photos, and “we should make this” ideas into production-ready, print-optimized parts. No new hire, no software to learn, no waiting on freelancers who’ve never touched a metal printer. From day one you get an expert who designs for your machine and your materials, so the printer you invested in actually earns its keep. And when you buy any Strata Labs printer, these three months are included free — a $12,000 head start on whatever you build next.",
    highlights: [
      "A dedicated senior CAD/3D designer for 3 full months — your designer, not a shared queue",
      "Unlimited parts and revisions, from napkin sketch to print-ready STEP / STL / 3MF",
      "Design-for-additive expertise: lightweighting, supports, tolerances, and material selection",
      "Fits your stack — SolidWorks, Fusion 360, Rhino, and more",
      "Kickoff within 48 hours; first print-ready files in days, not months",
      "Included FREE with any Strata Labs printer — a $12,000 value",
    ],
    specs: [
      { label: "Term", value: "3 months" },
      { label: "Designer", value: "Dedicated senior CAD / 3D specialist" },
      { label: "Revisions", value: "Unlimited" },
      { label: "Deliverables", value: "Print-ready STL / STEP / 3MF" },
      {
        label: "Disciplines",
        value: "Mechanical, product, dental, tooling, reverse-engineering",
      },
      { label: "Software", value: "SolidWorks, Fusion 360, Rhino" },
      { label: "Onboarding", value: "Within 48 hours" },
      { label: "Included free with", value: "Any Strata Labs printer" },
    ],
    images: ["/products/design-partner.svg"],
  },
  {
    slug: "ai-transformation",
    name: "AI Transformation",
    category: "AI",
    specLine: "AI integration, websites, automations & agents · from $9,000",
    priceCents: 900_000, // $9,000 starting point — scoped on a call
    inquiryOnly: true,
    description:
      "Most businesses can feel it: AI is quietly rewriting the rules, and the gap between the companies that use it and the ones that don’t is widening every month. Your competitors are answering leads in seconds, automating the busywork, and shipping in days what used to take you weeks — while your team is still doing it by hand. We close that gap. Strata Labs builds AI into the core of how your business runs: a website that actually converts, automations that erase repetitive work, and AI agents that quietly handle the tasks your people dread. We’ve done it for jewelers, engineers, clinics, and manufacturers — and we genuinely love this work, which is why we move fast and price it like nobody else can. The end state isn’t “some software.” It’s hours back every week, leads that never slip through the cracks, and a business that feels years ahead of its market. The first step is a single conversation where we show you exactly what this looks like for you. Reach out — and ask us what’s possible.",
    highlights: [
      "Custom, high-converting websites — built fast, priced unlike anything on the market",
      "Automations that erase repetitive work and hand your team hours back every week",
      "AI agents that handle the tasks people dread — quietly, accurately, around the clock",
      "A roadmap mapped to YOUR business: jewelers, engineers, clinics, manufacturers, services",
      "Built and run by a team that lives in this every day — not a side project",
      "Outcome-obsessed: more leads captured, less manual work, a real competitive edge",
    ],
    specs: [
      { label: "Engagement", value: "Custom AI transformation for your business" },
      { label: "Starts at", value: "$9,000 (scoped on a call)" },
      { label: "Discovery", value: "AI opportunity audit — where it moves the needle" },
      { label: "Build", value: "Websites · automations · AI agents · integrations" },
      {
        label: "Industries",
        value: "Jewelry, engineering, healthcare, manufacturing, professional services",
      },
      { label: "Team", value: "Senior AI builders & automation specialists" },
      { label: "First step", value: "A strategy call — we scope it to you" },
    ],
    images: ["/products/ai-transformation.svg"],
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
