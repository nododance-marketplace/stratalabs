"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import type { AccessoryConfig } from "@/data/accessories";
import { formatPrice } from "@/data/products";
import { useCart } from "@/components/cart/CartContext";
import {
  CheckIcon,
  PlusIcon,
  ArrowRightIcon,
} from "@/components/ui/icons";

interface Props {
  product: Product;
  config: AccessoryConfig;
  /** true = sells online (Add to Cart); false = inquiry-only (Talk to Sales). */
  buyable: boolean;
}

/**
 * "Configure your system" — lists what's included, lets the customer toggle
 * priced accessories, and shows a live running total (base printer + selected
 * accessories). Buyable machines add the configuration to the cart; inquiry
 * machines show the estimate and route to Talk to Sales.
 */
export function AccessoryConfigurator({ product, config, buyable }: Props) {
  const { add } = useCart();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [added, setAdded] = useState(false);

  const base = product.priceCents ?? 0;

  const total = useMemo(() => {
    const addOns = config.accessories
      .filter((a) => selected.has(a.id))
      .reduce((s, a) => s + a.priceCents, 0);
    return base + addOns;
  }, [selected, base, config.accessories]);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleAdd() {
    const chosen = config.accessories
      .filter((a) => selected.has(a.id))
      .map((a) => ({ id: a.id, name: a.name, priceCents: a.priceCents }));
    add(product, chosen);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="mt-8">
      {/* Base price */}
      <div className="flex items-baseline gap-2">
        <span className="font-heading text-2xl text-white">
          {buyable ? formatPrice(base) : `From ${formatPrice(base)}`}
        </span>
        <span className="text-xs text-steel">printer only</span>
      </div>

      {/* Included with the printer */}
      {config.includedWithPrinter.length > 0 && (
        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.2em] text-steel">
            Included with your printer
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {config.includedWithPrinter.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-steel">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Accessory configurator */}
      <div className="mt-6 rounded-2xl border border-white/[0.08] bg-base-900/50 p-5">
        <p className="font-heading text-sm text-white">Configure your system</p>
        <p className="mt-1 text-xs text-steel">
          {config.mode === "bundle"
            ? "Add the complete accessory & equipment package."
            : "Add only the equipment you need — the total updates as you go."}
        </p>

        <div className="mt-4 space-y-2.5">
          {config.accessories.map((a) => {
            const isOn = selected.has(a.id);
            return (
              <label
                key={a.id}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                  isOn
                    ? "border-accent/50 bg-accent/[0.06]"
                    : "border-white/[0.07] bg-base-800/40 hover:border-white/20"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isOn}
                  onChange={() => toggle(a.id)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#FF6A00]"
                />
                <span className="flex-1">
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-sm text-titanium">{a.name}</span>
                    <span className="whitespace-nowrap text-sm text-white">
                      +{formatPrice(a.priceCents)}
                    </span>
                  </span>
                  {config.mode === "bundle" && config.bundleItems && (
                    <span className="mt-1.5 block text-xs leading-relaxed text-steel">
                      Includes: {config.bundleItems.join(" · ")}
                    </span>
                  )}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Running total + action */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-base-900/60 p-5">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-steel">
            {buyable ? "Your total" : "Configured estimate"}
          </p>
          <p className="font-heading text-2xl text-white">
            {buyable ? formatPrice(total) : `From ${formatPrice(total)}`}
          </p>
        </div>

        {buyable ? (
          <button
            type="button"
            onClick={handleAdd}
            aria-live="polite"
            className="btn-spark group px-7 py-3.5 text-sm"
          >
            {added ? (
              <>
                <CheckIcon className="h-4 w-4" />
                Added to cart
              </>
            ) : (
              <>
                <PlusIcon className="h-4 w-4 transition-transform group-hover:rotate-90" />
                Add to Cart
              </>
            )}
          </button>
        ) : (
          <Link href="/contact" className="btn-spark group px-7 py-3.5 text-sm">
            Talk to Sales
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>

      <p className="mt-3 text-xs text-steel">
        {buyable
          ? "Secure checkout powered by Stripe. Taxes, freight & installation quoted separately."
          : "Build your configuration, then talk to our US-based team — we’ll prepare a formal quote with freight and installation."}
      </p>
    </div>
  );
}
