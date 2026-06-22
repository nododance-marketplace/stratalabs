import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getProductBySlug } from "@/data/products";

export const runtime = "nodejs";

/**
 * Creates a Stripe Checkout Session from the cart and returns its URL.
 *
 * SECURITY: the client only sends { slug, quantity }. Prices are re-read
 * server-side from products.ts by slug, so the amount charged can never be
 * tampered with from the browser.
 */
export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Payments aren’t configured yet. Add STRIPE_SECRET_KEY." },
      { status: 500 },
    );
  }
  const stripe = new Stripe(key);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const rawItems =
    body && typeof body === "object" && Array.isArray((body as any).items)
      ? (body as any).items
      : [];
  if (rawItems.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const origin =
    req.headers.get("origin") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";
  const canLinkImages = origin.startsWith("https://"); // Stripe needs public URLs

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const item of rawItems) {
    const product = getProductBySlug(String(item?.slug ?? ""));
    if (!product || product.priceCents == null) continue; // skip quote-only items
    const quantity = Math.max(1, Math.min(99, Number(item?.quantity) || 1));
    line_items.push({
      quantity,
      price_data: {
        currency: "usd",
        unit_amount: product.priceCents,
        product_data: {
          name: product.name,
          description: product.specLine,
          // Stripe wants public raster URLs; skip SVGs and local origins.
          ...(canLinkImages &&
          product.images[0] &&
          !product.images[0].endsWith(".svg")
            ? { images: [origin + product.images[0]] }
            : {}),
        },
      },
    });
  }

  if (line_items.length === 0) {
    return NextResponse.json(
      { error: "No purchasable items in cart." },
      { status: 400 },
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop`,
      billing_address_collection: "required",
      shipping_address_collection: { allowed_countries: ["US"] },
      phone_number_collection: { enabled: true },
      // Enabled payment methods (card, ACH bank debit, etc.) come from your
      // Stripe Dashboard settings. ACH is recommended for large B2B amounts.
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not start checkout.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
