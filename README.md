# Strata Labs

> Get in touch with the future.

A modern storefront for **Strata Labs**, a US-based company that dropships
industrial 3D printers (SLM, SLS, and large-format FDM) to businesses.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS**. No database —
products live in a single typed data file. Deployable to **Vercel** out of the box.

---

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

> Requires Node 18.17+ (Node 20+ recommended).

---

## Deploy to Vercel

1. Push this folder to a Git repository (GitHub/GitLab/Bitbucket).
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Accept the defaults — Vercel auto-detects Next.js. No environment variables
   are required. Click **Deploy**.

---

## Editing products

**All products live in one file:** [`src/data/products.ts`](src/data/products.ts).
There is no backend — edit this file and the whole site updates.

The current catalog is **5 real SLM (metal) printers** sourced from FastForm
(DeskFab X1, FF-M140C, FF-M220, FF-M300, FF-420Q), filtered in the shop by
use-case segment: **Desktop / Dental / Industrial**.

Each product looks like this:

```ts
{
  slug: "ff-m220",                  // unique, URL-safe → /products/ff-m220
  name: "FF-M220",
  category: "Dental",               // "Desktop" | "Dental" | "Industrial"
  specLine: "220 × 140 × 100 mm · dual 500 W lasers · 300 crowns/run",
  price: "Contact for pricing",     // any string
  description: "…",                 // paragraph on the product detail page
  highlights: ["…", "…"],           // optional bullet list on the detail page
  specs: [                          // rows of the spec table
    { label: "Laser Power", value: "2 × 500 W" },
    { label: "Print Volume", value: "220×140×100 mm" },
  ],
  images: ["/products/ff-m220-1.png"], // see "Adding product images" below
  featured: true,                   // optional: show on the homepage grid
}
```

**Common edits**

- **Change text/specs/price** — edit the fields directly. `price` is just a
  string, so `"Contact for pricing"`, `"$189,000"`, or `"From $42k"` all work.
- **Add a product** — copy an existing object, give it a unique `slug`, and add
  it to the `products` array. Its detail page (`/products/<slug>`) and shop card
  appear automatically.
- **Remove a product** — delete its object from the array.
- **Feature on the homepage** — set `featured: true` (the homepage shows up to 4).
- **Categories** — the three segments (`Desktop`, `Dental`, `Industrial`) are
  defined at the top of the file (`CATEGORIES` / `CATEGORY_META`). The shop
  filter is generated from them automatically. To change the taxonomy (e.g.
  add `SLS` / `FDM` when you stock them), update `Category` in
  [`src/lib/types.ts`](src/lib/types.ts) and those two objects.

Product images live in [`public/products/`](public/products/) (downloaded from
the supplier). Prices are set to "Contact for pricing" — set your own markup
when ready.

---

## Adding product images

1. Drop image files into [`public/products/`](public/) (create the folder if
   needed), e.g. `public/products/slm-printer-1.jpg`.
2. Reference them in that product's `images` array:

   ```ts
   images: ["/products/slm-printer-1.jpg", "/products/slm-printer-1-side.jpg"],
   ```

Until you add images, the site renders an on-brand placeholder automatically —
nothing looks broken. The first image is used on cards; all images appear in the
product detail gallery.

---

## The logo / brand mark

The site uses the official Strata Labs logo files, stored in
[`public/brand/`](public/brand/):

| File | Used for |
| --- | --- |
| `emblem.png` | Flat-2D emblem (transparent) — **header & footer** |
| `emblem-orange.png` | Orange accent emblem (transparent) — About page accent |
| `emblem-3d.png` | Full 3D metallic emblem (also the favicon) |
| `emblem-white.png` | White knockout emblem (transparent) |
| `wordmark.png` | Metallic "STRATA LABS" wordmark |

Other locations:

- [`public/logo.png`](public/logo.png) — the full primary lockup
  (emblem + wordmark) for OG/social/standalone use.
