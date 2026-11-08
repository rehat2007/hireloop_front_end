"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"

import { HireLoopLogo } from "@/components/logo"
import { cn } from "@/lib/utils"

// Primary navigation, shared by the desktop row and the mobile dropdown.
const links = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

/**
 * Floating pill navbar: full links and auth actions on large screens,
 * collapsing to a hamburger + dropdown below the `lg` breakpoint.
 */
export function Navbar() {
  // Tracks whether the mobile dropdown is visible.
  const [open, setOpen] = useState(false)

  return (
    <header className="w-full">
      {/* Panel styling: rounded dark gradient with a hairline border and soft shadow. */}
      <nav className="relative mx-auto flex h-20 w-full max-w-[1320px] items-center justify-between rounded-[20px] border border-white/[0.06] bg-[linear-gradient(180deg,#18181b_0%,#121214_100%)] px-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]">
        {/* Logo also acts as the home link; clicking it closes any open mobile menu. */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          onClick={() => setOpen(false)}
        >
          <HireLoopLogo />
        </Link>

        {/* Desktop-only navigation group (hidden below `lg`). */}
        <div className="hidden items-center gap-8 lg:flex">
          {/* Main page links */}
          <div className="flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[15px] font-medium text-zinc-300 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Vertical rule separating page links from auth actions */}
          <span aria-hidden="true" className="h-5 w-px bg-white/10" />

          {/* Auth actions: subdued text link plus the primary CTA */}
          <div className="flex items-center gap-8">
            <Link
              href="/sign-in"
              className="text-[15px] font-medium text-[#7b7bfb] transition-colors hover:text-[#9a9aff]"
            >
              Sign In
            </Link>
            <Link
              href="/get-started"
              className="rounded-[10px] bg-[#5b5bf5] px-5 py-[11px] text-[15px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_24px_-10px_rgba(99,102,241,0.9)] transition-colors hover:bg-[#6b6bff]"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile menu toggle; swaps icon and aria-label based on state. */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex size-10 items-center justify-center rounded-[10px] border border-white/10 text-zinc-300 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        {/* Mobile dropdown, absolutely positioned below the panel so it overlays
            page content instead of affecting the navbar height. */}
        <div
          className={cn(
            "absolute inset-x-0 top-[calc(100%+10px)] z-50 overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#141417] p-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.95)] lg:hidden",
            open ? "block" : "hidden"
          )}
        >
          {/* Same link set as desktop; each click closes the menu. */}
          <div className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-[10px] px-4 py-3 text-[15px] font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
          {/* Mobile auth actions, separated by a top border. */}
          <div className="mt-2 border-t border-white/[0.06] p-2">
            <Link
              href="/sign-in"
              onClick={() => setOpen(false)}
              className="block rounded-[10px] px-4 py-3 text-[15px] font-medium text-[#7b7bfb] transition-colors hover:bg-white/5 hover:text-[#9a9aff]"
            >
              Sign In
            </Link>
            <Link
              href="/get-started"
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-[10px] bg-[#5b5bf5] px-4 py-3 text-center text-[15px] font-medium text-white transition-colors hover:bg-[#6b6bff]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
