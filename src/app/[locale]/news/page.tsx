import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getPosts } from "@/lib/posts";
import { Kicker, Section } from "@/components/ui/Section";
import { PostCard } from "@/components/news/PostCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });
  return { title: t("title"), description: t("lede") };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "news" });
  const posts = await getPosts(locale);

  return (
    <Section>
      <Kicker>{t("kicker")}</Kicker>
      <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight font-bold text-balance sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone-300">
        {t("lede")}
      </p>

      <div className="mt-14 border-b border-ink-800">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} locale={locale} />
        ))}
      </div>
    </Section>
  );
}
