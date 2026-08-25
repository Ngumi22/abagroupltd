import { notFound } from "next/navigation";

import { BlogForm } from "@/components/admin/blogs/blog-form";
import { getBlogById } from "@/lib/data/blogs";
import { updateBlog } from "@/lib/actions/blog";
import AdminPageFrame from "@/components/admin/pages/AdminPageFrame";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await getBlogById(id);
  if (!blog) notFound();

  return (
    <AdminPageFrame
      eyebrow="Content"
      title="Edit post"
      description={blog.title}
    >
      <BlogForm action={updateBlog.bind(null, id)} blog={blog} />
    </AdminPageFrame>
  );
}
