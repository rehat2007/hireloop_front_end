import Link from "next/link"
import {
  Briefcase,
  Building2,
  Crosshair,
  Search,
  Star,
  Users,
} from "lucide-react"

import { GlobeVisual } from "@/components/globe"

// Deterministic star positions keep server and client markup identical.
const stars = Array.from({ length: 56 }, (_, index) => ({
  left: `${(index * 37 + 11) % 100}%`,
  top: `${(index * 53 + 7) % 100}%`,
  size: index % 9 === 0 ? 3 : index % 4 === 0 ? 2 : 1,
  opacity: 0.18 + ((index * 17) % 55) / 100,
  purple: index % 6 === 0,
}))

const trending = ["Product Designer", "AI Engineering", "Dev-ops Engineer"]

const stats = [
  { icon: Briefcase, value: "50K", label: "Active Jobs" },
  { icon: Building2, value: "12K", label: "Companies" },
  { icon: Users, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
]

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
    >
      {/* Ambient purple bloom behind the headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-56 left-1/2 h-[620px] w-[900px] max-w-none -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(109,76,255,0.18),transparent)] blur-2xl"
      />

      {/* Sparse starfield */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {stars.map((star, index) => (
          <span
            key={index}
            className="absolute rounded-full"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              backgroundColor: star.purple ? "#c4b5fd" : "#ffffff",
            }}
          />
        ))}
      </div>

      {/* Headline + search */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 pt-14 text-center sm:pt-20 lg:pt-24">
        <div className="flex items-center justify-center gap-3">
          <span
            aria-hidden="true"
            className="hidden h-px w-24 bg-gradient-to-r from-transparent to-white/25 sm:block sm:w-28"
          />
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <span aria-hidden="true" className="text-sm">
              🚀
            </span>
            <span className="text-[10px] font-medium tracking-[0.17em] text-zinc-400 uppercase sm:text-[11px]">
              <span className="text-[#f6b18c]">50,000+</span> New jobs this
              month
            </span>
          </span>
          <span
            aria-hidden="true"
            className="hidden h-px w-24 bg-gradient-to-l from-transparent to-white/25 sm:block sm:w-28"
          />
        </div>

        <h1
          id="hero-heading"
          className="mt-7 text-4xl font-bold tracking-[-0.035em] text-balance text-white sm:text-5xl md:text-6xl"
        >
          Find Your Dream Job Today
        </h1>

        <p className="mt-5 max-w-[600px] text-base leading-relaxed text-pretty text-zinc-400 sm:text-lg">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search: stacked on mobile, single row from `sm` up */}
        <form
          role="search"
          action="/jobs"
          className="mt-8 w-full max-w-[700px] rounded-2xl border border-white/[0.07] bg-[#141318]/85 p-2 text-left shadow-[0_24px_60px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md sm:rounded-[18px]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="flex min-w-0 flex-1 items-center gap-3 rounded-xl px-3 py-2.5">
              <Search
                aria-hidden="true"
                className="size-[18px] shrink-0 text-zinc-500"
              />
              <span className="sr-only">Job title, skill or company</span>
              <input
                type="text"
                name="q"
                placeholder="Job title, skill or company"
                className="min-w-0 flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
              />
            </label>

            <div
              aria-hidden="true"
              className="mx-3 h-px bg-white/10 sm:mx-0 sm:h-6 sm:w-px"
            />

            <div className="flex flex-1 items-center gap-2">
              <label className="flex min-w-0 flex-1 items-center gap-3 rounded-xl px-3 py-2.5">
                <Crosshair
                  aria-hidden="true"
                  className="size-[18px] shrink-0 text-zinc-500"
                />
                <span className="sr-only">Location or remote</span>
                <input
                  type="text"
                  name="location"
                  placeholder="Location or Remote"
                  className="min-w-0 flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                />
              </label>

              <button
                type="submit"
                aria-label="Search jobs"
                className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#5b5bf5] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_24px_-10px_rgba(99,102,241,0.9)] transition-colors hover:bg-[#6b6bff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                <Search aria-hidden="true" className="size-[18px]" />
              </button>
            </div>
          </div>
        </form>

        {/* Trending searches */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-xs">
          <span className="mr-1 text-zinc-500">Trending Position</span>
          {trending.map((tag) => (
            <Link
              key={tag}
              href={`/jobs?search=${encodeURIComponent(tag)}`}
              className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 font-medium text-zinc-300 transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Globe, overlay copy and stats share one positioning context */}
      <div className="relative mt-10 sm:mt-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
        >
          <GlobeVisual className="w-[150vw] max-w-[1400px] shrink-0 sm:w-[130vw] lg:w-[110vw]" />
        </div>

        <div className="relative z-10 flex justify-center px-4 pt-[clamp(5.5rem,17vw,15rem)]">
          <p className="max-w-[560px] bg-gradient-to-b from-white via-[#d8d0f0] to-[#948ab8] bg-clip-text text-center text-2xl leading-[1.3] font-normal tracking-tight text-balance text-transparent sm:text-3xl md:text-[38px]">
            Assisting over 15,000 job seekers find their dream positions.
          </p>
        </div>

        {/* Stats overlap the lower half of the globe */}
        <div className="relative z-10 mt-10 px-4 pb-10 sm:mt-14 md:px-6 md:pb-14">
          <div className="mx-auto grid w-full max-w-[1320px] grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex min-h-[150px] flex-col justify-between rounded-2xl border border-white/[0.06] bg-[#14131a]/85 p-4 shadow-[0_20px_50px_-40px_rgba(0,0,0,1)] backdrop-blur-md sm:min-h-[190px] sm:p-5 lg:min-h-[230px] lg:p-6"
              >
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.6}
                  className="size-5 text-zinc-300"
                />
                <div>
                  <p className="text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-[56px]">
                    {value}
                  </p>
                  <p className="mt-2 text-xs text-zinc-400 sm:text-sm">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
