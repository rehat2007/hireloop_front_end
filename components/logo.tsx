import { cn } from "@/lib/utils"

/**
 * Brand wordmark: "hire" + interlocking loop mark + "op".
 * The visible text is split around the SVG mark, so a single sr-only
 * "HireLoop" label is exposed to assistive tech instead of the fragments.
 * `className` is forwarded to the outer span for sizing where needed.
 */
export function HireLoopLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[1px] leading-none",
        className
      )}
    >
      {/* Accessible brand name; the gradient fragments below are decorative. */}
      <span className="sr-only">HireLoop</span>
      {/* Blue half of the wordmark */}
      <span
        aria-hidden="true"
        className="bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 bg-clip-text text-[28px] font-bold tracking-[-0.045em] text-transparent"
      >
        hire
      </span>
      {/* Loop mark. viewBox is cropped tight to the rings (no side padding)
          so it sits flush between "hire" and "op". */}
      <svg
        viewBox="-1 0 38 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-[21px] w-auto translate-y-[3px]"
      >
        <defs>
          {/* Diagonal fills give each ring its lighter top-left edge. */}
          <linearGradient
            id="loop-blue"
            x1="2"
            y1="4"
            x2="20"
            y2="26"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7dd3fc" />
            <stop offset="1" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient
            id="loop-orange"
            x1="17"
            y1="4"
            x2="35"
            y2="26"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#fdba74" />
            <stop offset="1" stopColor="#f97316" />
          </linearGradient>
        </defs>
        {/* Two overlapping outlined rings form the chain/loop symbol. */}
        <circle
          cx="11"
          cy="15"
          r="9"
          stroke="url(#loop-blue)"
          strokeWidth="5"
        />
        <circle
          cx="25"
          cy="15"
          r="9"
          stroke="url(#loop-orange)"
          strokeWidth="5"
        />
        {/* Small highlights near each ring's top edge. */}
        <circle cx="9.5" cy="7.5" r="2.2" fill="#7dd3fc" />
        <circle cx="26.5" cy="7.5" r="2.2" fill="#fdba74" />
      </svg>
      {/* Orange half of the wordmark */}
      <span
        aria-hidden="true"
        className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 bg-clip-text text-[28px] font-bold tracking-[-0.045em] text-transparent"
      >
        op
      </span>
    </span>
  )
}
