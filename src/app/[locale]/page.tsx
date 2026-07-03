import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { ARTISTS } from "@/content/artists";
import { GALLERY } from "@/content/gallery";
import { getArtist } from "@/content/artists";
import { getPosts } from "@/lib/posts";
import { ButtonLink } from "@/components/ui/Button";
import { Kicker, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Sigil } from "@/components/ui/Sigil";
import { ArtistCard } from "@/components/work/ArtistCard";
import { ArtworkTile } from "@/components/work/ArtworkTile";
import { PostCard } from "@/components/news/PostCard";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });
  const featured = GALLERY.slice(0, 6);
  const posts = (await getPosts(locale)).slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-800">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-[34rem] w-[34rem] opacity-25 sm:opacity-40"
        >
          <Sigil seed="obsidian-ink-hero" accent />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-36">
          <Kicker>{t("heroKicker")}</Kicker>
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.1] font-bold text-balance sm:text-6xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-bone-300">
            {t("heroLede")}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/booking">{t("heroCtaPrimary")}</ButtonLink>
            <ButtonLink href="/portfolio" variant="outline">
              {t("heroCtaSecondary")}
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Studio teaser */}
      <Section>
        <Reveal>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <SectionHeading
              kicker={t("studioKicker")}
              title={t("studioTitle")}
              lede={t("studioBody")}
            />
            <div className="lg:justify-self-end">
              <Link
                href="/studio"
                className="font-mono text-sm tracking-widest text-blood-300 uppercase transition-colors hover:text-bone-100"
              >
                {t("studioLink")} →
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Selected work */}
      <Section className="border-t border-ink-800">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading kicker={t("workKicker")} title={t("workTitle")} />
            <Link
              href="/portfolio"
              className="font-mono text-sm tracking-widest text-blood-300 uppercase transition-colors hover:text-bone-100"
            >
              {t("workLink")} →
            </Link>
          </div>
        </Reveal>
        <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {featured.map((item, i) => (
            <li key={item.id} className="group">
              <Reveal delay={(i % 3) * 80}>
                <ArtworkTile image={item.image} alt={item.alt[locale]} />
                <p className="mt-3 text-sm font-semibold">{item.title[locale]}</p>
                <p className="mt-0.5 text-xs text-bone-500">
                  {getArtist(item.artistSlug)?.name} · {item.year}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* Artists */}
      <Section className="border-t border-ink-800">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              kicker={t("artistsKicker")}
              title={t("artistsTitle")}
            />
            <Link
              href="/artists"
              className="font-mono text-sm tracking-widest text-blood-300 uppercase transition-colors hover:text-bone-100"
            >
              {t("artistsLink")} →
            </Link>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {ARTISTS.map((artist, i) => (
            <Reveal key={artist.slug} delay={i * 100}>
              <ArtistCard artist={artist} locale={locale} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Journal */}
      <Section className="border-t border-ink-800">
        <Reveal>
          <SectionHeading kicker={t("newsKicker")} title={t("newsTitle")} />
        </Reveal>
        <div className="mt-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
        <Link
          href="/news"
          className="mt-4 inline-block font-mono text-sm tracking-widest text-blood-300 uppercase transition-colors hover:text-bone-100"
        >
          {t("newsLink")} →
        </Link>
      </Section>

      {/* CTA band */}
      <Section className="border-t border-ink-800 bg-ink-900">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold text-balance sm:text-4xl">
              {t("visitTitle")}
            </h2>
            <p className="mt-5 leading-relaxed text-bone-300">{t("visitBody")}</p>
            <ButtonLink href="/booking" className="mt-8">
              {t("visitCta")}
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
