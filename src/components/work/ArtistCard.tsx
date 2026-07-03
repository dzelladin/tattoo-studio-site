import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Artist } from "@/content/artists";
import { styleLabel } from "@/content/styles";
import { Sigil } from "@/components/ui/Sigil";

export async function ArtistCard({
  artist,
  locale,
}: {
  artist: Artist;
  locale: Locale;
}) {
  const t = await getTranslations({ locale, namespace: "artists" });

  return (
    <Link
      href={`/artists/${artist.slug}`}
      className="group block border border-ink-800 bg-ink-900 p-6 transition-colors hover:border-ink-700"
    >
      <div
        role="img"
        aria-label={artist.portraitAlt[locale]}
        className="mx-auto h-36 w-36"
      >
        <Sigil
          seed={artist.sigilSeed}
          accent
          className="transition-transform duration-500 ease-out group-hover:rotate-6"
        />
      </div>
      <h3 className="mt-6 font-display text-lg font-semibold">{artist.name}</h3>
      <p className="mt-1 text-sm text-bone-500">{artist.role[locale]}</p>
      <p className="mt-3 font-mono text-xs tracking-widest text-bone-300 uppercase">
        {artist.specialties.map((s) => styleLabel(s, locale)).join(" · ")}
      </p>
      <p className="mt-5 text-sm text-blood-300">{t("viewProfile")} →</p>
    </Link>
  );
}
