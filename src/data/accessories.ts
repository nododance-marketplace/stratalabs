/**
 * ─────────────────────────────────────────────────────────────────────────
 *  ACCESSORY CONFIGURATOR DATA
 * ─────────────────────────────────────────────────────────────────────────
 *  Per-printer accessories shown in the "Configure your system" section on
 *  the product page. Prices are RETAIL (supplier cost × 1.5), in US cents.
 *
 *  The checkout route re-reads these prices server-side by (slug, id), so the
 *  amount charged can never be tampered with from the browser.
 *
 *  Modes:
 *   - "bundle"     → one all-or-nothing "Accessory Package" checkbox
 *   - "a_la_carte" → each item is its own checkbox
 *   - "tbd"        → no accessory data yet; configurator is hidden
 *  ─────────────────────────────────────────────────────────────────────────
 */

export type AccessoryMode = "bundle" | "a_la_carte" | "tbd";

export interface Accessory {
  /** Stable id used for server-side price lookup. Unique within a product. */
  id: string;
  name: string;
  priceCents: number;
}

export interface AccessoryConfig {
  mode: AccessoryMode;
  /** Items that ship free with the printer (informational). */
  includedWithPrinter: string[];
  /** For "bundle" mode: what the package contains. */
  bundleItems?: string[];
  /** Priced add-ons. For "bundle" this is a single package entry. */
  accessories: Accessory[];
}

export const ACCESSORIES: Record<string, AccessoryConfig> = {
  "sl-3dmpdesk": {
    mode: "bundle",
    includedWithPrinter: [
      "Silicon rubber blade ×20",
      "CoCr baseplate ×6",
      "Cleaning & hardware tools kit",
      "Water chiller",
    ],
    bundleItems: [
      "N2 generator with oil-less pump",
      "Vacuum cleaner (water)",
      "Sieving device with 1 sieve",
      "Powder drying oven",
      "Heat-treatment furnace (non-vacuum)",
      "Voltage stabilizer 220V 5KW",
      "Electric shovel tools",
    ],
    accessories: [
      {
        id: "package",
        name: "Accessory & Equipment Package (complete set)",
        priceCents: 450_000,
      },
    ],
  },
  "sl-3dmp140": {
    mode: "bundle",
    includedWithPrinter: [
      "Silicon rubber blade ×20",
      "CoCr baseplate ×6",
      "Cleaning & hardware tools kit",
      "Water chiller",
    ],
    bundleItems: [
      "N2 generator with oil-less pump",
      "Vacuum cleaner (water)",
      "Sieving device with 1 sieve",
      "Powder drying oven",
      "Heat-treatment furnace (non-vacuum)",
      "Voltage stabilizer 220V 5KW",
      "Sawing machine with tooling fixture",
    ],
    accessories: [
      {
        id: "package",
        name: "Accessory & Equipment Package (complete set)",
        priceCents: 1_050_000,
      },
    ],
  },
  "sl-3dmp220": {
    mode: "bundle",
    includedWithPrinter: [
      "Silicon rubber blade ×20",
      "CoCr baseplate ×6",
      "Cleaning & hardware tools kit",
      "Water chiller",
    ],
    bundleItems: [
      "N2 generator with oil-less pump",
      "Vacuum cleaner (water)",
      "Sieving device with 1 sieve",
      "Powder drying oven",
      "Heat-treatment furnace (non-vacuum)",
      "Voltage stabilizer 220V 10KW",
      "Sawing machine with tooling fixture",
    ],
    accessories: [
      {
        id: "package",
        name: "Accessory & Equipment Package (complete set)",
        priceCents: 1_350_000,
      },
    ],
  },
  "sl-3dmp300": {
    mode: "a_la_carte",
    includedWithPrinter: [
      "Silicon rubber blade ×50",
      "Stainless-steel baseplate ×3",
      "Cleaning & hardware tools kit",
      "Water chiller MCWI-25C",
    ],
    accessories: [
      { id: "wire-cutting-edm-dk7735", name: "Wire-cutting machine (EDM DK7735)", priceCents: 1_350_000 },
      { id: "grinding-my3060", name: "Grinding machine MY3060", priceCents: 1_200_000 },
      { id: "sieving-ffm-400-1s", name: "Sieving machine FFM-400-1S", priceCents: 825_000 },
      { id: "vacuum-explosion-proof", name: "Vacuum cleaner (explosion-proof)", priceCents: 675_000 },
      { id: "nitrogen-generator-a3", name: "Nitrogen generator A3", priceCents: 450_000 },
      { id: "muffle-furnace", name: "Muffle heat-treatment furnace", priceCents: 300_000 },
      { id: "screw-air-compressor-bk75", name: "Screw air compressor BK-7.5", priceCents: 225_000 },
      { id: "voltage-stabilizer-30kw", name: "Voltage stabilizer 30KW", priceCents: 180_000 },
      { id: "sandblasting-9060", name: "Sandblasting machine 9060", priceCents: 150_000 },
      { id: "drying-oven-101-1ab", name: "Drying oven 101-1AB", priceCents: 90_000 },
    ],
  },
  "sl-3dmp420": {
    mode: "a_la_carte",
    includedWithPrinter: [
      "Cleaning kit",
      "Silicon scraper ×100",
      "Sealing rubber",
      "Water chiller",
      "Hardware tools kit",
      "Stainless-steel baseplate ×3",
      "Technical service (remote install + field service)",
    ],
    accessories: [
      { id: "wire-cutting-dk7745", name: "Wire-cutting machine DK7745", priceCents: 1_500_000 },
      { id: "sieving-inert-gas", name: "Auto-feeding sieving machine (inert gas)", priceCents: 825_000 },
      { id: "vacuum-explosion-proof", name: "Vacuum cleaner (explosion-proof)", priceCents: 675_000 },
      { id: "n2-generator", name: "N2 generator", priceCents: 450_000 },
      { id: "muffle-furnace", name: "Muffle heat-treatment furnace", priceCents: 300_000 },
      { id: "voltage-stabilizer-40kw", name: "Voltage stabilizer 40KW", priceCents: 225_000 },
      { id: "powder-drying-oven", name: "Powder drying oven", priceCents: 120_000 },
    ],
  },
  "sl-3dmp800": {
    // Awaiting an itemized accessory quote from the supplier.
    mode: "tbd",
    includedWithPrinter: [],
    accessories: [],
  },
};

export function getAccessoryConfig(slug: string): AccessoryConfig | undefined {
  return ACCESSORIES[slug];
}

/** Server-side lookup of one accessory's authoritative price. */
export function findAccessory(slug: string, id: string): Accessory | undefined {
  return ACCESSORIES[slug]?.accessories.find((a) => a.id === id);
}
