import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://strata-labs.vercel.app"),
  title: {
    default: "Strata Labs — Industrial 3D Printers",
    template: "%s · Strata Labs",
  },
  description:
    "Get in touch with the future. US-based sourcing for industrial SLM, SLS, and large-format FDM 3D printers — built for businesses.",
  keywords: [
    "industrial 3D printers",
    "SLM",
    "SLS",
    "large-format FDM",
    "metal 3D printing",
    "Strata Labs",
  ],
  openGraph: {
    title: "Strata Labs — Industrial 3D Printers",
    description: "Get in touch with the future.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        <CartProvider>
          <Header />
          <main className="min-h-[60vh] pt-16">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
