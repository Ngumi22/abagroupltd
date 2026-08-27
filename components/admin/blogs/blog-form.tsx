"use client";

import { useActionState, useState } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import type { Blog } from "@/generated/prisma/client";
import type { BlogActionState } from "@/lib/actions/blog";
import { ImageUploader } from "../upload/image-uploader";
import { TiptapEditor } from "./tiptap-editor";

const initialState: BlogActionState = { status: "idle" };
const inputClass =
  "mt-1 w-full border-b border-ink/30 bg-transparent py-2 text-sm outline-none placeholder:text-ink/40";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface BlogFormProps {
  action: (
    state: BlogActionState,
    formData: FormData,
  ) => Promise<BlogActionState>;
  blog?: Blog;
}

export function BlogForm({ action, blog }: BlogFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [title, setTitle] = useState(blog?.title ?? "");
  const [slug, setSlug] = useState(blog?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(blog));
  const [content, setContent] = useState(blog?.content ?? "");
  const [metaTitle, setMetaTitle] = useState(blog?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(
    blog?.metaDescription ?? "",
  );
  const [coverImage, setCoverImage] = useState(blog?.coverImage ?? "");

  const errors = state.fieldErrors ?? {};

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  return (
    <form action={formAction} className="grid gap-5">
      <div className="grid gap-5 border border-ink/20 bg-white/40 p-6 sm:grid-cols-2">
        <Field label="Title" error={errors.title} className="sm:col-span-2">
          <input
            required
            name="title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className={inputClass}
            placeholder="Designing for Kenya's climate"
          />
        </Field>

        <Field label="Slug" error={errors.slug}>
          <input
            required
            name="slug"
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(slugify(e.target.value));
            }}
            className={inputClass}
            placeholder="designing-for-kenyas-climate"
          />
        </Field>

        <Field
          label="Cover image"
          error={errors.coverImage}
          className="sm:col-span-2"
        >
          <ImageUploader
            value={coverImage}
            onChange={setCoverImage}
            folder="/blog/covers"
            label="cover image"
            resource="blog"
          />
          <input type="hidden" name="coverImage" value={coverImage} />
        </Field>

        <Field label="Excerpt" error={errors.excerpt} className="sm:col-span-2">
          <textarea
            required
            name="excerpt"
            rows={2}
            defaultValue={blog?.excerpt}
            className={`${inputClass} resize-none`}
            placeholder="A short summary shown on the blog listing."
          />
        </Field>

        <Field
          label="Tags (comma separated)"
          error={errors.tags}
          className="sm:col-span-2"
        >
          <input
            name="tags"
            defaultValue={blog?.tags.join(", ")}
            className={inputClass}
            placeholder="Sustainability, Materials, Nairobi"
          />
        </Field>
      </div>

      <div className="border border-ink/20 bg-white/40 p-6">
        <p className="text-[10px] uppercase tracking-widest">
          Content{" "}
          <span className="text-ink/40">
            — use the toolbar to add images and tables
          </span>
        </p>

        <div className="mt-3">
          <TiptapEditor
            content={content}
            onChange={setContent}
            resource={"blog"}
          />
        </div>
        <input type="hidden" name="content" value={content} />

        {errors.content && (
          <p className="mt-1 text-[11px] text-red-700">{errors.content}</p>
        )}
      </div>

      <div className="border border-ink/20 bg-white/40 p-6">
        <p className="text-[10px] uppercase tracking-widest">SEO</p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field
            label={`Meta title (${metaTitle.length}/60)`}
            error={errors.metaTitle}
          >
            <input
              name="metaTitle"
              maxLength={60}
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className={inputClass}
              placeholder="Defaults to the post title if left blank"
            />
          </Field>
          <Field
            label={`Meta description (${metaDescription.length}/160)`}
            error={errors.metaDescription}
          >
            <input
              name="metaDescription"
              maxLength={160}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className={inputClass}
              placeholder="Defaults to the excerpt if left blank"
            />
          </Field>
        </div>
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="text-xs text-red-700">
          {state.message}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          name="intent"
          value="publish"
          disabled={isPending}
          className="inline-flex items-center gap-3 border border-ink bg-ink px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-paper transition hover:bg-ink-soft disabled:opacity-60"
        >
          {isPending ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <>
              Publish <ArrowUpRight size={15} />
            </>
          )}
        </button>
        <button
          type="submit"
          name="intent"
          value="draft"
          disabled={isPending}
          className="border border-ink/30 px-5 py-3 text-[10px] uppercase tracking-widest disabled:opacity-60"
        >
          Save as draft
        </button>
        {blog?.status === "PUBLISHED" && (
          <button
            type="submit"
            name="intent"
            value="unpublish"
            disabled={isPending}
            className="text-[10px] uppercase tracking-widest text-ink/50 hover:text-ink"
          >
            Unpublish
          </button>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label
      className={`text-[10px] uppercase tracking-widest ${className ?? ""}`}
    >
      {label}
      {children}
      {error && (
        <p className="mt-1 text-[11px] normal-case tracking-normal text-red-700">
          {error}
        </p>
      )}
    </label>
  );
}
