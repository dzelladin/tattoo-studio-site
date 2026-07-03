import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JetBrains_Mono, Manrope, Unbounded } from "next/font/google";
import { AnalyticsGate } from "@/components/consent/AnalyticsGate";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { CookieBanner } from "@/components/consent/CookieBanner";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

const display = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
});
const sans = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
});
const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains",
});

// The /al prefix is a site-spec requirement; Albanian's ISO 639-1 code is "sq".
const HTML_LANG: Record<Locale, string> = { mk: "mk", en: "en", al: "sq" };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: {
      default: t("title"),
      template: `%s — Obsidian Ink`,
    },
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <html
      lang={HTML_LANG[locale]}
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider>
          <ConsentProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-bone-100 focus:px-4 focus:py-2 focus:text-sm focus:text-ink-950"
            >
              {t("skipToContent")}
            </a>
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
            <CookieBanner />
            <AnalyticsGate />
          </ConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
