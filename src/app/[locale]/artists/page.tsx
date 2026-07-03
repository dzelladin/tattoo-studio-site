import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { ARTISTS } from "@/content/artists";
import { Kicker, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ArtistCard } from "@/components/work/ArtistCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "artists" });
  return { title: t("title"), description: t("lede") };
}

export default async function ArtistsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "artists" });

  return (
    <Section>
      <Kicker>{t("kicker")}</Kicker>
      <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight font-bold text-balance sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone-300">
        {t("lede")}
      </p>

      <div className="mt-14 grid gap-6 text-center sm:grid-cols-3">
        {ARTISTS.map((artist, i) => (
          <Reveal key={artist.slug} delay={i * 100}>
            <ArtistCard artist={artist} locale={locale} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
