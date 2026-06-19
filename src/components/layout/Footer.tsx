import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const year = 2026; // Static to keep this a server component; update as needed.

  return (
    <footer className="relative mt-32 border-t border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5 text-white">
              <span className="relative h-8 w-7 shrink-0">
                <Image
                  src="/brand/emblem.png"
                  alt="Strata Labs emblem"
                  fill
                  sizes="28px"
                  className="object-contain"
                />
              </span>
              <span className="font-heading text-base font-medium uppercase tracking-[0.18em]">
                Strata Labs
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-steel">
              Get in touch with the future. US-based sourcing for the industrial
              SLM, SLS, and large-format FDM machines most businesses can&apos;t
              get locally — built layer by layer, just like the future.
            </p>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.22em] text-steel">
              Explore
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/shop" className="text-titanium hover:text-accent-ember">
                  Shop Printers
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-titanium hover:text-accent-ember">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-titanium hover:text-accent-ember">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.22em] text-steel">
              Categories
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/shop?category=Desktop"
                  className="text-titanium hover:text-accent-ember"
                >
                  Desktop SLM
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Dental"
                  className="text-titanium hover:text-accent-ember"
                >
                  Dental SLM
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Industrial"
                  className="text-titanium hover:text-accent-ember"
                >
                  Industrial SLM
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-6 text-xs text-steel sm:flex-row sm:items-center">
          <p>© {year} Strata Labs. All rights reserved.</p>
          <p className="text-steel/70">
            Industrial 3D printing · United States
          </p>
        </div>
      </div>
    </footer>
  );
}
