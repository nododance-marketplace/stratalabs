"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/types";

// ─────────────────────────────────────────────────────────────────────────
//  Lightweight cart — React context + local state.
//  Persists to localStorage so an inquiry list survives a refresh.
//
//  TODO (payments): there is no checkout yet. When ready, wire `items`
//  into a Stripe Checkout Session (see CartDrawer's "Request Quote" button).
// ─────────────────────────────────────────────────────────────────────────

export interface CartAccessory {
  id: string;
  name: string;
  priceCents: number;
}

export interface CartItem {
  slug: string;
  name: string;
  category: string;
  priceCents: number | null;
  quantity: number;
  /** Selected add-on accessories for this configured machine. */
  accessories?: CartAccessory[];
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD"; product: Product; accessories?: CartAccessory[] }
  | { type: "REMOVE"; slug: string }
  | { type: "SET_QTY"; slug: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

const STORAGE_KEY = "strata-cart";

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.slug === action.product.slug);
      if (existing) {
        // Re-adding bumps quantity; the latest accessory selection wins.
        return {
          items: state.items.map((i) =>
            i.slug === action.product.slug
              ? {
                  ...i,
                  quantity: i.quantity + 1,
                  accessories: action.accessories ?? i.accessories,
                }
              : i,
          ),
        };
      }
      return {
        items: [
          ...state.items,
          {
            slug: action.product.slug,
            name: action.product.name,
            category: action.product.category,
            priceCents: action.product.priceCents,
            quantity: 1,
            accessories: action.accessories,
          },
        ],
      };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.slug !== action.slug) };
    case "SET_QTY":
      return {
        items: state.items
          .map((i) =>
            i.slug === action.slug
              ? { ...i, quantity: Math.max(0, action.quantity) }
              : i,
          )
          .filter((i) => i.quantity > 0),
      };
    case "CLEAR":
      return { items: [] };
    case "HYDRATE":
      return { items: action.items };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  /** Sum of (priceCents × qty) for items that have a price. */
  subtotalCents: number;
  /** True if any item has no online price (must be quoted, not checked out). */
  hasQuoteOnly: boolean;
  add: (product: Product, accessories?: CartAccessory[]) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Hydrate from localStorage on mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const items = JSON.parse(raw) as CartItem[];
        if (Array.isArray(items)) dispatch({ type: "HYDRATE", items });
      }
    } catch {
      // Ignore malformed storage — start with an empty cart.
    }
  }, []);

  // Persist on change.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Storage may be unavailable (private mode) — fail silently.
    }
  }, [state.items]);

  const add = useCallback(
    (product: Product, accessories?: CartAccessory[]) =>
      dispatch({ type: "ADD", product, accessories }),
    [],
  );
  const remove = useCallback((slug: string) => dispatch({ type: "REMOVE", slug }), []);
  const setQty = useCallback(
    (slug: string, quantity: number) => dispatch({ type: "SET_QTY", slug, quantity }),
    [],
  );
  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const value = useMemo<CartContextValue>(() => {
    const count = state.items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotalCents = state.items.reduce((sum, i) => {
      const accessoriesCents =
        i.accessories?.reduce((s, a) => s + a.priceCents, 0) ?? 0;
      return sum + ((i.priceCents ?? 0) + accessoriesCents) * i.quantity;
    }, 0);
    const hasQuoteOnly = state.items.some((i) => i.priceCents == null);
    return {
      items: state.items,
      count,
      subtotalCents,
      hasQuoteOnly,
      add,
      remove,
      setQty,
      clear,
    };
  }, [state.items, add, remove, setQty, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
