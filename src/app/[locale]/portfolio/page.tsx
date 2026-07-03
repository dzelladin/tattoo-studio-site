import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getArtist } from "@/content/artists";
import { GALLERY } from "@/content/gallery";
import { STYLES } from "@/content/styles";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
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
    image: item.image,
    alt: item.alt[locale],
  }));

  const styles = STYLES.map((s) => ({ id: s.id, label: s.label[locale] }));

  return (
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} lede={t("lede")} />
      <Section>
        <GalleryGrid items={items} styles={styles} />
      </Section>
    </>
  );
}
