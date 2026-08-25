"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Share2 } from "lucide-react";
import type { SocialLink } from "@/generated/prisma/client";
import {
  createSocialLink,
  deleteSocialLink,
  type ActionState,
} from "@/lib/actions/contact-info";
import { DeleteIconButton } from "./delete-icon-button";
import { PLATFORM_LABELS } from "@/lib/constants";
import {
  SettingsSection,
  SettingsEmptyState,
  inputClass,
} from "./settings-section";

const initialState: ActionState = { status: "idle" };

export function SocialLinksSection({
  socialLinks,
}: {
  socialLinks: SocialLink[];
}) {
  const [state, formAction, isPending] = useActionState(
    createSocialLink,
    initialState,
  );

  useEffect(() => {
    if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <SettingsSection
      icon={Share2}
      title="Social accounts"
      count={socialLinks.length}
      addLabel="Add account"
      addForm={
        <form action={formAction} className="grid gap-4 sm:grid-cols-2">
          <label className="text-[10px] uppercase tracking-widest">
            Platform
            <select
              required
              name="platform"
              defaultValue=""
              className={inputClass}
            >
              <option value="" disabled>
                Select a platform
              </option>
              {Object.entries(PLATFORM_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="text-[10px] uppercase tracking-widest">
            Profile URL
            <input
              required
              type="url"
              name="url"
              className={inputClass}
              placeholder="https://facebook.com/abagroup"
            />
          </label>
          <button
            type="submit"
            disabled={isPending}
            className="w-fit bg-ink px-4 py-2 text-[10px] uppercase tracking-widest text-paper disabled:opacity-60 sm:col-span-2"
          >
            {isPending ? "Adding…" : "Add social account"}
          </button>
        </form>
      }
    >
      {socialLinks.length === 0 ? (
        <SettingsEmptyState
          icon={Share2}
          label="No social accounts yet — add one below."
        />
      ) : (
        <ul className="divide-y divide-ink/10">
          {socialLinks.map((link) => (
            <li
              key={link.id}
              className="flex items-center justify-between gap-3 py-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium">
                  {PLATFORM_LABELS[link.platform]}
                </p>
                <p className="truncate text-xs text-ink/55">{link.url}</p>
              </div>
              <DeleteIconButton
                onDelete={() => deleteSocialLink(link.id)}
                confirmMessage={`Delete the ${PLATFORM_LABELS[link.platform]} link?`}
              />
            </li>
          ))}
        </ul>
      )}
    </SettingsSection>
  );
}
