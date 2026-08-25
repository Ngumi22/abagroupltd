import { BlogForm } from "@/components/admin/blogs/blog-form";
import AdminPageFrame from "@/components/admin/pages/AdminPageFrame";
import { createBlog } from "@/lib/actions/blog";

export default function NewBlogPage() {
  return (
    <AdminPageFrame
      eyebrow="Content"
      title="New post"
      description="Write a new article for the public site."
    >
      <BlogForm action={createBlog} />
    </AdminPageFrame>
  );
}
