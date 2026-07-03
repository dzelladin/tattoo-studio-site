import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

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
      <PageHeader kicker={t("kicker")} title={t("title")} lede={t("lede")} />

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

      <div className="relative h-64 overflow-hidden border-y border-ink-800 sm:h-80">
        <Image
          src="/images/gallery/diamond-back.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[50%_25%] grayscale opacity-70"
        />
        <div aria-hidden className="absolute inset-0 bg-ink-950/30" />
      </div>

      <Section pattern>
        <Reveal>
          <SectionHeading kicker={t("kicker")} title={t("processTitle")} />
        </Reveal>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((n, i) => (
            <li key={n}>
              <Reveal delay={i * 100} className="h-full">
                <div className="flex h-full flex-col border border-ink-800 bg-linear-to-b from-ink-900 to-ink-950 p-6 shadow-[inset_0_1px_0_rgba(237,232,220,0.06)] transition-colors hover:border-ink-700">
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
