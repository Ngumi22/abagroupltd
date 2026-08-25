"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { createDashboardUser, type ActionState } from "@/lib/actions/users";

const initialState: ActionState = { status: "idle" };
const inputClass =
  "mt-1 w-full border-b border-ink/30 bg-transparent py-2 text-sm outline-none placeholder:text-ink/40";

export function CreateUserForm({ onSuccess }: { onSuccess?: () => void }) {
  const [state, formAction, isPending] = useActionState(
    createDashboardUser,
    initialState,
  );
  const [showPassword, setShowPassword] = useState(false);
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
          placeholder="Jane Mwangi"
        />
      </label>
      <label className="text-[10px] uppercase tracking-widest">
        Email
        <input
          required
          type="email"
          name="email"
          className={inputClass}
          placeholder="jane@abagroup.co.ke"
        />
      </label>
      <label className="text-[10px] uppercase tracking-widest">
        Temporary password
        <div className="relative">
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            minLength={12}
            className={`${inputClass} pr-8`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-ink/40 transition hover:text-ink"
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
      </label>
      <label className="text-[10px] uppercase tracking-widest">
        Role
        <select
          required
          name="role"
          defaultValue="staff"
          className={inputClass}
        >
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
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
        {isPending ? "Creating…" : "Create account"}
      </button>
    </form>
  );
}
