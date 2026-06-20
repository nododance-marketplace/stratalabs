import Stripe from "stripe";

export const runtime = "nodejs";

/**
 * Stripe webhook receiver. Verifies the signature, then reacts to events.
 *
 * Set up in the Stripe Dashboard → Developers → Webhooks, pointing at
 *   https://YOUR-DOMAIN/api/stripe/webhook
 * and put the signing secret in STRIPE_WEBHOOK_SECRET.
 *
 * This is optional for launch (the success page handles the buyer's UX), but
 * recommended so you reliably record/fulfil orders even if the buyer closes
 * the tab after paying.
 */
export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!key || !webhookSecret) {
    return new Response("Stripe webhook not configured.", { status: 500 });
  }
  const stripe = new Stripe(key);

  const signature = req.headers.get("stripe-signature");
  if (!signature) return new Response("Missing signature.", { status: 400 });

  const payload = await req.text(); // raw body required for verification

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch {
    return new Response("Invalid signature.", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    // TODO (fulfillment): record the order in your system and/or email the
    // team + customer. e.g. send via Resend/SendGrid, write to a CRM, etc.
    console.log(
      "[Strata Labs] Payment complete:",
      session.id,
      session.amount_total,
      session.customer_details?.email,
    );
  }

  return new Response("ok", { status: 200 });
}
