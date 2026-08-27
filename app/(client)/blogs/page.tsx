import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPublishedBlogs } from "@/lib/data/blogs";
import { SITE } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blogs | Aba Group Ltd",
  description: `Ideas, insights, and updates on building better places in Kenya from the from ${SITE.shortName} team.`,
  alternates: { canonical: "/blogs" },
};

export default async function BlogsPage() {
  const blogs = await getPublishedBlogs();

  return (
    <main className="bg-ink px-5 pb-20 pt-28 text-paper sm:pt-32 lg:px-10 lg:pb-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[.16em] text-bronze-dark">
          Insights
        </p>
        <h1 className="mt-3 font-serif text-5xl leading-none sm:text-6xl">
          From the studio.
        </h1>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blogs/${blog.slug}`}
              className="group"
            >
              <div className="relative aspect-16/10 w-full overflow-hidden">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-[10px] uppercase tracking-widest text-bronze-dark">
                {blog.publishedAt ? formatDate(blog.publishedAt) : ""}
              </p>
              <h2 className="mt-2 font-serif text-2xl leading-tight">
                {blog.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-ink/60">
                {blog.excerpt}
              </p>
            </Link>
          ))}
        </div>

        {blogs.length === 0 && (
          <p className="mt-12 text-sm text-ink/50">No posts published yet.</p>
        )}
      </div>
    </main>
  );
}
