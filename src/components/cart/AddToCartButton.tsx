"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "./CartContext";
import { CheckIcon, PlusIcon } from "@/components/ui/icons";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

/**
 * "Inquire / Add to Cart" action. Adds the printer to the local inquiry
 * cart and shows brief tactile confirmation. No payment is taken — this
 * builds a quote request list (see CartContext TODO for Stripe).
 */
export function AddToCartButton({ product, className = "" }: AddToCartButtonProps) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    add(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-live="polite"
      className={`btn-spark group px-7 py-3.5 text-sm ${className}`}
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
  );
}
