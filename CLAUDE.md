# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
- **Client:** Aadil Zain — fashion affiliate platform
- **Business:** Affiliate fashion/jewelry platform. Products redirect to external partner sites. No checkout, no auth, no backend.
- **Stack:** Next.js 15 (App Router, JavaScript, NO src/ directory) + Tailwind CSS v4 (NO config file) + DaisyUI v5 (custom theme via @plugin)
- **Design References:** Farfetch, Reversible, Mytheresa — product-forward, dense but clean, editorial fashion feel
- **Niche:** Fashion / Clothing / Jewelry — women-focused

## Dev Commands
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint
```
No test suite exists.

## Architecture

### Routing (App Router)
All user-facing pages live under `app/(main)/` with a shared layout (`app/(main)/layout.js`) that wraps content with Navbar + Footer. The `(main)` route group does NOT affect URLs.

| URL | File |
|-----|------|
| `/` | `app/(main)/page.js` |
| `/products` | `app/(main)/products/page.js` |
| `/products/[slug]` | `app/(main)/products/[slug]/page.js` |
| `/brands` | `app/(main)/brands/page.js` |
| `/brands/[slug]` | `app/(main)/brands/[slug]/page.js` |
| `/coupons` | `app/(main)/coupons/page.js` |
| `/coupons/collections/[slug]` | `app/(main)/coupons/collections/[slug]/page.js` |
| `/blog`, `/blog/[slug]` | `app/(main)/blog/` |
| `/search` | `app/(main)/search/page.js` |
| `/wishlist` | `app/(main)/wishlist/page.js` |
| `/redirect` | `app/redirect/page.js` — affiliate redirect interstitial (2.5s progress bar → `window.location.href`) |

### Affiliate Redirect Pattern
All external product/deal links go through `/redirect?url=<encoded-url>&brand=<name>`. Never link directly to external affiliate URLs from product cards or buttons.

### State (React Context — all in `lib/`)
| Context | File | Purpose |
|---------|------|---------|
| `CurrencyProvider` | `currency-context.js` | Selected currency + `formatPrice(usdAmount)` util |
| `AuthModalProvider` | `auth-modal-context.js` | Controls AuthModal open/close |
| `QuickViewProvider` | `quickview-context.js` | Controls QuickViewModal + selected product |
| `WishlistProvider` | `wishlist-context.js` | In-memory wishlist (no persistence) |

All four providers wrap the app in `app/layout.js`. `WishlistProvider` is separate — check if it's added to `app/layout.js` before using `useWishlist`.

All prices are stored in USD; use `formatPrice()` from `useCurrency()` to display — never `lib/utils.js formatPrice()` for display.

### Data
All data is placeholder — `lib/placeholder-data.js`. Product shape:
```js
{ id, slug, name, brand, brandSlug, category, categorySlug, subcategory,
  price, originalPrice, image, redirectUrl, tags, merchant }
