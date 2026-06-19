import { Hero } from "@/components/home/Hero";
import { WhySection } from "@/components/home/WhySection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhySection />
      <FeaturedProducts />
    </>
  );
}
