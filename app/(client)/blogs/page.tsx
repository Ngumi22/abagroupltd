import type { Metadata } from "next";
import { MoveRight } from "lucide-react";
import { blogs } from "@/lib/data";
import { SectionLabel } from "@/components/site/shared";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blogs | Aba Group Ltd",
  description:
    "Ideas, insights, and updates on building better places in Kenya from the Aba Group Ltd team.",
  alternates: { canonical: "/blogs" },
};

export default function BlogsPage() {
  return (
    <main className="bg-paper px-5 pb-20 pt-28 text-ink sm:pt-32 lg:px-10 lg:pb-28">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>From our journal</SectionLabel>
        <h1 className="max-w-3xl font-serif text-5xl leading-tight sm:text-7xl">
          Ideas for{" "}
          <em className="text-bronze-dark not-italic">better places.</em>
        </h1>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {blogs.map((blog) => (
            <Link
              href={`/blogs/${blog.title}`}
              key={blog.title}
              className="group relative min-h-72 overflow-hidden border border-ink/10"
            >
              <Image
                src={blog.image}
                alt=""
                height={400}
                width={400}
                priority
                className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-paper">
                <span className="text-[9px] uppercase tracking-widest text-bronze">
                  {blog.date}
                </span>
                <h3 className="mt-2 font-serif text-2xl">{blog.title}</h3>
                <span className="mt-5 inline-flex items-center gap-2 text-[9px] uppercase tracking-widest">
                  Read article <MoveRight size={13} className="text-bronze" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
