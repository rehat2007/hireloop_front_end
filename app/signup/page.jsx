"use client"

import Link from "next/link"
import { ArrowRight, Eye, EyeOff, Lock, Mail, UserRound } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { HireLoopLogo } from "@/components/logo"
import { authClient } from "@/lib/auth-client"

const inputClass =
  "h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-[#6b6bff]/70 focus:ring-4 focus:ring-[#5b5bf5]/15"

export default function SignUpPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
    setError("")
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const fullName = form.fullName.trim()
    const email = form.email.trim().toLowerCase()

    if (!fullName || !email || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields.")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.")
      return
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setError("")
    setPending(true)

    try {
      const { error: authError } = await authClient.signUp.email({
        name: fullName,
        email,
        password: form.password,
      })

      if (authError) {
        setError(authError.message ?? "Unable to create your account.")
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
            Create your account
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Join HireLoop and land your next role faster.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-zinc-300"
              >
                Full name
              </label>
              <div className="relative mt-2">
                <UserRound
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-3 size-[18px] -translate-y-1/2 text-zinc-500"
                />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  required
                  value={form.fullName}
                  onChange={handleChange}
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

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
                  className={`${inputClass} pl-10`}
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
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  minLength={8}
                  required
                  value={form.password}
                  onChange={handleChange}
                  className={`${inputClass} pr-11 pl-10`}
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-zinc-300"
              >
                Confirm password
              </label>
              <div className="relative mt-2">
                <Lock
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-3 size-[18px] -translate-y-1/2 text-zinc-500"
                />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  minLength={8}
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={`${inputClass} pr-11 pl-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((value) => !value)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide password confirmation"
                      : "Show password confirmation"
                  }
                  className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:text-zinc-300"
                >
                  {showConfirmPassword ? (
                    <EyeOff aria-hidden="true" className="size-[18px]" />
                  ) : (
                    <Eye aria-hidden="true" className="size-[18px]" />
                  )}
                </button>
              </div>
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
              {pending ? "Creating account…" : "Create account"}
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-medium text-[#8b8bff] transition-colors hover:text-[#a5a5ff]"
            >
              Sign in
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-zinc-600">
          By creating an account you agree to HireLoop&apos;s Terms of Service
          and Privacy Policy.
        </p>
      </div>
    </main>
  )
}
