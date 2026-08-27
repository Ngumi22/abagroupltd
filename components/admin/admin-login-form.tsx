"use client";

import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { SITE } from "@/lib/constants";
import Link from "next/link";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
    });

    setIsSubmitting(false);

    if (signInError) {
      setError(
        signInError.status === 403
          ? "Your account has been suspended. Contact an administrator."
          : signInError.status === 429
            ? "Too many attempts. Please wait a minute and try again."
            : "Invalid email or password.",
      );
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper p-5 text-ink">
      <div className="w-full max-w-md">
        <a href="/" className="flex items-center gap-3">
          <span className="font-serif text-5xl text-bronze-dark">A</span>
          <span className="text-sm tracking-[.28em]">
            {SITE.shortName}
            <small className="mt-1 block text-[8px] tracking-[.18em] text-bronze-dark">
              ADMIN STUDIO
            </small>
          </span>
        </a>
        <div className="mt-6 border border-ink/15 bg-paper p-7 shadow-sm sm:p-10">
          <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-bronze-dark">
            Restricted access
          </p>
          <h1 className="mt-2 font-serif text-4xl">Welcome back.</h1>
          <p className="mt-2 text-sm leading-6 text-ink/60">
            Sign in to access the Aba Group admin workspace.
          </p>
          <form onSubmit={submit} className="mt-5 grid gap-5">
            <label className="text-[10px] font-semibold uppercase tracking-widest">
              Email
              <input
                required
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full border-b border-ink/25 bg-transparent py-3 text-sm outline-none focus:border-bronze-dark"
                placeholder="admin@abagroup.co.ke"
              />
            </label>
            <label className="text-[10px] font-semibold uppercase tracking-widest">
              Password
              <div className="mt-2 flex items-center border-b border-ink/25">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full bg-transparent py-3 text-sm outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>
            {error && (
              <p role="alert" className="text-xs text-red-700">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 inline-flex items-center justify-center gap-3 bg-ink px-5 py-4 text-[10px] font-semibold uppercase tracking-widest text-paper transition hover:bg-ink-soft disabled:opacity-60"
            >
              {isSubmitting ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <>
                  Enter workspace <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
        </div>
        <Link
          href="/"
          className="mt-6 block text-center text-[10px] uppercase tracking-widest text-ink/55 transition hover:text-ink"
        >
          Return to public site
        </Link>
      </div>
    </main>
  );
}
