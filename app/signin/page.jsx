"use client"

import Link from "next/link"
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { HireLoopLogo } from "@/components/logo"
import { authClient } from "@/lib/auth-client"

const inputClass =
  "h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] pr-3.5 pl-10 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-[#6b6bff]/70 focus:ring-4 focus:ring-[#5b5bf5]/15"

export default function SignInPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }))
    setError("")
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setError("")
    setPending(true)

    try {
      const { error: authError } = await authClient.signIn.email({
        email: form.email.trim().toLowerCase(),
        password: form.password,
        rememberMe: form.rememberMe,
      })

      if (authError) {
        setError(authError.message ?? "Unable to sign in. Please try again.")
        return
      }

      router.push("/")
      router.refresh()
    } catch {
      setError(
        "Unable to reach the server. Check your connection and try again."
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#08080b] px-4 py-10 text-zinc-100">
      {/* Ambient brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-1/2 h-[460px] w-[680px] max-w-none -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(109,76,255,0.22),transparent)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(ellipse_at_bottom,rgba(91,91,245,0.08),transparent_70%)]"
      />

      <div className="relative w-full max-w-md">
        <Link
          href="/"
          aria-label="HireLoop home"
          className="mb-6 flex justify-center"
        >
          <HireLoopLogo />
        </Link>

        <div className="rounded-2xl border border-white/[0.08] bg-[#111116]/90 p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,1)] backdrop-blur-md sm:p-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Welcome back
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Sign in to continue your job search.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-300"
              >
                Email address
              </label>
              <div className="relative mt-2">
                <Mail
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-3 size-[18px] -translate-y-1/2 text-zinc-500"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="jane@example.com"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-300"
              >
                Password
              </label>
              <div className="relative mt-2">
                <Lock
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-3 size-[18px] -translate-y-1/2 text-zinc-500"
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className={`${inputClass} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:text-zinc-300"
                >
                  {showPassword ? (
                    <EyeOff aria-hidden="true" className="size-[18px]" />
                  ) : (
                    <Eye aria-hidden="true" className="size-[18px]" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-400">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={form.rememberMe}
                  onChange={handleChange}
                  className="size-4 shrink-0 cursor-pointer appearance-none rounded-[4px] border border-white/20 bg-white/[0.03] transition-colors checked:border-[#5b5bf5] checked:bg-[#5b5bf5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                />
                Remember me
              </label>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-[#8b8bff] transition-colors hover:text-[#a5a5ff]"
              >
                Forgot password?
              </Link>
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#5b5bf5] text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_12px_30px_-12px_rgba(99,102,241,0.9)] transition-colors hover:bg-[#6b6bff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "Signing in…" : "Sign in"}
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500">
            New to HireLoop?{" "}
            <Link
              href="/signup"
              className="font-medium text-[#8b8bff] transition-colors hover:text-[#a5a5ff]"
            >
              Create an account
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-zinc-600">
          Protected by HireLoop&apos;s secure sign-in. Need help?{" "}
          <Link
            href="/support"
            className="transition-colors hover:text-zinc-400"
          >
            Contact support
          </Link>
        </p>
      </div>
    </main>
  )
}
