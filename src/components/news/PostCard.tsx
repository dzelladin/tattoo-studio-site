import { getFormatter, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getArtist } from "@/content/artists";
import type { PostMeta } from "@/lib/posts";

export async function PostCard({
  post,
  locale,
}: {
  post: PostMeta;
  locale: Locale;
}) {
  const t = await getTranslations({ locale, namespace: "news" });
  const format = await getFormatter({ locale });
  const author = getArtist(post.author);

  return (
    <article className="group border-t border-ink-800 py-8">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-xs text-bone-500">
        <time dateTime={post.date}>
          {format.dateTime(new Date(post.date), {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        {author ? <span>{t("byAuthor", { name: author.name })}</span> : null}
      </div>
      <h3 className="mt-3 font-display text-xl font-semibold">
        <Link
          href={`/news/${post.slug}`}
          className="transition-colors group-hover:text-blood-300"
        >
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-bone-300">
        {post.excerpt}
      </p>
      <p className="mt-4 font-mono text-xs tracking-widest text-blood-300 uppercase">
        {t("readEntry")} →
      </p>
    </article>
  );
}
