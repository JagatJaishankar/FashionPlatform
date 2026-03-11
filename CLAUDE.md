# TRENDHUB — Project Context

## Project Overview
- **Client:** Aadil Zain — fashion affiliate platform
- **Business:** Affiliate fashion/jewelry platform. Products redirect to external partner sites. No checkout, no auth, no backend.
- **Stack:** Next.js 15 (App Router, JavaScript, NO src/ directory) + Tailwind CSS v4 (NO config file) + DaisyUI v5 (latest, custom theme via @plugin)
- **Design References:** Farfetch, Reversible, Mytheresa — product-forward, dense but clean, editorial fashion feel
- **Niche:** Fashion / Clothing / Jewelry — women-focused

## Critical Rules
- **NO inline style tags** — all styling via Tailwind classes or globals.css
- **NO src/ directory** — components at /components/, app at /app/, lib at /lib/
- **NO checkout, NO auth, NO admin** — this is an affiliate platform
- **Tailwind v4** — no tailwind.config.js. Use @theme in globals.css for custom values
- **DaisyUI v5** — use @plugin "daisyui" and @plugin "daisyui/theme" in globals.css
- **Every reusable component = its own file** in components/ui/
- **Every layout component = its own file** in components/layout/
- **Every page-specific section = its own file** in components/home/, components/product/, etc.
- **Mobile-first** — all components must be responsive
- **Products are the hero** — no giant banners eating viewport space
- **Wider layout** — use max-w-[1320px] for main content containers
- **All product/coupon data is placeholder** — use lib/placeholder-data.js
- **Images** — use next/image with Unsplash URLs for placeholders, proper sizes attribute
- **Links** — use next/link for all internal navigation

## Design System (defined in globals.css @plugin "daisyui/theme")

### Theme: "adil" — Light, Warm, Premium
- base-100: oklch(98% 0.006 80) — warm off-white, main backgrounds
- base-200: oklch(95% 0.008 83) — alternating sections, input backgrounds
- base-300: oklch(89.5% 0.01 85) — all borders and dividers
- base-content: oklch(25% 0.012 70) — all primary text, headings
- primary: oklch(62% 0.14 65) — warm amber, action links, active states
- primary-content: oklch(98% 0.006 80) — text on primary backgrounds
- secondary: oklch(58% 0.025 70) — muted text (brand names, dates, breadcrumbs, footer links, eyebrows)
- accent: oklch(68% 0.14 18) — playful coral/red, coupon energy, sale CTAs (use sparingly)
- accent-content: oklch(98% 0.006 80) — text on accent backgrounds
- neutral: oklch(22% 0.005 80) — dark charcoal, announcement bar, backdrops
- neutral-content: oklch(98% 0.006 80) — white text on dark elements
- error: oklch(55% 0.2 25) — sale prices, discount %, SALE badge bg
- All border-radius: 0 (sharp edges throughout)

### Color Usage Rules
- bg-base-100: main page background, cards, modals
- bg-base-200: alternating sections (coupons strip, sale strip), input backgrounds, code blocks
- border-base-300: all borders and dividers — visible but not heavy
- text-base-content: all primary text, headings, product names
- text-secondary: muted text — brand names on cards, dates, "available at", breadcrumb inactive items, footer links, eyebrow labels
- bg-primary / text-primary: "GET DEAL" links, brand pills on hover, active filter states, primary action links
- bg-accent / text-accent: sale-related CTAs, coupon "energy" moments, hover highlights on coupon cards. Use sparingly — accent is the playful color.
- bg-neutral / text-neutral-content: announcement bar (dark strip at top), backdrop overlays only
- text-error: sale prices, discount percentages, SALE badge background (bg-error)
- bg-base-content text-base-100: primary CTA buttons ("SHOP NOW"), TRENDING badges, brand pills active state
- **NO large dark sections** — only AnnouncementBar (thin strip), badges, and CTA buttons use dark bg

### Typography
- Display/Headings: Cormorant (serif) — font-display class
- Body/UI: Manrope (sans) — font-body class
- Hero headings: text-4xl md:text-5xl lg:text-6xl font-display
- Section headings: text-2xl md:text-3xl font-display
- Body: text-sm md:text-base font-body
- Eyebrow labels: text-[11px] tracking-[0.2em] uppercase font-body
- Product card brand: text-[11px] tracking-wider uppercase
- Product card name: text-sm font-medium
- Product card price: text-sm font-semibold

### Spacing & Layout
- Max content width: max-w-[1320px] mx-auto
- Section padding: py-10 md:py-16
- Container padding: px-4 md:px-8 lg:px-12
- Card gaps: gap-4 md:gap-5
- Between sections: border-t border-base-300 where needed

### Component Patterns
- Product cards: no shadow, border border-base-300, hover:border-base-content/20 transition
- Coupon cards: border border-base-300, full-color brand logo, prominent discount
- Category cards: aspect-[3/4], image with gradient overlay, text overlay
- Buttons: btn class from DaisyUI, customized with theme
- Tags/Badges: SALE = bg-error text-error-content, TRENDING = bg-base-content text-base-100, NEW = bg-primary text-primary-content

### Brand
- Site name: TrendHub
- Tagline: "Curated fashion. Exclusive deals."
