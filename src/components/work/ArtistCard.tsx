import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Artist } from "@/content/artists";
import { styleLabel } from "@/content/styles";

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
      className="group block border border-ink-800 bg-ink-900 transition-colors hover:border-ink-700"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={artist.portrait}
          alt={artist.portraitAlt[locale]}
          fill
          sizes="(min-width: 640px) 30vw, 90vw"
          className="object-cover grayscale transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-lg font-semibold">{artist.name}</h3>
        <p className="mt-1 text-sm text-bone-500">{artist.role[locale]}</p>
        <p className="mt-3 font-mono text-xs tracking-widest text-bone-300 uppercase">
          {artist.specialties.map((s) => styleLabel(s, locale)).join(" · ")}
        </p>
        <p className="mt-5 text-sm text-blood-300">{t("viewProfile")} →</p>
      </div>
    </Link>
  );
}
