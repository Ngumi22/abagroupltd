"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Building2, Pencil } from "lucide-react";
import {
  createBranch,
  deleteBranch,
  updateBranch,
  type ActionState,
} from "@/lib/actions/contact-info";
import { DeleteIconButton } from "./delete-icon-button";
import {
  SettingsSection,
  SettingsEmptyState,
  inputClass,
} from "./settings-section";
import type { Branch } from "@/generated/prisma/client";

const initialState: ActionState = { status: "idle" };

function BranchEditForm({
  branch,
  onDone,
}: {
  branch: Branch;
  onDone: () => void;
}) {
  const [state, formAction, isPending] = useActionState(
    updateBranch,
    initialState,
  );

  useEffect(() => {
    if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="grid gap-3 border-t border-ink/10 py-4 sm:grid-cols-2"
    >
      <input type="hidden" name="id" value={branch.id} />
      <label className="text-[10px] uppercase tracking-widest sm:col-span-2">
        Branch name
        <input
          required
          name="name"
          defaultValue={branch.name}
          className={inputClass}
        />
      </label>
      <label className="text-[10px] uppercase tracking-widest">
        Address line 1
        <input
          required
          name="addressLine1"
          defaultValue={branch.addressLine1}
          className={inputClass}
        />
      </label>
      <label className="text-[10px] uppercase tracking-widest">
        Address line 2
        <input
          name="addressLine2"
          defaultValue={branch.addressLine2 ?? ""}
          className={inputClass}
        />
      </label>
      <label className="text-[10px] uppercase tracking-widest">
        City
        <input
          required
          name="city"
          defaultValue={branch.city}
          className={inputClass}
        />
      </label>
      <label className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-widest">
        <input
          type="checkbox"
          name="isPrimary"
          defaultChecked={branch.isPrimary}
        />
        Set as primary office
      </label>
      <div className="flex gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={isPending}
          onClick={() => !isPending && setTimeout(onDone, 0)}
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

export function BranchesSection({ branches }: { branches: Branch[] }) {
  const [state, formAction, isPending] = useActionState(
    createBranch,
    initialState,
  );
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <SettingsSection
      icon={Building2}
      title="Office locations"
      count={branches.length}
      addLabel="Add branch"
      addForm={
        <form action={formAction} className="grid gap-4 sm:grid-cols-2">
          <label className="text-[10px] uppercase tracking-widest sm:col-span-2">
            Branch name
            <input
              required
              name="name"
              className={inputClass}
              placeholder="Head Office"
            />
          </label>
          <label className="text-[10px] uppercase tracking-widest">
            Address line 1
            <input
              required
              name="addressLine1"
              className={inputClass}
              placeholder="5th Floor, ABC Towers"
            />
          </label>
          <label className="text-[10px] uppercase tracking-widest">
            Address line 2
            <input
              name="addressLine2"
              className={inputClass}
              placeholder="Waiyaki Way (optional)"
            />
          </label>
          <label className="text-[10px] uppercase tracking-widest">
            City
            <input
              required
              name="city"
              className={inputClass}
              placeholder="Nairobi, Kenya"
            />
          </label>
          <label className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-widest">
            <input type="checkbox" name="isPrimary" />
            Set as primary office
          </label>
          <button
            type="submit"
            disabled={isPending}
            className="w-fit bg-ink px-4 py-2 text-[10px] uppercase tracking-widest text-paper disabled:opacity-60 sm:col-span-2"
          >
            {isPending ? "Adding…" : "Add branch"}
          </button>
        </form>
      }
    >
      {branches.length === 0 ? (
        <SettingsEmptyState
          icon={Building2}
          label="No branches yet — add your first office location below."
        />
      ) : (
        <ul className="divide-y divide-ink/10">
          {branches.map((branch) => (
            <li key={branch.id} className="py-1">
              <div className="flex items-start justify-between gap-3 py-3">
                <div>
                  <p className="text-sm font-medium">
                    {branch.name}
                    {branch.isPrimary && (
                      <span className="ml-2 text-[10px] uppercase tracking-widest text-bronze-dark">
                        Primary
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-ink/55">
                    {branch.addressLine1}
                    {branch.addressLine2
                      ? `, ${branch.addressLine2}`
                      : ""}, {branch.city}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setEditingId(editingId === branch.id ? null : branch.id)
                    }
                    aria-label="Edit"
                    className="text-ink/40 transition hover:text-ink"
                  >
                    <Pencil size={15} />
                  </button>
                  <DeleteIconButton
                    onDelete={() => deleteBranch(branch.id)}
                    confirmMessage={`Delete "${branch.name}"?`}
                  />
                </div>
              </div>
              {editingId === branch.id && (
                <BranchEditForm
                  branch={branch}
                  onDone={() => setEditingId(null)}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </SettingsSection>
  );
}
