"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import type { ContactEmail } from "@/generated/prisma/client";
import {
  createContactEmail,
  deleteContactEmail,
  type ActionState,
} from "@/lib/actions/contact-info";
import { DeleteIconButton } from "./delete-icon-button";
import {
  SettingsSection,
  SettingsEmptyState,
  inputClass,
} from "./settings-section";

const initialState: ActionState = { status: "idle" };

export function ContactEmailsSection({ emails }: { emails: ContactEmail[] }) {
  const [state, formAction, isPending] = useActionState(
    createContactEmail,
    initialState,
  );

  useEffect(() => {
    if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <SettingsSection
      icon={Mail}
      title="Email addresses"
      count={emails.length}
      addLabel="Add email"
      addForm={
        <form action={formAction} className="grid gap-4 sm:grid-cols-2">
          <label className="text-[10px] uppercase tracking-widest">
            Label
            <input
              required
              name="label"
              className={inputClass}
              placeholder="General enquiries"
            />
          </label>
          <label className="text-[10px] uppercase tracking-widest">
            Email
            <input
              required
              type="email"
              name="email"
              className={inputClass}
              placeholder="hello@abagroup.co.ke"
            />
          </label>
          <button
            type="submit"
            disabled={isPending}
            className="w-fit bg-ink px-4 py-2 text-[10px] uppercase tracking-widest text-paper disabled:opacity-60 sm:col-span-2"
          >
            {isPending ? "Adding…" : "Add email"}
          </button>
        </form>
      }
    >
      {emails.length === 0 ? (
        <SettingsEmptyState
          icon={Mail}
          label="No email addresses yet — add one below."
        />
      ) : (
        <ul className="divide-y divide-ink/10">
          {emails.map((email) => (
            <li
              key={email.id}
              className="flex items-center justify-between gap-3 py-3"
            >
              <div>
                <p className="text-sm font-medium">{email.label}</p>
                <p className="text-xs text-ink/55">{email.email}</p>
              </div>
              <DeleteIconButton
                onDelete={() => deleteContactEmail(email.id)}
                confirmMessage={`Delete "${email.label}"?`}
              />
            </li>
          ))}
        </ul>
      )}
    </SettingsSection>
  );
}
