import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden">
      {/* Looping background video (muted + decorative). SSR'd with the muted
          attribute so browsers allow autoplay. */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/video/header.mp4" type="video/mp4" />
      </video>

      {/* Legibility scrims over the video */}
      <div className="absolute inset-0 bg-base/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-base/95 via-base/45 to-base/10" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-base/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-base" />
      {/* Brand spark */}
      <div className="absolute bottom-[-10%] right-[-5%] h-[42vh] w-[42vh] rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-8 lg:px-8">
        {/* Left — copy */}
        <div className="animate-fade-up">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-1.5 text-xs uppercase tracking-[0.22em] text-steel">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_#FF6A00]" />
            Industrial 3D Printers · United States
          </p>

          <h1 className="font-heading text-5xl font-medium leading-[0.98] tracking-tighter text-white sm:text-6xl lg:text-7xl">
            Get in touch
            <br />
            with the <span className="text-spark">future.</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-steel">
            Industrial 3D printing, within reach. Strata Labs sources the SLM,
            SLS, and large-format FDM machines most businesses can&apos;t get
            locally — and delivers them across the United States. Built layer by
            layer, just like the future.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/shop"
              className="btn-spark group px-8 py-4 text-sm"
            >
              Shop Printers
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-sm font-medium text-titanium transition-all duration-300 hover:border-accent/50 hover:text-accent-ember"
            >
              Talk to Sales
            </Link>
          </div>
        </div>

        {/* Right — glass spec panel */}
        <div className="animate-fade-up [animation-delay:140ms]">
          <div className="glass relative rounded-3xl p-8">
            <div className="absolute right-6 top-6 text-[10px] uppercase tracking-[0.2em] text-steel">
              Live Catalog
            </div>
            <p className="font-heading text-sm text-steel">Now sourcing</p>
            <div className="mt-6 space-y-5">
              {[
                { k: "Desktop · SLM", v: "0.39 m² footprint" },
                { k: "Dental · SLM", v: "Up to 300 crowns / run" },
                { k: "Industrial · SLM", v: "Super-large multi-laser" },
              ].map((row) => (
                <div
                  key={row.k}
                  className="flex items-center justify-between border-b border-white/[0.06] pb-5 last:border-0 last:pb-0"
                >
                  <span className="text-sm text-titanium">{row.k}</span>
                  <span className="text-right text-sm text-steel">{row.v}</span>
                </div>
              ))}
            </div>
            <Link
              href="/shop"
              className="group mt-7 inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-accent-signal"
            >
              Explore the catalog
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-steel/60">
        Scroll
      </div>
    </section>
  );
}
