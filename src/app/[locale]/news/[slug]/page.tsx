import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getFormatter,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getArtist } from "@/content/artists";
import { getPost, getPosts } from "@/lib/posts";
import { Section } from "@/components/ui/Section";

export async function generateStaticParams() {
  const params = [];
  for (const locale of routing.locales) {
    const posts = await getPosts(locale);
    params.push(...posts.map((post) => ({ locale, slug: post.slug })));
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(locale, slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getPost(locale, slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "news" });
  const format = await getFormatter({ locale });
  const author = getArtist(post.author);

  return (
    <Section>
      <article className="mx-auto max-w-2xl">
        <Link
          href="/news"
          className="font-mono text-xs tracking-widest text-bone-500 uppercase transition-colors hover:text-bone-100"
        >
          ← {t("backToNews")}
        </Link>

        <header className="mt-10">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-xs text-bone-500">
            <time dateTime={post.date}>
              {format.dateTime(new Date(post.date), {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {author ? (
              <Link
                href={`/artists/${author.slug}`}
                className="text-blood-300 transition-colors hover:text-bone-100"
              >
                {t("byAuthor", { name: author.name })}
              </Link>
            ) : null}
          </div>
          <h1 className="mt-4 font-display text-3xl leading-tight font-bold text-balance sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-bone-300">
            {post.excerpt}
          </p>
        </header>

        <div
          className="prose-invert mt-10 space-y-5 leading-relaxed text-bone-300
            [&_em]:text-bone-100 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl
            [&_h2]:font-semibold [&_h2]:text-bone-100 [&_strong]:text-bone-100"
        >
          <MDXRemote source={post.body} />
        </div>
      </article>
    </Section>
  );
}
