import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/i18n/routing";

export interface PostMeta {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  excerpt: string;
  /** Artist slug — resolved against src/content/artists.ts. */
  author: string;
}

export interface Post extends PostMeta {
  /** Raw MDX body, compiled by next-mdx-remote at render time. */
  body: string;
}

const NEWS_DIR = path.join(process.cwd(), "content", "news");

function assertMeta(
  data: Record<string, unknown>,
  file: string,
): asserts data is Omit<PostMeta, "slug"> & Record<string, unknown> {
  for (const field of ["title", "date", "excerpt", "author"] as const) {
    if (typeof data[field] !== "string" || data[field] === "") {
      throw new Error(`Post ${file} is missing frontmatter field "${field}"`);
    }
  }
}

export async function getPosts(locale: Locale): Promise<PostMeta[]> {
  const dir = path.join(NEWS_DIR, locale);
  const files = (await fs.readdir(dir)).filter((f) => f.endsWith(".mdx"));

  const posts = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(dir, file), "utf8");
      const { data } = matter(raw);
      assertMeta(data, file);
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        author: data.author,
      };
    }),
  );

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(
  locale: Locale,
  slug: string,
): Promise<Post | null> {
  // Guard against path traversal in the [slug] segment.
  if (!/^[a-z0-9-]+$/.test(slug)) return null;

  const file = path.join(NEWS_DIR, locale, `${slug}.mdx`);
  let raw: string;
  try {
    raw = await fs.readFile(file, "utf8");
  } catch {
    return null;
  }

  const { data, content } = matter(raw);
  assertMeta(data, file);
  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    author: data.author,
    body: content,
  };
}
