"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "./CartContext";
import { CloseIcon, MinusIcon, PlusIcon, CartIcon } from "@/components/ui/icons";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Slide-in inquiry cart. Lists requested printers and a "Request Quote"
 * action. There is NO checkout/payment yet.
 *
 * TODO (Stripe): replace the "Request Quote" handler below with a call to
 * create a Stripe Checkout Session (or route the list to your CRM/email).
 */
export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, count, setQty, remove, clear } = useCart();

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

  function handleRequestQuote() {
    // TODO (email/Stripe): wire this up. For now, log the inquiry list.
    console.log("[Strata Labs] Quote requested for:", items);
    alert(
      "Thanks — your inquiry list is logged to the console for now.\nWiring this to email/Stripe is a TODO.",
    );
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
        aria-label="Inquiry cart"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col glass transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between px-6 py-5 hairline border-t-0 border-b border-white/[0.08]">
          <h2 className="font-heading text-lg tracking-tight text-white">
            Your Inquiry
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
            <p className="text-sm text-steel">
              Your inquiry list is empty.
            </p>
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
                    <p className="mt-1 text-xs text-steel">{item.price}</p>
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
              <p className="text-xs text-steel">
                Pricing is provided per quote. Submit your list and US-based
                support will follow up.
              </p>
              <button
                type="button"
                onClick={handleRequestQuote}
                className="btn-spark w-full py-3.5 text-sm"
              >
                Request Quote
              </button>
              <button
                type="button"
                onClick={clear}
                className="w-full text-xs text-steel underline-offset-4 hover:text-white hover:underline"
              >
                Clear list
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
