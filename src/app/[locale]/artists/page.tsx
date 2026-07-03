import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { ARTISTS } from "@/content/artists";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
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
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} lede={t("lede")} />
      <Section>
        <div className="grid gap-6 sm:grid-cols-3">
          {ARTISTS.map((artist, i) => (
            <Reveal key={artist.slug} delay={i * 100}>
              <ArtistCard artist={artist} locale={locale} index={i + 1} />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
