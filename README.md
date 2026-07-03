# Obsidian Ink — studio site

Presentational website for **Obsidian Ink**, a (fictional) blackwork and
dotwork tattoo collective in Debar Maalo, Skopje — named for the volcanic
glass that cut the first tattoos into skin. Three artists, one discipline:
Balkan ornament — embroidery geometry, iconostasis carving, solar wheels —
rebuilt as heavy, architectural blackwork. The site is trilingual
(Macedonian / English / Albanian), fully static except the booking API, and
deliberately CMS-free.

## Stack & why

| Choice | Reason |
| --- | --- |
| **Next.js 16, App Router** | Static prerendering per locale, server components for zero-JS content pages, one API route for the form. |
| **TypeScript** | The content model is typed; a missing translation or bad style id fails the build, not production. |
| **Tailwind v4** | Design tokens live in CSS (`@theme` in `src/app/globals.css`) — ink/bone/blood palette, three font families. |
| **next-intl v4** | Locale routing (`/mk`, `/en`, `/al`), message catalogs, date formatting. |
| **zod** | One schema validates the booking form on the client *and* the API route. |
| **Resend** | Real email delivery for inquiries; filesystem fallback in dev. |
| **MDX (next-mdx-remote)** | The journal is a real content collection: files on disk with frontmatter, not JSX. |

No CMS, no database: for a five-page studio site, typed TS modules + MDX files
*are* the CMS. Everything editorial is editable without touching a component.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /mk
npm run build && npm start   # production
npm run lint
```

Optional environment (`cp .env.example .env.local`):

- `RESEND_API_KEY`, `BOOKING_INBOX`, `BOOKING_FROM` — booking inquiries are
  emailed via Resend. **Without a key, submissions append to
  `.bookings/inbox.ndjson`** so nothing is lost in development.
- `NEXT_PUBLIC_ANALYTICS_SRC` (+ `_DOMAIN`) — an analytics script that loads
  **only after cookie consent** (see below). Unset = nothing ever loads.

## How i18n works

- `src/i18n/routing.ts` declares locales `["mk", "en", "al"]`, default `mk`.
  `src/proxy.ts` (Next 16's middleware) redirects `/` → `/mk` and prefixes all
  routes. The `/al` prefix is a product requirement; since Albanian's ISO code
  is `sq`, the layout maps it: `<html lang="sq">` on `/al/*`.
- **UI strings** live in `messages/{mk,en,al}.json` — full catalogs, every key
  translated in all three languages.
- **Content strings** (artist bios, gallery titles/alt text, FAQ, pricing)
  live with the data as `Localized = Record<Locale, string>` objects, so a
  content edit touches one file, not three catalogs.
- **Long-form content** (journal) is one MDX file per locale per post:
  `content/news/{locale}/{slug}.mdx`. Same slug across locales, so the
  language switcher works on article pages.

## Content model

```
src/content/styles.ts    shared style vocabulary (id + localized label)
src/content/artists.ts   Artist: slug, name, role, since, specialties[styleId], bio…
src/content/gallery.ts   GalleryItem: id, title, artistSlug, styles[], year,
                         placement, alt — filterable portfolio derives from this
src/content/pricing.ts   PricingTier, src/content/faq.ts FaqItem
content/news/…           journal posts (MDX + frontmatter: title/date/excerpt/author)
```

`artists`, `gallery` and `styles` reference each other by id — the portfolio
filter, artist specialties and per-artist work lists all derive from the same
vocabulary. Gallery and portrait photography lives in `public/images/`
(sourced from Unsplash under its free license) and is referenced by path from
the content model, with per-locale alt text describing each photograph.
Photos render through a CSS `grayscale` filter so mixed sources read as one
monochrome set. Brand ornaments (hero, 404) are generative SVG sigils
(`src/components/ui/Sigil.tsx`).

## Booking form

`src/lib/booking.ts` (zod) is imported by both the client form and
`POST` handler at `src/app/api/booking/route.ts`, so validation cannot drift.
Error messages are i18n keys (`booking.errors.*`) resolved where they're
displayed. The form has explicit submitting / success / server-error states,
focus moves to the error summary on failure, and a honeypot field silently
drops bots with a convincing `200`.

## Cookie consent

Real consent, not a cosmetic banner: the `oi-consent` cookie is the single
source of truth, exposed to React via `useSyncExternalStore`
(`src/lib/consent.ts`, `src/components/consent/`). Until a visitor accepts,
`AnalyticsGate` renders nothing — the non-essential script is never requested.
Declining is persisted equally, and the footer's "Cookie settings" reopens the
banner.

## Accessibility

Semantic landmarks and one `h1` per page, skip link, keyboard-operable menu
(Escape closes, focus states everywhere via `:focus-visible`), `aria-pressed`
filter buttons, `aria-invalid`/`aria-describedby` on form fields, native
`<details>` FAQ, `prefers-reduced-motion` disables all scroll/hover motion,
and palette contrast ≥ AA on the dark ground.

---

Progress log and architectural decisions: [PROGRESS.md](./PROGRESS.md).
