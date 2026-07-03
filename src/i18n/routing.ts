import { defineRouting } from "next-intl/routing";

// "al" is used as the URL prefix per the site spec; the <html lang> attribute
// maps it to the correct ISO code "sq" (see LocaleLayout).
export const routing = defineRouting({
  locales: ["mk", "en", "al"],
  defaultLocale: "mk",
});

export type Locale = (typeof routing.locales)[number];

/** Per-locale strings for structured content (artists, gallery, FAQ …). */
export type Localized = Record<Locale, string>;
