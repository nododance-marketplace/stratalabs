import type { Category } from "@/lib/types";

const STYLES: Record<Category, string> = {
  Desktop: "border-steel/50 text-steel",
  Dental: "border-accent/40 text-accent-ember",
  Industrial: "border-titanium/40 text-titanium",
  Design: "border-accent/50 bg-accent/10 text-accent-ember",
  Consultation: "border-steel/50 text-steel",
  SLS: "border-steel/50 text-steel",
  Resin: "border-steel/50 text-steel",
  "Large-Format FDM": "border-steel/50 text-steel",
};

export function CategoryBadge({ category }: { category: Category }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] ${STYLES[category]}`}
    >
      {category}
    </span>
  );
}
