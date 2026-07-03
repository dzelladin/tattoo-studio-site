import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { ARTISTS, getArtist } from "@/content/artists";
import { galleryByArtist } from "@/content/gallery";
import { styleLabel } from "@/content/styles";
import { ButtonLink } from "@/components/ui/Button";
import { Kicker, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ArtworkTile } from "@/components/work/ArtworkTile";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    ARTISTS.map((artist) => ({ locale, slug: artist.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const artist = getArtist(slug);
  if (!artist) return {};
  return { title: artist.name, description: artist.bio[locale] };
}

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const artist = getArtist(slug);
  if (!artist) notFound();

  const t = await getTranslations({ locale, namespace: "artists" });
  const works = galleryByArtist(artist.slug);

  return (
    <>
      <Section className="border-b border-ink-800">
        <Link
          href="/artists"
          className="font-mono text-xs tracking-widest text-bone-500 uppercase transition-colors hover:text-bone-100"
        >
          ← {t("backToArtists")}
        </Link>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[auto_1fr]">
          <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden border border-ink-800 bg-ink-900 lg:w-64">
            <Image
              src={artist.portrait}
              alt={artist.portraitAlt[locale]}
              fill
              sizes="(min-width: 1024px) 256px, 320px"
              className="object-cover grayscale"
            />
          </div>

          <div className="max-w-2xl">
            <Kicker>{artist.role[locale]}</Kicker>
            <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
              {artist.name}
            </h1>
            <p className="mt-4 font-mono text-xs tracking-widest text-bone-500 uppercase">
              {t("since", { year: artist.since })} ·{" "}
              {artist.specialties
                .map((s) => styleLabel(s, locale))
                .join(" · ")}
            </p>
            <p className="mt-6 leading-relaxed text-bone-300">
              {artist.bio[locale]}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <ButtonLink href="/booking">
                {t("bookWith", { name: artist.name.split(" ")[0] })}
              </ButtonLink>
              <a
                href={`https://instagram.com/${artist.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-bone-300 transition-colors hover:text-bone-100"
              >
                <span className="sr-only">{t("instagramLabel")}: </span>@
                {artist.instagram}
              </a>
            </div>
          </div>
        </div>
      </Section>

      {works.length > 0 ? (
        <Section>
          <h2 className="font-display text-2xl font-semibold">
            {t("worksTitle")}
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {works.map((item, i) => (
              <li key={item.id} className="group">
                <Reveal delay={(i % 3) * 80}>
                  <ArtworkTile image={item.image} alt={item.alt[locale]} />
                  <p className="mt-3 text-sm font-semibold">
                    {item.title[locale]}
                  </p>
                  <p className="mt-0.5 text-xs text-bone-500">
                    {item.placement[locale]} · {item.year}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </>
  );
}
