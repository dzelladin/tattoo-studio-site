import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { FAQ } from "@/content/faq";
import { PRICING } from "@/content/pricing";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  return { title: t("title"), description: t("lede") };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "faq" });

  return (
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} lede={t("lede")} />

      <Section pattern>
        <Reveal>
          <SectionHeading
            kicker={t("kicker")}
            title={t("pricingTitle")}
            lede={t("pricingNote")}
          />
        </Reveal>
        <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRICING.map((tier, i) => (
            <Reveal key={tier.id} delay={i * 80} className="h-full">
              <div className="flex h-full flex-col border border-ink-800 bg-linear-to-b from-ink-900 to-ink-950 p-6 shadow-[inset_0_1px_0_rgba(237,232,220,0.06)] transition-colors hover:border-ink-700">
                <dt className="font-display text-lg font-semibold">
                  {tier.name[locale]}
                </dt>
                <dd className="mt-2 flex flex-1 flex-col">
                  <span className="font-mono text-xl text-blood-300">
                    {tier.price[locale]}
                  </span>
                  <span className="mt-4 text-sm leading-relaxed text-bone-300">
                    {tier.description[locale]}
                  </span>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Section>

      <Section className="border-t border-ink-800">
        <Reveal>
          <SectionHeading kicker={t("kicker")} title={t("faqTitle")} />
        </Reveal>
        <div className="mt-10 max-w-3xl">
          {FAQ.map((item) => (
            <details
              key={item.id}
              className="group border-b border-ink-800 py-2"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 text-left font-semibold text-bone-100 marker:content-none [&::-webkit-details-marker]:hidden">
                {item.question[locale]}
                <span
                  aria-hidden
                  className="shrink-0 font-mono text-blood-300 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="pb-5 text-sm leading-relaxed text-bone-300">
                {item.answer[locale]}
              </p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}
