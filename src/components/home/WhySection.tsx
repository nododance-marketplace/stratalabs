import { FadeIn } from "@/components/ui/FadeIn";
import { CompassIcon, CubeIcon, ShieldIcon } from "@/components/ui/icons";

const PILLARS = [
  {
    icon: CompassIcon,
    title: "Hard-to-source hardware",
    body: "Industrial SLM, SLS, and large-format FDM systems are notoriously difficult to find and import. We track down the machines most suppliers can't and bring them to your floor.",
  },
  {
    icon: CubeIcon,
    title: "Built for businesses",
    body: "These aren't desktop hobby units. Every printer in our catalog is specified for production environments — tooling, end-use parts, and serious throughput.",
  },
  {
    icon: ShieldIcon,
    title: "US-based support",
    body: "Sourcing, logistics, and follow-up are handled stateside. One point of contact from inquiry to install — no overseas runaround.",
  },
];

export function WhySection() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.24em] text-accent">
            Why Strata Labs
          </p>
          <h2 className="mt-4 font-heading text-3xl font-medium tracking-tight text-white sm:text-4xl">
            The printers others
            <br />
            can&apos;t get you.
          </h2>
        </div>
      </FadeIn>

      {/* Zig-zag / divided layout — avoids the generic 3-equal-cards row */}
      <div className="mt-16 divide-y divide-white/[0.07] border-y border-white/[0.07]">
        {PILLARS.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <FadeIn key={pillar.title} delay={i * 90}>
              <div className="grid gap-6 py-10 md:grid-cols-[auto_1fr_2fr] md:items-start md:gap-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-titanium">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-xl tracking-tight text-white">
                  {pillar.title}
                </h3>
                <p className="max-w-xl text-base leading-relaxed text-steel">
                  {pillar.body}
                </p>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
