"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Phone } from "lucide-react";
import type { ContactPhone } from "@/generated/prisma/client";
import {
  createContactPhone,
  deleteContactPhone,
  type ActionState,
} from "@/lib/actions/contact-info";
import { DeleteIconButton } from "./delete-icon-button";
import {
  SettingsSection,
  SettingsEmptyState,
  inputClass,
} from "./settings-section";

const initialState: ActionState = { status: "idle" };

export function ContactPhonesSection({ phones }: { phones: ContactPhone[] }) {
  const [state, formAction, isPending] = useActionState(
    createContactPhone,
    initialState,
  );

  useEffect(() => {
    if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <SettingsSection
      icon={Phone}
      title="Phone numbers"
      count={phones.length}
      addLabel="Add number"
      addForm={
        <form action={formAction} className="grid gap-4 sm:grid-cols-2">
          <label className="text-[10px] uppercase tracking-widest">
            Label
            <input
              required
              name="label"
              className={inputClass}
              placeholder="Main line"
            />
          </label>
          <label className="text-[10px] uppercase tracking-widest">
            Number
            <input
              required
              name="number"
              className={inputClass}
              placeholder="+254 700 123 456"
            />
          </label>
          <button
            type="submit"
            disabled={isPending}
            className="w-fit bg-ink px-4 py-2 text-[10px] uppercase tracking-widest text-paper disabled:opacity-60 sm:col-span-2"
          >
            {isPending ? "Adding…" : "Add number"}
          </button>
        </form>
      }
    >
      {phones.length === 0 ? (
        <SettingsEmptyState
          icon={Phone}
          label="No phone numbers yet — add one below."
        />
      ) : (
        <ul className="divide-y divide-ink/10">
          {phones.map((phone) => (
            <li
              key={phone.id}
              className="flex items-center justify-between gap-3 py-3"
            >
              <div>
                <p className="text-sm font-medium">{phone.label}</p>
                <p className="text-xs text-ink/55">{phone.number}</p>
              </div>
              <DeleteIconButton
                onDelete={() => deleteContactPhone(phone.id)}
                confirmMessage={`Delete "${phone.label}"?`}
              />
            </li>
          ))}
        </ul>
      )}
    </SettingsSection>
  );
}
