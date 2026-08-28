import { MoveRight } from "lucide-react";
import { SectionLabel } from "./shared";
import { Blog } from "@/generated/prisma/client";
import { formatDate } from "@/lib/utils";

export default function BlogSection({ blogs }: { blogs: Blog[] }) {
  return (
    <section
      id="blogs"
      className="scroll-mt-20 bg-ink py-20 text-paper lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <SectionLabel dark>From our journal</SectionLabel>
            <h2 className="font-serif text-4xl sm:text-5xl">
              Ideas for <span className="text-bronze">better places.</span>
            </h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {blogs.map((blog) => (
            <a
              href="#contact"
              key={blog.title}
              className="group relative min-h-72 overflow-hidden border border-paper/15"
            >
              <img
                src={blog.coverImage}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-700 group-hover:scale-105 group-hover:opacity-75"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="text-[9px] uppercase tracking-widest text-bronze">
                  {formatDate(blog.createdAt)}
                </span>
                <h3 className="mt-2 font-serif text-2xl">{blog.title}</h3>
                <span className="mt-5 inline-flex items-center gap-2 text-[9px] uppercase tracking-widest">
                  Read article <MoveRight size={13} className="text-bronze" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
