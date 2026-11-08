import { Hero } from "@/components/hero"
import { Navbar } from "@/components/navbar"

export default function Page() {
  return (
    <main className="min-h-svh overflow-x-hidden bg-[#08080b] text-zinc-100">
      <div className="px-4 pt-5 md:px-6">
        <Navbar />
      </div>
      <Hero />
    </main>
  )
}