```
Tags: `"trending"`, `"sale"`, `"new"`. `originalPrice: null` = no discount.

### Component Organization
- `components/ui/` — reusable atoms (ProductCard, CouponCard, etc.)
- `components/layout/` — Navbar, Footer, MegaMenu, MobileDrawer, AnnouncementBar, SearchOverlay, CurrencySelector
- `components/home/` — homepage sections (TrendingProducts, ShopByCategory, etc.)
- `components/product/` — product page sections (ProductGrid, RelatedProducts, RelatedCoupons)

### Path Alias
`@/` maps to the project root (e.g., `@/components/ui/ProductCard`).

## Critical Rules
- **NO inline style tags** — all styling via Tailwind classes or globals.css (exception: dynamic values like `width: ${progress}%` that can't be expressed as static classes)
- **NO src/ directory** — components at `/components/`, app at `/app/`, lib at `/lib/`
- **NO checkout, NO auth, NO admin** — this is an affiliate platform
- **Tailwind v4** — no `tailwind.config.js`. Use `@theme` in `globals.css` for custom tokens
- **DaisyUI v5** — configure via `@plugin "daisyui"` and `@plugin "daisyui/theme"` in `globals.css`
- **Every reusable component = its own file** in the appropriate `components/` subdirectory
- **Mobile-first** — all components must be responsive
- **Products are the hero** — no giant banners eating viewport space
- **All product/coupon data is placeholder** — use `lib/placeholder-data.js`
- **Images** — `next/image` with Unsplash URLs, always include `sizes` prop
- **Links** — `next/link` for internal navigation

## Design System

### Theme: "adil" (defined in `app/globals.css`)
Actual values from the source (CLAUDE.md previously had approximate values):
- `base-100`: `oklch(98% 0.0044 78.2)` — warm off-white, main backgrounds
- `base-200`: `oklch(95.6% 0.0057 84.6)` — alternating sections, input backgrounds
- `base-300`: `oklch(93.7% 0.0069 88.7)` — all borders and dividers
- `base-content`: `oklch(21% 0.0083 84.6)` — all primary text
- `primary`: `oklch(75% 0.0854 82.1)` — warm amber/tan, action links
- `primary-content`: `oklch(21% 0.0083 84.6)` — dark text on primary bg
- `secondary`: `oklch(51.1% 0.0109 62.3)` — muted text (brand names, dates, breadcrumbs)
- `accent`: `oklch(94.5% 0.0269 85.7)` — light accent bg; `accent-content: oklch(63.7% 0.0881 79.2)`
- `neutral`: `oklch(22.2% 0.0041 84.6)` — dark charcoal, announcement bar
- `neutral-content`: `oklch(98% 0.0044 78.2)` — white text on dark elements
- `error`: `oklch(54.3% 0.174 29.7)` — sale prices, discount %, SALE badge bg
- All border-radius: `0` (sharp edges throughout)

### Color Usage Rules
- `bg-base-100`: page background, cards, modals
- `bg-base-200`: alternating sections, input backgrounds
- `border-base-300`: all borders and dividers
- `text-base-content`: primary text, headings, product names
- `text-secondary`: muted — brand names on cards, dates, breadcrumb inactive, footer links, eyebrows
- `text-primary` / `bg-primary`: "GET DEAL" links, active filter states, primary action links
- `bg-accent` / `text-accent-content`: sale CTAs, coupon highlights — use sparingly
- `bg-neutral` / `text-neutral-content`: AnnouncementBar only; NO large dark sections
- `text-error` / `bg-error`: sale prices, discount percentages, SALE badge
- `bg-base-content text-base-100`: primary CTA buttons ("SHOP NOW"), TRENDING badges

### Typography
- Display/Headings: Cormorant (serif) — `font-display` class
- Body/UI: Manrope (sans) — `font-body` class
- Hero headings: `text-4xl md:text-5xl lg:text-6xl font-display`
- Section headings: `text-2xl md:text-3xl font-display`
- Eyebrow labels: `text-[11px] tracking-[0.2em] uppercase font-body`
- Product card brand: `text-[11px] tracking-wider uppercase`
- Product card name: `text-sm font-medium`
- Product card price: `text-sm font-semibold`

### Layout & Spacing
- Main container: use the `container-main` CSS class (defined in `globals.css`; max-width 1520px, responsive padding)
- Section padding: `py-10 md:py-16`
- Card gaps: `gap-4 md:gap-5`
- Section dividers: `border-t border-base-300`

### globals.css Utility Classes
- `.container-main` — max-width 1520px container with responsive padding
- `.card-hover` — subtle translateY(-2px) + border transition on hover
- `.coupon-tear` — scalloped top edge for coupon cards (CSS `::before` pseudo-element)
- `.scrollbar-hide` — hides scrollbar for filter pill rows

### Component Patterns
- Product cards: no shadow, `border border-base-300`, use `.card-hover`
- Coupon cards: `border border-base-300`, full-color brand logo, prominent discount, use `.coupon-tear`
- Category cards: `aspect-[3/4]`, image with gradient overlay, text overlay
- Tags/Badges: `SALE` = `bg-error text-error-content`, `TRENDING` = `bg-base-content text-base-100`, `NEW` = `bg-primary text-primary-content`
