import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { ARTISTS, getArtist } from "@/content/artists";
import { GALLERY } from "@/content/gallery";
import { STYLES } from "@/content/styles";
import { getPosts } from "@/lib/posts";
import { ButtonLink } from "@/components/ui/Button";
import { Kicker, Section, SectionHeading } from "@/components/ui/Section";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { Sigil } from "@/components/ui/Sigil";
import { ArtistCard } from "@/components/work/ArtistCard";
import { ArtworkTile } from "@/components/work/ArtworkTile";
import { PostCard } from "@/components/news/PostCard";
import { cn } from "@/lib/cn";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });
  const featured = GALLERY.slice(0, 5);
  const teaserImage = GALLERY.find((g) => g.id === "spine-ornament");
  const posts = (await getPosts(locale)).slice(0, 2);
  const marqueeItems = [
    ...STYLES.map((s) => s.label[locale]),
    t("heroKicker"),
  ];

  return (
    <>
      {/* Hero — full-bleed photo under a left-weighted scrim */}
      <section className="relative overflow-hidden border-b border-ink-800">
        <Image
          src="/images/gallery/bodysuit-back.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_18%] grayscale opacity-40"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-r from-ink-950 via-ink-950/75 to-ink-950/25"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-ink-950 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-[30rem] w-[30rem] opacity-20"
        >
          <Sigil seed="obsidian-ink-hero" accent />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-40">
          <Kicker>{t("heroKicker")}</Kicker>
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.08] font-bold text-balance sm:text-6xl lg:text-7xl">
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

      <Marquee items={marqueeItems} />

      {/* Studio teaser — copy beside an offset photo with a red corner */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <SectionHeading
              kicker={t("studioKicker")}
              title={t("studioTitle")}
              lede={t("studioBody")}
            />
            <Link
              href="/studio"
              className="mt-8 inline-block font-mono text-sm tracking-widest text-blood-300 uppercase transition-colors hover:text-bone-100"
            >
              {t("studioLink")} →
            </Link>
          </Reveal>
          {teaserImage ? (
            <Reveal delay={120}>
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden border border-ink-800">
                  <Image
                    src={teaserImage.image}
                    alt={teaserImage.alt[locale]}
                    fill
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    className="object-cover grayscale"
                  />
                </div>
                <div
                  aria-hidden
                  className="absolute -bottom-3 -left-3 h-20 w-20 border-b-2 border-l-2 border-blood-500"
                />
              </div>
            </Reveal>
          ) : null}
        </div>
      </Section>

      {/* Selected work — editorial mosaic, captions overlaid */}
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
        <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {featured.map((item, i) => (
            <li
              key={item.id}
              className={cn("group", i === 0 && "col-span-2 row-span-2")}
            >
              <Reveal delay={(i % 4) * 70} className="h-full">
                <div className="relative h-full">
                  <ArtworkTile
                    image={item.image}
                    alt={item.alt[locale]}
                    className="h-full"
                    sizes={
                      i === 0
                        ? "(min-width: 1024px) 560px, 90vw"
                        : "(min-width: 1024px) 270px, 45vw"
                    }
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-ink-950/95 via-ink-950/60 to-transparent p-4 pt-10">
                    <p className="text-sm font-semibold">{item.title[locale]}</p>
                    <p className="mt-0.5 text-xs text-bone-300">
                      {getArtist(item.artistSlug)?.name} · {item.year}
                    </p>
                  </div>
                </div>
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
              <ArtistCard artist={artist} locale={locale} index={i + 1} />
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

      {/* CTA band over a photo */}
      <section className="relative overflow-hidden border-t border-ink-800">
        <Image
          src="/images/gallery/marbled-sleeves.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[50%_30%] grayscale opacity-25"
        />
        <div aria-hidden className="absolute inset-0 bg-ink-950/55" />
        <div className="relative mx-auto max-w-2xl px-5 py-24 text-center sm:px-8 sm:py-32">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-balance sm:text-4xl">
              {t("visitTitle")}
            </h2>
            <p className="mt-5 leading-relaxed text-bone-300">{t("visitBody")}</p>
            <ButtonLink href="/booking" className="mt-8">
              {t("visitCta")}
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
