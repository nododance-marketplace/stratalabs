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
  metadataBase: new URL("https://stratalabs3d.com"),
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
    url: "https://stratalabs3d.com",
    siteName: "Strata Labs",
  },
};

// Organization schema (JSON-LD) with contact details.
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Strata Labs",
  url: "https://stratalabs3d.com",
  email: "stratalabs3d@gmail.com",
  telephone: "+19804022520",
  areaServed: "US",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "stratalabs3d@gmail.com",
    telephone: "+19804022520",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <CartProvider>
          <Header />
          <main className="min-h-[60vh] pt-16">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
