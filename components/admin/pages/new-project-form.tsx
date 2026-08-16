"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { createProject, type CreateProjectState } from "@/lib/actions/projects";

const initialState: CreateProjectState = { status: "idle" };

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function NewProjectForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    createProject,
    initialState,
  );
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [status, setStatus] = useState<"Completed" | "In progress">(
    "In progress",
  );

  const errors = state.fieldErrors ?? {};

  function handleNameChange(value: string) {
    setName(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  return (
    <form
      action={formAction}
      className="grid gap-5 border border-ink/20 bg-white/40 p-6 sm:grid-cols-2"
    >
      <Field label="Project name" error={errors.name}>
        <input
          required
          name="name"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          className={inputClass}
          placeholder="Kilimani House"
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
          placeholder="kilimani-house"
        />
      </Field>

      <Field label="Type" error={errors.type}>
        <input
          required
          name="type"
          className={inputClass}
          placeholder="Residential"
        />
      </Field>

      <Field label="Location" error={errors.location}>
        <input
          required
          name="location"
          className={inputClass}
          placeholder="Nairobi, Kenya"
        />
      </Field>

      <Field label="Year" error={errors.year}>
        <input
          required
          name="year"
          maxLength={4}
          className={inputClass}
          placeholder="2026"
        />
      </Field>

      <Field label="Status" error={errors.status}>
        <select
          required
          name="status"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as "Completed" | "In progress")
          }
          className={inputClass}
        >
          <option value="In progress">In progress</option>
          <option value="Completed">Completed</option>
        </select>
      </Field>

      <Field label="Image URL" error={errors.image} className="sm:col-span-2">
        <input
          required
          name="image"
          type="url"
          className={inputClass}
          placeholder="https://…"
        />
      </Field>

      <Field
        label="Gallery image URLs (one per line)"
        error={errors.gallery}
        className="sm:col-span-2"
      >
        <textarea
          name="gallery"
          rows={3}
          className={`${inputClass} resize-none`}
          placeholder="https://…"
        />
      </Field>

      <Field label="Summary" error={errors.summary} className="sm:col-span-2">
        <textarea
          required
          name="summary"
          rows={2}
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
          className={`${inputClass} resize-none`}
          placeholder="Architecture & design"
        />
      </Field>

      {/* Delivery tracking only makes sense for work in progress — mirrors the
          same rule already applied when seeding athi-river-offices without it. */}
      {status === "In progress" && (
        <>
          <Field label="Progress (%)" error={errors.progress}>
            <input
              name="progress"
              type="number"
              min={0}
              max={100}
              className={inputClass}
              placeholder="62"
            />
          </Field>
          <Field label="Delivery status" error={errors.deliveryStatus}>
            <select
              name="deliveryStatus"
              defaultValue=""
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

const inputClass =
  "mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-sm outline-none placeholder:text-ink/40";

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
