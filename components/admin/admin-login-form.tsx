"use client";

import { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { ADMIN_CREDENTIALS, SITE } from "@/lib/constants";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      email === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    )
      router.push("/admin");
    else
      setError(
        "Use the placeholder credentials shown below to preview the dashboard.",
      );
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5 py-12 text-ink">
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
        <div className="mt-12 border border-ink/15 bg-paper p-7 shadow-sm sm:p-10">
          <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-bronze-dark">
            Prototype access
          </p>
          <h1 className="mt-3 font-serif text-4xl">Welcome back.</h1>
          <p className="mt-3 text-sm leading-6 text-ink/60">
            Sign in to preview the Aba Group admin workspace. This demo does not
            create a session or store credentials.
          </p>
          <form onSubmit={submit} className="mt-8 grid gap-5">
            <label className="text-[10px] font-semibold uppercase tracking-widest">
              Email
              <input
                required
                type="email"
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
            <button className="mt-2 inline-flex items-center justify-center gap-3 bg-ink px-5 py-4 text-[10px] font-semibold uppercase tracking-widest text-paper transition hover:bg-ink-soft">
              Enter workspace <ArrowRight size={15} />
            </button>
          </form>
          <div className="mt-8 border-t border-ink/10 pt-5 text-xs leading-6 text-ink/55">
            <p className="font-semibold text-ink">Placeholder credentials</p>
            <p>Email: {ADMIN_CREDENTIALS.email}</p>
            <p>Password: {ADMIN_CREDENTIALS.password}</p>
          </div>
        </div>
        <a
          href="/"
          className="mt-6 block text-center text-[10px] uppercase tracking-widest text-ink/55 transition hover:text-ink"
        >
          Return to public site
        </a>
      </div>
    </main>
  );
}
