# PROGRESS — Crna Reka studio site

Status ledger for picking this project up cold. Newest phase last.

## Identity (fixed, do not re-litigate)

- **Studio:** Crna Reka ("Black River"), blackwork/dotwork collective, Debar
  Maalo, Skopje. Three artists: Jana Stojanovska (founder, ornamental/folk),
  Darko Velkov (geometric/blackout), Aylin Rexhepi (dotwork/ornamental).
- **Voice:** austere, declarative, no exclamation marks, no "ink your dreams".
- **Visual system:** warm near-black (`ink-*`), bone off-whites (`bone-*`),
  oxide red accent (`blood-*`), Unbounded (display) + Manrope (body) +
  JetBrains Mono (labels). Imagery is deterministic generative SVG "sigils"
  (`src/components/ui/Sigil.tsx`) standing in for photography — swap for real
  photos by replacing `ArtworkTile` internals; alt text is already modeled.

## Phase 1 — Scaffold + i18n ✅

- Next 16 (App Router) + TS + Tailwind v4 (CSS-first `@theme`, no
  `tailwind.config`), next-intl v4.
- Locales `mk` (default), `en`, `al` under `/[locale]`; `src/proxy.ts`
  (Next 16's middleware) handles locale routing. `/al` prefix is a spec
  requirement; `<html lang>` maps it to ISO `sq`.
- Full catalogs in `messages/{mk,en,al}.json` — every UI string translated.

## Phase 2 — Layout + design system ✅

- `src/app/[locale]/layout.tsx`: fonts, skip link, Header/Footer,
  ConsentProvider, CookieBanner, AnalyticsGate.
- Primitives in `src/components/ui/`: Section/Kicker/SectionHeading, Button,
  Reveal (IntersectionObserver scroll-reveal, reduced-motion aware), Sigil.

## Phase 3 — Content model ✅

- Structured data in `src/content/`: `styles.ts` (shared vocabulary for
  filters + specialties), `artists.ts`, `gallery.ts` (12 items), `pricing.ts`,
  `faq.ts`. All human-readable strings are `Localized = Record<Locale,string>`.
- Journal: 4 MDX posts × 3 locales in `content/news/{locale}/{slug}.mdx`,
  loaded by `src/lib/posts.ts` (gray-matter + frontmatter validation),
  rendered with `next-mdx-remote/rsc`.

## Phase 4 — Pages ✅

Home, Studio, Artists (+ `[slug]` profiles with per-artist work), Portfolio
(client-side style filter, pre-localized view models), News (+ `[slug]`),
Booking, FAQ/Pricing, localized 404 (`not-found.tsx` + `[...rest]` catch-all).

## Phase 5 — Forms + cookie consent ✅

- Booking: one zod schema (`src/lib/booking.ts`) shared by client form and
  `POST /api/booking`. Error messages are i18n keys resolved at display time.
  Delivery via Resend when `RESEND_API_KEY` is set, else `.bookings/inbox.ndjson`.
  Honeypot field returns fake 200 and drops the payload. Success/error/
  submitting states all implemented; error summary receives focus.
- Consent: cookie `cr-consent` (182 days) is the source of truth, read via
  `useSyncExternalStore`. Banner hidden until hydration (no flash), reopenable
  from footer. `AnalyticsGate` mounts the analytics `<Script>` ONLY when
  consent === "accepted" and `NEXT_PUBLIC_ANALYTICS_SRC` is set.

## Phase 6 — Polish + accessibility ✅

- Verified: `/` → 307 → `/mk`; `<html lang>` mk/en/sq; unknown routes return
  real HTTP 404; API returns i18n error keys for every failure path;
  honeypot drops silently; no analytics markup without consent.
- Removed root `loading.tsx` deliberately: it made routes stream, which
  committed HTTP 200 before `notFound()` could set 404. Site is fully
  prerendered, so a route spinner bought nothing.
- Lint clean (includes React-compiler rules: consent uses
  useSyncExternalStore, header menu closes via render-time state adjustment).
- Contrast checked: bone-500 on ink-950 ≈ 6.3:1, blood-300 ≈ 5.8:1 (AA).

## Decisions worth remembering

- **No CMS** on purpose: content = typed TS modules + MDX. Right size for a
  five-page site; edit files, not admin panels.
- Portfolio filter state is `useState`, not URL params — filters aren't share-
  worthy here; revisit only if the client asks for deep-linking.
- `pricing.large-project` has a textual price ("per session"), which is why
  `price` is `Localized`, not a number.

## Next (if picked up again)

- Real photography → replace Sigil tiles inside `ArtworkTile`/portraits.
- `sitemap.ts` + hreflang alternates metadata.
- Rate-limit `/api/booking` (e.g. Upstash) before real launch.
- E2E happy path with Playwright.
