import Link from "next/link";
import { Pencil, Plus } from "lucide-react";

import { getAllBlogsForAdmin } from "@/lib/data/blogs";
import { DeleteIconButton } from "@/components/admin/settings/delete-icon-button";

import AdminPageFrame from "@/components/admin/pages/AdminPageFrame";
import { deleteBlog } from "@/lib/actions/blog";

export default async function AdminBlogsPage() {
  const blogs = await getAllBlogsForAdmin();

  return (
    <AdminPageFrame
      eyebrow="Content"
      title="Blog"
      description="Write and publish articles for the public site."
      action={
        <Link
          href="/admin/blogs/new"
          className="flex items-center gap-2 bg-ink px-4 py-3 text-[10px] uppercase tracking-widest text-paper"
        >
          <Plus size={15} /> New post
        </Link>
      }
    >
      <div className="border border-ink/10 bg-white/40">
        <ul className="divide-y divide-ink/10">
          {blogs.map((blog) => (
            <li
              key={blog.id}
              className="flex items-center justify-between gap-3 p-5"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium">{blog.title}</p>
                  <span
                    className={`shrink-0 text-[10px] uppercase tracking-widest ${
                      blog.status === "PUBLISHED"
                        ? "text-bronze-dark"
                        : "text-ink/40"
                    }`}
                  >
                    {blog.status === "PUBLISHED" ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="mt-1 truncate text-xs text-ink/50">
                  {blog.excerpt}
                </p>
                <p className="mt-0.5 text-[10px] uppercase tracking-widest text-ink/40">
                  By {blog.author?.name ?? "Aba Group"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/blogs/${blog.id}/edit`}
                  aria-label="Edit"
                  className="text-ink/40 transition hover:text-ink"
                >
                  <Pencil size={16} />
                </Link>
                <DeleteIconButton
                  onDelete={deleteBlog.bind(null, blog.id)}
                  confirmMessage={`Delete "${blog.title}"?`}
                />
              </div>
            </li>
          ))}
        </ul>
        {blogs.length === 0 && (
          <p className="p-8 text-center text-sm text-ink/50">No posts yet.</p>
        )}
      </div>
    </AdminPageFrame>
  );
}