- [`src/app/icon.png`](src/app/icon.png) — the favicon (Next.js generates it
  automatically; currently the 3D emblem).

The header and footer pair the flat-2D emblem with an uppercase, letter-spaced
"STRATA LABS" wordmark in Space Grotesk. To use the metallic wordmark image
instead of the text, swap the wordmark `<span>` in
[`Header.tsx`](src/components/layout/Header.tsx) for
`<Image src="/brand/wordmark.png" … />`. To replace any logo, just overwrite the
file in `public/brand/`.

---

## Cart & forms (current behavior + TODOs)

This is a front-end-only build. A few spots are intentionally stubbed:

- **Cart** — a lightweight inquiry cart (React Context + `localStorage`) in
  [`src/components/cart/CartContext.tsx`](src/components/cart/CartContext.tsx).
  "Add to Cart" builds a quote-request list. **No payments yet.**
  - **TODO (Stripe):** the **Request Quote** button in
    [`CartDrawer.tsx`](src/components/cart/CartDrawer.tsx) currently
    `console.log`s the list. Wire it to a Stripe Checkout Session or your CRM.
- **Contact form** — [`ContactForm.tsx`](src/components/contact/ContactForm.tsx)
  validates input and `console.log`s the submission.
  - **TODO (email):** connect it to a Route Handler (`app/api/contact/route.ts`)
    using Resend/SendGrid, or a service like Formspree.

Search the codebase for `TODO` to find every spot that needs wiring.

---

## Brand & design

Follows the **Strata Labs Brand Guide v1.0**. All tokens live in
[`tailwind.config.ts`](tailwind.config.ts).

- **Colors:** Titanium Silver `#C5C8CC` (primary — headings/logo) on a Near
  Black `#0A0B0D` canvas; Graphite `#5A5F66` surfaces/dividers; Brushed Steel
  `#8A8F98` body. **Orange is the spark** — Molten Orange `#FF6A00` for
  buttons/links/key actions, Signal `#FF8C1A` for hover, Ember `#FFB266` for
  tints. Used sparingly (≈80/15/5 titanium-black / greys / orange) — "the glow,
  never the surface." The accent is the Tailwind `accent` token
  (`accent` / `accent-signal` / `accent-ember`). Reusable helpers:
  `.btn-spark` (primary orange button), `.text-spark` (orange emphasis),
  `.text-metallic` (titanium emphasis).
- **Fonts:** Space Grotesk (headings, uppercase + letter-spaced for the
  wordmark) + Inter (body), loaded via `next/font`.
- **Voice:** confident, clear, forward, grounded. Taglines: "Get in touch with
  the future." · "Built layer by layer." · "The printers others can't get you."
- **Motion:** fade-in-on-scroll via a dependency-free `FadeIn` component
  ([`src/components/ui/FadeIn.tsx`](src/components/ui/FadeIn.tsx)); respects
  `prefers-reduced-motion`.

---

## Project structure

```
src/
  app/
    layout.tsx                 # root layout: fonts, cart provider, header, footer
    page.tsx                   # Home (hero, why, featured)
    shop/page.tsx              # Shop with category filter
    products/[slug]/page.tsx   # Product detail
    about/page.tsx             # About ("Strata = layers")
    contact/page.tsx           # Contact form
    not-found.tsx              # 404
    globals.css                # theme + base styles
  components/
    cart/                      # CartContext, CartDrawer, AddToCartButton
    contact/ContactForm.tsx
    home/                      # Hero, WhySection, FeaturedProducts
    layout/                    # Header (logo slot + cart), Footer
    product/                   # ProductCard, ProductGallery, ShopGrid, CategoryBadge
    ui/                        # FadeIn, ProductImage, icons
  data/products.ts            # ← edit your catalog here
  lib/types.ts                # shared types
public/
  logo.png                    # ← drop your logo here
  products/                   # ← drop product images here
```
