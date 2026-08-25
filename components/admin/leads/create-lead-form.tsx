"use client";

import { useActionState, useEffect, useRef } from "react";
import { createLead, type ActionState } from "@/lib/actions/leads";

const initialState: ActionState = { status: "idle" };
const inputClass =
  "mt-1 w-full border-b border-ink/30 bg-transparent py-2 text-sm outline-none placeholder:text-ink/40";

export function CreateLeadForm({ onSuccess }: { onSuccess?: () => void }) {
  const [state, formAction, isPending] = useActionState(
    createLead,
    initialState,
  );
  const wasPending = useRef(false);

  useEffect(() => {
    if (wasPending.current && !isPending && state.status !== "error") {
      onSuccess?.();
    }
    wasPending.current = isPending;
  }, [isPending, state, onSuccess]);

  return (
    <form
      action={formAction}
      className="grid gap-4 border border-ink/10 bg-white/40 p-6 sm:grid-cols-2"
    >
      <label className="text-[10px] uppercase tracking-widest">
        Name
        <input
          required
          name="name"
          className={inputClass}
          placeholder="David Kamau"
        />
      </label>
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
      <label className="text-[10px] uppercase tracking-widest">
        Status
        <select name="status" defaultValue="NEW_LEAD" className={inputClass}>
          <option value="NEW_LEAD">New lead</option>
          <option value="PROPOSAL_SENT">Proposal sent</option>
          <option value="SITE_VISIT">Site visit</option>
          <option value="QUALIFIED">Qualified</option>
        </select>
      </label>
      {state.status === "error" && (
        <p role="alert" className="text-xs text-red-700 sm:col-span-2">
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="w-fit bg-ink px-4 py-2 text-[10px] uppercase tracking-widest text-paper disabled:opacity-60 sm:col-span-2"
      >
        {isPending ? "Adding…" : "Add lead"}
      </button>
    </form>
  );
}
