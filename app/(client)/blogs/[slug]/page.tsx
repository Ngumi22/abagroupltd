import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPublishedBlogBySlug } from "@/lib/data/blogs";
import { SITE } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getPublishedBlogBySlug(slug);
  if (!blog) return {};

  const title = blog.metaTitle || blog.title;
  const description = blog.metaDescription || blog.excerpt;
  const url = `${SITE.siteUrl}/blogs/${blog.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: blog.publishedAt
        ? formatDate(blog.publishedAt)
        : undefined,
      images: [{ url: blog.coverImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [blog.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blog = await getPublishedBlogBySlug(slug);
  if (!blog) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.coverImage,
    datePublished: blog.publishedAt ? formatDate(blog.publishedAt) : undefined,
    dateModified: formatDate(blog.updatedAt),
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
  };

  return (
    <main className="bg-paper px-5 pb-20 pt-28 text-ink sm:pt-32 lg:px-10 lg:pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[.16em] text-bronze-dark">
          {blog.publishedAt ? formatDate(blog.publishedAt) : ""}
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
          {blog.title}
        </h1>

        <div className="relative mt-8 aspect-video w-full overflow-hidden">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div
          className="tiptap prose prose-lg mt-10 max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {blog.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-ink/10 pt-6">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="border border-ink/15 px-3 py-1 text-[10px] uppercase tracking-widest text-ink/60"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </main>
  );
}
