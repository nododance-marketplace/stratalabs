"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartIcon, MenuIcon, CloseIcon } from "@/components/ui/icons";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on navigation.
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-30 transition-all duration-300 ${
          scrolled
            ? "glass border-b border-white/[0.06]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* ── BRAND LOCKUP ───────────────────────────────────────────
              Real Strata Labs emblem (flat-2D variant, per Brand Guide 02)
              + uppercase, letter-spaced wordmark. Emblem files live in
              /public/brand/.                                              */}
          <Link href="/" className="flex items-center gap-2.5" aria-label="Strata Labs home">
            <span className="relative h-9 w-8 shrink-0">
              <Image
                src="/brand/emblem.png"
                alt="Strata Labs emblem"
                fill
                sizes="32px"
                priority
                className="object-contain"
              />
            </span>
            <Image
              src="/brand/wordmark-knockout.png"
              alt="Strata Labs"
              width={1100}
              height={336}
              priority
              className="h-6 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm tracking-wide transition-colors ${
                    active ? "text-white" : "text-steel hover:text-accent-ember"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Open inquiry cart, ${count} item${count === 1 ? "" : "s"}`}
              className="relative rounded-full p-2.5 text-titanium transition-colors hover:bg-white/5"
            >
              <CartIcon />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold tabular-nums text-base">
                  {count}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="rounded-full p-2.5 text-titanium transition-colors hover:bg-white/5 md:hidden"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`overflow-hidden border-t border-white/[0.06] glass md:hidden ${
            menuOpen ? "max-h-64" : "max-h-0 border-t-0"
          } transition-[max-height] duration-300`}
        >
          <nav className="flex flex-col px-4 py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-white/[0.05] py-3 text-sm text-titanium last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
