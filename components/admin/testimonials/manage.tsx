"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Loader2, Plus, RefreshCw, Star } from "lucide-react";
import type { Testimonial } from "@/generated/prisma/client";
import {
  syncGoogleReviews,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/lib/actions/testimonials";
import { DeleteIconButton } from "@/components/admin/settings/delete-icon-button";

const inputClass =
  "mt-1 w-full border-b border-ink/30 bg-transparent py-2 text-sm outline-none placeholder:text-ink/40";

export function TestimonialsManager({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [isSyncing, startSync] = useTransition();
  const [isAdding, setIsAdding] = useState(false);

  function handleSync() {
    startSync(async () => {
      const result = await syncGoogleReviews();
      if (result.status === "success") {
        toast.success(
          result.created > 0
            ? `Synced ${result.created} new review${result.created === 1 ? "" : "s"}${
                result.updated > 0 ? ` (${result.updated} updated)` : ""
              }.`
            : "No new reviews found — everything is already up to date.",
        );
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <section className="border border-ink/10 bg-white/40 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl">Testimonials</h2>
          <p className="mt-1 text-xs text-ink/50">
            {testimonials.length} total ·{" "}
            {testimonials.filter((t) => t.featured).length} featured on the
            homepage
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSync}
            disabled={isSyncing}
            className="flex items-center gap-2 border border-ink/20 px-3 py-2 text-[10px] uppercase tracking-widest text-ink/70 transition hover:border-ink/40 hover:text-ink disabled:opacity-50"
          >
            {isSyncing ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <RefreshCw size={13} />
            )}
            Sync Google reviews
          </button>
          <button
            type="button"
            onClick={() => setIsAdding((v) => !v)}
            className="flex items-center gap-2 bg-ink px-3 py-2 text-[10px] uppercase tracking-widest text-paper transition hover:bg-ink-soft"
          >
            <Plus size={13} /> Add testimonial
          </button>
        </div>
      </div>

      {isAdding && <AddTestimonialForm onDone={() => setIsAdding(false)} />}

      <ul className="mt-6 divide-y divide-ink/10">
        {testimonials.map((testimonial) => (
          <TestimonialRow key={testimonial.id} testimonial={testimonial} />
        ))}
        {testimonials.length === 0 && (
          <p className="py-8 text-center text-sm text-ink/50">
            No testimonials yet — sync from Google or add one manually.
          </p>
        )}
      </ul>
    </section>
  );
}

function TestimonialRow({ testimonial }: { testimonial: Testimonial }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isManual = testimonial.source === "Manual";

  function toggleFeatured() {
    startTransition(async () => {
      try {
        await updateTestimonial(testimonial.id, {
          featured: !testimonial.featured,
        });
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Could not update.");
      }
    });
  }

  return (
    <li className="py-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-medium">{testimonial.name}</p>
            <span className="text-[9px] uppercase tracking-widest text-ink/40">
              {testimonial.source}
            </span>
            <div className="flex gap-0.5 text-bronze-dark">
              {Array.from({ length: testimonial.rating }, (_, i) => (
                <Star key={i} size={11} fill="currentColor" />
              ))}
            </div>
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-ink/60">
            {testimonial.quote}
          </p>
          <p className="mt-1 text-xs text-ink/40">
            {testimonial.role ?? "—"} · {testimonial.project ?? "—"}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={toggleFeatured}
            disabled={isPending}
            className={`text-[10px] uppercase tracking-widest transition disabled:opacity-50 ${
              testimonial.featured
                ? "text-bronze-dark"
                : "text-ink/40 hover:text-ink"
            }`}
          >
            {testimonial.featured ? "Featured" : "Feature"}
          </button>
          <button
            type="button"
            onClick={() => setIsEditing((v) => !v)}
            className="text-[10px] uppercase tracking-widest text-ink/40 hover:text-ink"
          >
            Edit
          </button>
          <DeleteIconButton
            onDelete={() => deleteTestimonial(testimonial.id)}
            confirmMessage={`Delete the testimonial from "${testimonial.name}"?`}
          />
        </div>
      </div>
      {isEditing && (
        <EditTestimonialForm
          testimonial={testimonial}
          allowContentEdit={isManual}
          onDone={() => setIsEditing(false)}
        />
      )}
    </li>
  );
}

function AddTestimonialForm({ onDone }: { onDone: () => void }) {
  const [isPending, startTransition] = useTransition();
  const [rating, setRating] = useState(5);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      try {
        await createTestimonial({
          name: String(formData.get("name")),
          quote: String(formData.get("quote")),
          rating,
          role: String(formData.get("role") || "") || undefined,
          project: String(formData.get("project") || "") || undefined,
          featured: formData.get("featured") === "on",
        });
        toast.success("Testimonial added.");
        onDone();
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Could not add testimonial.",
        );
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-5 grid gap-4 border-t border-ink/10 pt-5 sm:grid-cols-2"
    >
      <label className="text-[10px] uppercase tracking-widest">
        Name
        <input
          required
          name="name"
          className={inputClass}
          placeholder="Jane Mwangi"
        />
      </label>
      <RatingField value={rating} onChange={setRating} />
      <label className="text-[10px] uppercase tracking-widest sm:col-span-2">
        Quote
        <textarea
          required
          name="quote"
          rows={2}
          className={`${inputClass} resize-none`}
        />
      </label>
      <label className="text-[10px] uppercase tracking-widest">
        Role
        <input name="role" className={inputClass} placeholder="Homeowner" />
      </label>
      <label className="text-[10px] uppercase tracking-widest">
        Project
        <input
          name="project"
          className={inputClass}
          placeholder="Kilimani House"
        />
      </label>
      <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest sm:col-span-2">
        <input type="checkbox" name="featured" /> Feature on homepage
      </label>
      <div className="flex gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={isPending}
          className="bg-ink px-4 py-2 text-[10px] uppercase tracking-widest text-paper disabled:opacity-60"
        >
          {isPending ? "Saving…" : "Add testimonial"}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="text-[10px] uppercase tracking-widest text-ink/50 hover:text-ink"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function EditTestimonialForm({
  testimonial,
  allowContentEdit,
  onDone,
}: {
  testimonial: Testimonial;
  allowContentEdit: boolean;
  onDone: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [rating, setRating] = useState(testimonial.rating);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      try {
        await updateTestimonial(testimonial.id, {
          ...(allowContentEdit
            ? {
                name: String(formData.get("name")),
                quote: String(formData.get("quote")),
                rating,
              }
            : {}),
          role: String(formData.get("role") || "") || undefined,
          project: String(formData.get("project") || "") || undefined,
          featured: formData.get("featured") === "on",
        });
        onDone();
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Could not save changes.",
        );
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 grid gap-4 border-t border-ink/10 pt-4 sm:grid-cols-2"
    >
      {allowContentEdit ? (
        <>
          <label className="text-[10px] uppercase tracking-widest">
            Name
            <input
              required
              name="name"
              defaultValue={testimonial.name}
              className={inputClass}
            />
          </label>
          <RatingField value={rating} onChange={setRating} />
          <label className="text-[10px] uppercase tracking-widest sm:col-span-2">
            Quote
            <textarea
              required
              name="quote"
              rows={2}
              defaultValue={testimonial.quote}
              className={`${inputClass} resize-none`}
            />
          </label>
        </>
      ) : (
        <p className="text-xs text-ink/50 sm:col-span-2">
          This review was synced from Google — only the role, project, and
          featured status can be edited here.
        </p>
      )}
      <label className="text-[10px] uppercase tracking-widest">
        Role
        <input
          name="role"
          defaultValue={testimonial.role ?? ""}
          className={inputClass}
        />
      </label>
      <label className="text-[10px] uppercase tracking-widest">
        Project
        <input
          name="project"
          defaultValue={testimonial.project ?? ""}
          className={inputClass}
        />
      </label>
      <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest sm:col-span-2">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={testimonial.featured}
        />{" "}
        Feature on homepage
      </label>
      <div className="flex gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={isPending}
          className="bg-ink px-4 py-2 text-[10px] uppercase tracking-widest text-paper disabled:opacity-60"
        >
          {isPending ? "Saving…" : "Save changes"}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="text-[10px] uppercase tracking-widest text-ink/50 hover:text-ink"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function RatingField({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="text-[10px] uppercase tracking-widest">
      Rating
      <div className="mt-2 flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-label={`${n} star${n === 1 ? "" : "s"}`}
            className="text-bronze-dark"
          >
            <Star size={18} fill={n <= value ? "currentColor" : "none"} />
          </button>
        ))}
      </div>
    </div>
  );
}
