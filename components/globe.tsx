import { LAND_PATH } from "@/components/globe-land"

/**
 * Stylised planet used as the hero backdrop. It is purely decorative, so the
 * SVG is hidden from assistive tech and scales with its parent width.
 */
export function GlobeVisual({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        {/* Sphere body: thin violet rim light fading into a near-black ocean. */}
        <radialGradient id="globe-surface" cx="50%" cy="0%" r="92%">
          <stop offset="0%" stopColor="#5b4bc9" />
          <stop offset="6%" stopColor="#32287c" />
          <stop offset="15%" stopColor="#1c1742" />
          <stop offset="30%" stopColor="#100e22" />
          <stop offset="50%" stopColor="#090812" />
          <stop offset="70%" stopColor="#07070d" />
          <stop offset="100%" stopColor="#050509" />
        </radialGradient>

        {/* Wide bloom that spills past the planet silhouette. */}
        <radialGradient id="globe-halo" cx="50%" cy="50%" r="50%">
          <stop offset="66%" stopColor="#6d4dff" stopOpacity="0.24" />
          <stop offset="100%" stopColor="#6d4dff" stopOpacity="0" />
        </radialGradient>

        {/* Rim light is strongest at the top and fades down the sides. */}
        <linearGradient
          id="globe-rim"
          x1="500"
          y1="30"
          x2="500"
          y2="970"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.9" />
          <stop offset="14%" stopColor="#8b5cf6" stopOpacity="0.5" />
          <stop offset="38%" stopColor="#4c1d95" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#4c1d95" stopOpacity="0" />
        </linearGradient>

        {/* Continents: lighter than the ocean so they read through the dark. */}
        <linearGradient
          id="land-fill"
          x1="500"
          y1="180"
          x2="500"
          y2="760"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#382f73" />
          <stop offset="35%" stopColor="#2a2357" />
          <stop offset="70%" stopColor="#1d1840" />
          <stop offset="100%" stopColor="#13102a" />
        </linearGradient>

        <radialGradient id="top-atmosphere" cx="50%" cy="0%" r="75%">
          <stop offset="0%" stopColor="#b6a2ff" stopOpacity="0.3" />
          <stop offset="55%" stopColor="#7c5cff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#7c5cff" stopOpacity="0" />
        </radialGradient>

        {/* Lower half sinks into the page so the stats cards can overlap it. */}
        <linearGradient
          id="globe-fade"
          x1="500"
          y1="430"
          x2="500"
          y2="965"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#08080b" stopOpacity="0" />
          <stop offset="70%" stopColor="#08080b" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#08080b" stopOpacity="0.98" />
        </linearGradient>

        <filter id="globe-blur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="48" />
        </filter>
        <filter id="land-soft" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="0.7" />
        </filter>

        <clipPath id="globe-clip">
          <circle cx="500" cy="500" r="468" />
        </clipPath>
      </defs>

      {/* Outer bloom */}
      <circle cx="500" cy="500" r="540" fill="url(#globe-halo)" />

      {/* Planet body (blurred copy adds atmosphere around the silhouette) */}
      <circle
        cx="500"
        cy="500"
        r="468"
        fill="url(#globe-surface)"
        filter="url(#globe-blur)"
        opacity="0.18"
      />
      <circle cx="500" cy="500" r="468" fill="url(#globe-surface)" />

      <g clipPath="url(#globe-clip)">
        {/* Natural Earth land silhouette (see globe-land.ts) */}
        <path
          d={LAND_PATH}
          fill="url(#land-fill)"
          fillRule="evenodd"
          fillOpacity="0.9"
          stroke="#8b5cf6"
          strokeOpacity="0.2"
          strokeWidth="1"
          strokeLinejoin="round"
          filter="url(#land-soft)"
        />

        {/* Atmospheric light hugging the top of the sphere */}
        <ellipse
          cx="500"
          cy="60"
          rx="450"
          ry="190"
          fill="url(#top-atmosphere)"
        />

        {/* Draw the lower half back into the page background */}
        <rect x="30" y="430" width="940" height="540" fill="url(#globe-fade)" />
      </g>

      {/* Soft atmospheric rim, then a crisp highlight over it */}
      <circle
        cx="500"
        cy="500"
        r="468"
        fill="none"
        stroke="url(#globe-rim)"
        strokeWidth="18"
        opacity="0.6"
        filter="url(#globe-blur)"
      />
      <circle
        cx="500"
        cy="500"
        r="468"
        fill="none"
        stroke="url(#globe-rim)"
        strokeWidth="1.5"
      />
    </svg>
  )
}
