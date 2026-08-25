"use client";

import { useActionState, useEffect, useRef } from "react";
import { convertInquiryToLead, type ActionState } from "@/lib/actions/leads";

const initialState: ActionState = { status: "idle" };
const inputClass =
  "mt-1 w-full border-b border-ink/30 bg-transparent py-2 text-sm outline-none placeholder:text-ink/40";

export function ConvertToLeadForm({
  inquiryId,
  onDone,
}: {
  inquiryId: string;
  onDone: () => void;
}) {
  const [state, formAction, isPending] = useActionState(
    convertInquiryToLead,
    initialState,
  );
  const wasPending = useRef(false);

  useEffect(() => {
    if (wasPending.current && !isPending) {
      if (state.status !== "error") {
        onDone();
      }
    }
    wasPending.current = isPending;
  }, [isPending, state, onDone]);

  return (
    <form
      action={formAction}
      className="mt-3 grid gap-3 border-t border-ink/10 pt-3 sm:grid-cols-2"
    >
      <input type="hidden" name="inquiryId" value={inquiryId} />
      <label className="text-[10px] uppercase tracking-widest">
        Project interest
        <input
          required
          name="project"
          className={inputClass}
          placeholder="Residential build"
        />
      </label>
      <label className="text-[10px] uppercase tracking-widest">
        Estimated value (KES)
        <input
          name="value"
          type="number"
          min={0}
          className={inputClass}
          placeholder="Optional"
        />
      </label>
      {state.status === "error" && (
        <p role="alert" className="text-xs text-red-700 sm:col-span-2">
          {state.message}
        </p>
      )}
      <div className="flex gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={isPending}
          className="bg-ink px-4 py-2 text-[10px] uppercase tracking-widest text-paper disabled:opacity-60"
        >
          {isPending ? "Converting…" : "Convert to lead"}
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
