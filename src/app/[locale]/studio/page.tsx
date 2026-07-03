import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Kicker, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Sigil } from "@/components/ui/Sigil";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "studio" });
  return { title: t("title"), description: t("lede") };
}

export default async function StudioPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "studio" });

  const steps = [1, 2, 3, 4] as const;

  return (
    <>
      <Section className="border-b border-ink-800">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <Kicker>{t("kicker")}</Kicker>
            <h1 className="mt-4 font-display text-4xl leading-tight font-bold text-balance sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-bone-300">
              {t("lede")}
            </p>
          </div>
          <div aria-hidden className="hidden h-64 w-64 opacity-50 lg:block">
            <Sigil seed="studio-page" accent />
          </div>
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeading kicker={t("kicker")} title={t("philosophyTitle")} />
        </Reveal>
        <div className="mt-8 grid max-w-4xl gap-6 text-base leading-relaxed text-bone-300">
          <Reveal>
            <p>{t("philosophyBody1")}</p>
          </Reveal>
          <Reveal>
            <p>{t("philosophyBody2")}</p>
          </Reveal>
          <Reveal>
            <p>{t("philosophyBody3")}</p>
          </Reveal>
        </div>
      </Section>

      <Section className="border-t border-ink-800">
        <Reveal>
          <SectionHeading kicker={t("kicker")} title={t("processTitle")} />
        </Reveal>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((n, i) => (
            <li key={n}>
              <Reveal delay={i * 100} className="h-full">
                <div className="flex h-full flex-col border border-ink-800 bg-ink-900 p-6">
                  <span
                    aria-hidden
                    className="font-mono text-sm text-blood-300"
                  >
                    0{n}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold">
                    {t(`process${n}Title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-bone-300">
                    {t(`process${n}Body`)}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="border-t border-ink-800">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              kicker={t("kicker")}
              title={t("spaceTitle")}
              lede={t("spaceBody")}
            />
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              kicker={t("kicker")}
              title={t("hygieneTitle")}
              lede={t("hygieneBody")}
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
