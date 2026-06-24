"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "./CartContext";
import { formatPrice } from "@/data/products";
import { CloseIcon, MinusIcon, PlusIcon, CartIcon } from "@/components/ui/icons";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Slide-in cart. Lists items and starts Stripe Checkout. Items without an
 * online price ("Contact for pricing") are excluded from the charge and the
 * shopper is pointed to Contact for a quote.
 */
export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, count, subtotalCents, hasQuoteOnly, setQty, remove, clear } =
    useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            slug: i.slug,
            quantity: i.quantity,
            accessoryIds: (i.accessories ?? []).map((a) => a.id),
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Could not start checkout.");
      }
      window.location.href = data.url; // redirect to Stripe Checkout
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not start checkout.");
      setLoading(false);
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col glass transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between px-6 py-5 hairline border-t-0 border-b border-white/[0.08]">
          <h2 className="font-heading text-lg tracking-tight text-white">
            Your Cart
            <span className="ml-2 text-sm font-normal text-steel">
              ({count})
            </span>
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="rounded-full p-2 text-steel transition-colors hover:bg-white/5 hover:text-white"
          >
            <CloseIcon />
          </button>
        </header>

        {items.length === 0 ? (
          // Empty state
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="rounded-full border border-white/10 p-5 text-steel">
              <CartIcon className="h-7 w-7" />
            </div>
            <p className="text-sm text-steel">Your cart is empty.</p>
            <Link
              href="/shop"
              onClick={onClose}
              className="text-sm text-accent underline-offset-4 hover:text-accent-signal hover:underline"
            >
              Browse printers
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-white/[0.06] overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.slug} className="flex gap-4 py-5">
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-steel">
                      {item.category}
                    </p>
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={onClose}
                      className="font-heading text-sm text-white hover:text-titanium"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-xs text-steel">
                      {formatPrice(item.priceCents)}
                    </p>
                    {item.accessories && item.accessories.length > 0 && (
                      <ul className="mt-2 space-y-1 border-l border-white/10 pl-3">
                        {item.accessories.map((a) => (
                          <li
                            key={a.id}
                            className="flex justify-between gap-2 text-[11px] text-steel"
                          >
                            <span>+ {a.name}</span>
                            <span className="whitespace-nowrap">
                              {formatPrice(a.priceCents)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      type="button"
                      onClick={() => remove(item.slug)}
                      className="text-xs text-steel underline-offset-4 hover:text-white hover:underline"
                    >
                      Remove
                    </button>
                    <div className="flex items-center gap-2 rounded-full border border-white/10">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        onClick={() => setQty(item.slug, item.quantity - 1)}
                        className="p-1.5 text-steel transition-colors hover:text-white"
                      >
                        <MinusIcon className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-4 text-center text-sm tabular-nums text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() => setQty(item.slug, item.quantity + 1)}
                        className="p-1.5 text-steel transition-colors hover:text-white"
                      >
                        <PlusIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="space-y-3 border-t border-white/[0.08] px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-steel">Subtotal</span>
                <span className="font-heading text-lg text-white">
                  {formatPrice(subtotalCents)}
                </span>
              </div>
              <p className="text-xs text-steel">
                Taxes, freight &amp; installation calculated separately. Secure
                checkout powered by Stripe.
              </p>

              {hasQuoteOnly && (
                <p className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-steel">
                  Some items are quote-only and won&apos;t be charged.{" "}
                  <Link
                    href="/contact"
                    onClick={onClose}
                    className="text-accent hover:text-accent-signal"
                  >
                    Contact us
                  </Link>{" "}
                  for those.
                </p>
              )}

              {error && (
                <p className="rounded-lg border border-red-400/40 bg-red-400/5 px-3 py-2 text-xs text-red-400">
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={handleCheckout}
                disabled={loading || subtotalCents === 0}
                className="btn-spark w-full py-3.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Redirecting to checkout…" : "Checkout"}
              </button>
              <button
                type="button"
                onClick={clear}
                className="w-full text-xs text-steel underline-offset-4 hover:text-white hover:underline"
              >
                Clear cart
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
