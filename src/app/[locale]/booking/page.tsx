import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { ARTISTS } from "@/content/artists";
import { Kicker, Section } from "@/components/ui/Section";
import { BookingForm } from "@/components/booking/BookingForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "booking" });
  return { title: t("title"), description: t("lede") };
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "booking" });
  const tFooter = await getTranslations({ locale, namespace: "footer" });

  const artistOptions = ARTISTS.map((a) => ({ slug: a.slug, name: a.name }));

  return (
    <Section>
      <Kicker>{t("kicker")}</Kicker>
      <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight font-bold text-balance sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone-300">
        {t("lede")}
      </p>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_20rem]">
        <div className="relative">
          <BookingForm artists={artistOptions} />
        </div>

        <aside className="space-y-8 lg:border-l lg:border-ink-800 lg:pl-10">
          <div>
            <h2 className="font-mono text-xs tracking-kicker text-bone-500 uppercase">
              {t("aside.title")}
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-bone-300">
              <li className="flex gap-3">
                <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-blood-500" />
                {t("aside.point1")}
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-blood-500" />
                {t("aside.point2")}
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-blood-500" />
                {t("aside.point3")}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-xs tracking-kicker text-bone-500 uppercase">
              {t("aside.visitTitle")}
            </h2>
            <address className="mt-3 text-sm leading-relaxed text-bone-300 not-italic">
              {tFooter("addressLine1")}
              <br />
              {tFooter("addressLine2")}
            </address>
          </div>

          <div>
            <h2 className="font-mono text-xs tracking-kicker text-bone-500 uppercase">
              {t("aside.hoursTitle")}
            </h2>
            <p className="mt-3 text-sm text-bone-300">{tFooter("hoursValue")}</p>
          </div>
        </aside>
      </div>
    </Section>
  );
}
