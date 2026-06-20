import type { Metadata } from "next";
import { CheckoutSuccess } from "@/components/checkout/CheckoutSuccess";

export const metadata: Metadata = {
  title: "Order received",
  robots: { index: false },
};

export default function CheckoutSuccessPage() {
  return <CheckoutSuccess />;
}
