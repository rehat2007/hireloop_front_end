<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# HireLoop frontend

Early-stage marketing site with an auth scaffold. Next.js App Router (16.4.3, React 19.3.1, TypeScript strict), no `src/`; `app/`, `components/`, `hooks/`, and `lib/` sit at the repo root and resolve through `@/*`. `README.md` is empty, so this file is the practical source of truth.

## Commands

npm only (`package-lock.json`). Node.js 20.9+ is required by Next 16.

- `npm run dev` — dev server on http://localhost:3000. Turbopack is the default in Next 16; do not add `--turbopack`.
- `npm run lint` — ESLint flat config (`eslint`); `next lint` was removed in Next 16.
- `npm run typecheck` — `tsc --noEmit`. Only `**/*.ts`/`*.tsx` are checked, so `app/signin/page.jsx` and `app/signup/page.jsx` are not typechecked.
- `npm run format` — Prettier, but only `**/*.{ts,tsx}`. The `.jsx` auth pages are skipped; format them by hand or widen the glob deliberately.
- `npm run build` — production build, including the TypeScript check.

There is no test runner, test file, CI workflow, or pre-commit hook. Do not run `npm test`. Verify with `npm run lint`, then `npm run typecheck` (or `npm run build`).

## Auth (Better Auth + MongoDB)

- Server config: `lib/auth.ts`; mounted at `app/api/auth/[...all]/route.ts` via `toNextJsHandler(auth)`. Client helpers: `lib/auth-client.ts`.
- `lib/auth.ts` throws at import time if `MONGODB_URI` is unset, so dev, build, or any route that imports it needs `.env` present.
- `auth-client.ts` creates two clients: `authClient` has `baseURL: "http://localhost:3000"`, while the destructured `signIn`, `signUp`, and `useSession` come from a second `createAuthClient()` with no base URL. Prefer the configured `authClient` when adding calls.
- `app/signin` and `app/signup` authenticate through `authClient.signIn.email` / `authClient.signUp.email`, then redirect to `/`; sign-up relies on Better Auth's default auto-sign-in. Both files are `.jsx`, so ESLint covers them but `typecheck` and `format` do not.
- Required env (`.env`, gitignored): `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`, `MONGODB_URI`. The local `.env` holds live Atlas credentials — never commit, print, or hardcode them.

## UI and styling

- shadcn/ui config is `components.json`: style `base-nova`, RSC/TSX, aliases `@/components`, `@/components/ui`, `@/lib/utils`, `@/hooks`. Add components with `npx shadcn@latest add <name>`.
- Generated components use Base UI (`@base-ui/react`), not Radix. `@/components/ui` does not exist yet and `hooks/` is empty; running `npx shadcn@latest add` creates `components/ui` as needed.
- Tailwind CSS v4 is CSS-first: there is no `tailwind.config.*`. `app/globals.css` only imports `tailwindcss`, `tw-animate-css`, and `shadcn/tailwind.css`.
- `lib/utils.ts` re-exports `cn` from the `cn` npm package. Keep importing `cn` from `@/lib/utils`; do not replace it with clsx/tailwind-merge.
- Prettier conventions: no semicolons, double quotes, LF, 2 spaces, 80 columns, ES5 trailing commas, Tailwind class sorting, with `cn`/`cva` recognized. Run `npm run format` after TS/TSX changes.
- The UI is dark-only and mostly uses hardcoded zinc/indigo hexes (e.g. `#08080b`, `#5b5bf5`) plus gradient utilities rather than theme tokens. Match the surrounding component instead of introducing a new token system.

## Next.js 16 differences

- Request APIs are async-only: `const { id } = await params`, `const q = await searchParams`, `await cookies()`, `await headers()`. Synchronous access was removed in 16.
- `middleware.ts` is deprecated; use `proxy.ts` with an exported `proxy` function (Node.js runtime only).
- Before using an unfamiliar API, read the version-matched docs under `node_modules/next/dist/docs/`; the migration guide is `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`.
