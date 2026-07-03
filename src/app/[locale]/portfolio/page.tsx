import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getArtist } from "@/content/artists";
import { GALLERY } from "@/content/gallery";
import { STYLES } from "@/content/styles";
import { Kicker, Section } from "@/components/ui/Section";
import { GalleryGrid } from "@/components/work/GalleryGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });
  return { title: t("title"), description: t("lede") };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "portfolio" });

  // Localize once on the server; the filterable grid only ships strings
  // for the active locale.
  const items = GALLERY.map((item) => ({
    id: item.id,
    title: item.title[locale],
    artistName: getArtist(item.artistSlug)?.name ?? item.artistSlug,
    styles: [...item.styles],
    styleLabels: item.styles.map(
      (id) => STYLES.find((s) => s.id === id)!.label[locale],
    ),
    placement: item.placement[locale],
    year: item.year,
    alt: item.alt[locale],
  }));

  const styles = STYLES.map((s) => ({ id: s.id, label: s.label[locale] }));

  return (
    <Section>
      <Kicker>{t("kicker")}</Kicker>
      <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight font-bold text-balance sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone-300">
        {t("lede")}
      </p>

      <GalleryGrid items={items} styles={styles} />
    </Section>
  );
}
