"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Loader2 } from "lucide-react";
import type { Project } from "@/generated/prisma/client";
import {
  createProject,
  updateProject,
  type ProjectActionState,
} from "@/lib/actions/projects";
import { ImageUploader } from "../upload/image-uploader";
import { GalleryUploader } from "../upload/gallery-uploader";
import type { ProjectFormData } from "@/lib/types";

const initialState: ProjectActionState = { status: "idle" };

const inputClass =
  "mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-sm outline-none placeholder:text-ink/40";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface DraftValues {
  name: string;
  slug: string;
  slugTouched: boolean;
  type: string;
  location: string;
  year: string;
  status: "Completed" | "In progress";
  summary: string;
  description: string;
  scope: string;
  progress: string;
  deliveryStatus: string;
  image: string;
  gallery: string[];
}

function emptyDraft(): DraftValues {
  return {
    name: "",
    slug: "",
    slugTouched: false,
    type: "",
    location: "",
    year: "",
    status: "In progress",
    summary: "",
    description: "",
    scope: "",
    progress: "",
    deliveryStatus: "",
    image: "",
    gallery: [],
  };
}

function draftFromProject(project: Project): DraftValues {
  return {
    name: project.name,
    slug: project.slug,
    slugTouched: true,
    type: project.type,
    location: project.location,
    year: String(project.year),
    status: project.status as "Completed" | "In progress",
    summary: project.summary,
    description: project.description,
    scope: project.scope.join("\n"),
    progress: project.progress != null ? String(project.progress) : "",
    deliveryStatus: project.deliveryStatus ?? "",
    image: project.image,
    gallery: project.gallery,
  };
}

export function ProjectForm({ project }: { project?: ProjectFormData }) {
  const router = useRouter();
  const isEditing = Boolean(project);
  const draftKey = project
    ? `project-form-draft:${project.id}`
    : "project-form-draft:new";

  const [state, formAction, isPending] = useActionState(
    isEditing ? updateProject : createProject,
    initialState,
  );

  const [draft, setDraft] = useState<DraftValues>(() =>
    project ? draftFromProject(project) : emptyDraft(),
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(false);
    try {
      const saved = window.localStorage.getItem(draftKey);
      if (saved) setDraft(JSON.parse(saved) as DraftValues);
    } catch {
    } finally {
      setHydrated(true);
    }
  }, [draftKey]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(draftKey, JSON.stringify(draft));
    } catch {}
  }, [draft, draftKey, hydrated]);

  useEffect(() => {
    return () => {
      try {
        window.localStorage.removeItem(draftKey);
      } catch {
        // ignore
      }
    };
  }, [draftKey]);

  function update<K extends keyof DraftValues>(key: K, value: DraftValues[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  function handleNameChange(value: string) {
    setDraft((prev) => ({
      ...prev,
      name: value,
      slug: prev.slugTouched ? prev.slug : slugify(value),
    }));
  }

  const errors = state.fieldErrors ?? {};

  return (
    <form
      action={formAction}
      className="grid gap-5 border border-ink/20 bg-white/40 p-6 sm:grid-cols-2"
    >
      {isEditing && project && (
        <input type="hidden" name="id" value={project.id} />
      )}

      <Field label="Project name" error={errors.name}>
        <input
          required
          name="name"
          value={draft.name}
          onChange={(e) => handleNameChange(e.target.value)}
          className={inputClass}
          placeholder="Kilimani House"
        />
      </Field>

      <Field label="Slug" error={errors.slug}>
        <input
          required
          name="slug"
          value={draft.slug}
          onChange={(e) => {
            update("slugTouched", true);
            update("slug", slugify(e.target.value));
          }}
          className={inputClass}
          placeholder="kilimani-house"
        />
      </Field>

      <Field label="Type" error={errors.type}>
        <input
          required
          name="type"
          value={draft.type}
          onChange={(e) => update("type", e.target.value)}
          className={inputClass}
          placeholder="Residential"
        />
      </Field>

      <Field label="Location" error={errors.location}>
        <input
          required
          name="location"
          value={draft.location}
          onChange={(e) => update("location", e.target.value)}
          className={inputClass}
          placeholder="Nairobi, Kenya"
        />
      </Field>

      <Field label="Year" error={errors.year}>
        <input
          required
          name="year"
          maxLength={4}
          value={draft.year}
          onChange={(e) => update("year", e.target.value)}
          className={inputClass}
          placeholder="2026"
        />
      </Field>

      <Field label="Status" error={errors.status}>
        <select
          required
          name="status"
          value={draft.status}
          onChange={(e) =>
            update("status", e.target.value as "Completed" | "In progress")
          }
          className={inputClass}
        >
          <option value="In progress">In progress</option>
          <option value="Completed">Completed</option>
        </select>
      </Field>

      <Field label="Cover image" error={errors.image} className="sm:col-span-2">
        <ImageUploader
          value={draft.image}
          onChange={(url) => update("image", url)}
          folder="/projects/covers"
          label="cover image"
          resource="project"
        />
        <input type="hidden" name="image" value={draft.image} />
      </Field>

      <Field
        label="Gallery images"
        error={errors.gallery}
        className="sm:col-span-2"
      >
        <GalleryUploader
          value={draft.gallery}
          onChange={(urls) => update("gallery", urls)}
          folder="/projects/gallery"
          resource="project"
        />
      </Field>

      <Field label="Summary" error={errors.summary} className="sm:col-span-2">
        <textarea
          required
          name="summary"
          rows={2}
          value={draft.summary}
          onChange={(e) => update("summary", e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </Field>

      <Field
        label="Description"
        error={errors.description}
        className="sm:col-span-2"
      >
        <textarea
          required
          name="description"
          rows={4}
          value={draft.description}
          onChange={(e) => update("description", e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </Field>

      <Field
        label="Scope (one item per line)"
        error={errors.scope}
        className="sm:col-span-2"
      >
        <textarea
          required
          name="scope"
          rows={3}
          value={draft.scope}
          onChange={(e) => update("scope", e.target.value)}
          className={`${inputClass} resize-none`}
          placeholder="Architecture & design"
        />
      </Field>

      {draft.status === "In progress" && (
        <>
          <Field label="Progress (%)" error={errors.progress}>
            <input
              name="progress"
              type="number"
              min={0}
              max={100}
              value={draft.progress}
              onChange={(e) => update("progress", e.target.value)}
              className={inputClass}
              placeholder="62"
            />
          </Field>
          <Field label="Delivery status" error={errors.deliveryStatus}>
            <select
              name="deliveryStatus"
              value={draft.deliveryStatus}
              onChange={(e) => update("deliveryStatus", e.target.value)}
              className={inputClass}
            >
              <option value="">— None —</option>
              <option value="On track">On track</option>
              <option value="Due soon">Due soon</option>
              <option value="Delayed">Delayed</option>
            </select>
          </Field>
        </>
      )}

      {state.status === "error" && state.message && (
        <p role="alert" className="text-xs text-red-700 sm:col-span-2">
          {state.message}
        </p>
      )}

      <div className="flex items-center gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-3 border border-ink bg-ink px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-paper transition hover:bg-ink-soft disabled:opacity-60"
        >
          {isPending ? (
            <>
              Saving <Loader2 size={15} className="animate-spin" />
            </>
          ) : isEditing ? (
            <>
              Save changes <ArrowUpRight size={15} />
            </>
          ) : (
            <>
              Create project <ArrowUpRight size={15} />
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="text-[10px] uppercase tracking-widest text-ink/50 hover:text-ink"
        >
          Cancel
        </button>
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
