import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { ArrowRightIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Built layer by layer. Strata = layers. A US-based company sourcing the hard-to-find industrial 3D printers most businesses can't get locally.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <FadeIn>
        <p className="text-xs uppercase tracking-[0.24em] text-accent">
          01 — Who we are
        </p>
        <h1 className="mt-5 font-heading text-4xl font-medium leading-tight tracking-tight text-white sm:text-6xl">
          Built layer by layer.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-steel">
          Strata Labs puts industrial-grade 3D printing within reach — sourcing
          the SLS, SLM, and large-format FDM machines most businesses can&apos;t
          get locally, and connecting them with the technology that moves them
          forward.
        </p>
      </FadeIn>

      {/* STRATA = layers */}
      <FadeIn delay={100}>
        <div className="mt-20 grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-center">
          <div>
            <p className="font-heading text-5xl font-medium tracking-tight text-white sm:text-6xl">
              STRATA
              <br />
              <span className="text-spark">= layers.</span>
            </p>
          </div>
          <p className="text-lg leading-relaxed text-steel">
            Every part a printer makes is built one precise layer at a time,
            stacked into something real. That idea runs through our name, our
            emblem, and how we work: solid foundations, raised with precision,
            one deliberate layer after another.
          </p>
        </div>
      </FadeIn>

      {/* What we sell / Who we serve */}
      <div className="mt-20 grid gap-6 sm:grid-cols-2">
        <FadeIn delay={120}>
          <div className="h-full rounded-2xl border border-white/[0.08] bg-base-900/60 p-8">
            <h2 className="font-heading text-lg tracking-tight text-white">
              What we sell
            </h2>
            <p className="mt-3 text-base leading-relaxed text-steel">
              Five industrial SLM metal printers — from a compact desktop dental
              system to a super-large multi-laser machine for mass production.
              The hard-to-source machines that open new doors.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={180}>
          <div className="h-full rounded-2xl border border-white/[0.08] bg-base-900/60 p-8">
            <h2 className="font-heading text-lg tracking-tight text-white">
              Who we serve
            </h2>
            <p className="mt-3 text-base leading-relaxed text-steel">
              Businesses, not hobbyists — engineering firms, manufacturers,
              product studios, and labs scaling up. They value capability,
              reliability, and a partner who knows the machines.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Closing CTA */}
      <FadeIn delay={220}>
        <div className="mt-20 flex flex-col items-start gap-6 rounded-2xl border border-white/[0.08] bg-base-900/60 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="relative h-11 w-9 shrink-0">
              <Image
                src="/brand/emblem-orange.png"
                alt="Strata Labs emblem"
                fill
                sizes="36px"
                className="object-contain"
              />
            </span>
            <p className="font-heading text-xl tracking-tight text-white">
              Get in touch with the <span className="text-spark">future.</span>
            </p>
          </div>
          <Link href="/shop" className="btn-spark group px-7 py-3.5 text-sm">
            Shop Printers
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
