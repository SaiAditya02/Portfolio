# AGENTS.md

The standard every AI coding agent follows in this repository (Claude Code,
Codex, Copilot, Cursor). It loads into every session, so it holds only what
applies on every turn.

## What this is

Sai Aditya's personal QA portfolio: one static single-page site.

- React 19, TypeScript 6, Vite 8, npm (`package-lock.json`). No backend, no
  database, no tests yet, no CI.
- Content lives in `src/data/portfolio.ts`; `src/App.tsx` renders every
  section. Most changes are content changes in the data file.
- Theme: `public/theme-init.js` runs before React and repeats the palette
  list, defaults and storage keys of `src/theme/preferences.ts`. Change both
  together.
- `public/SaiAdityaResume.pdf` is served as is; link to `/SaiAdityaResume.pdf`.

## Commands

| Command | What it runs |
| --- | --- |
| `make check` | the gate: `npm run lint` (oxlint) then `npm run build` (`tsc -b && vite build`) |
| `make check-file FILE=<path>` | oxlint with warnings as errors on one file |
| `make dev` | Vite dev server |
| `make setup` | `npm install` and the git hooks |

`make` is not installed on every machine here. Without it, run the npm
scripts directly: `npm run lint && npm run build` is the gate.

## Ground rules

1. Never push, open a pull request, merge, tag, publish or deploy. Prepare the
   command and hand it to the owner. The guard in `.bearing/` refuses these.
2. Commit only when the owner asks. The owner commits straight to `main` with
   short free-form subjects ("Resume Update"); follow that format.
3. Never commit a secret, key or `.env` file, and never read one into context.
4. Never rewrite history: no amend, rebase, force-push, `reset --hard`.
5. Never weaken a check to go green: no lint suppression, no `any` or
   `@ts-ignore`, no relaxed TypeScript option.
6. Never add a dependency nobody asked for; propose it with the reason.
7. Stay in scope. What you notice in passing goes under "Noticed", unfixed.
8. Report honestly: a check you did not run is "not run", never "passing".

## Traps

- Contact details are defined once in `contact` and `socials` in
  `src/data/portfolio.ts`; never hard-code an email, phone or profile URL in
  `App.tsx`.
- `contact.phone` is still a placeholder until the owner supplies the number.
- `src/assets/avatar.png` (about 1 MB) and `hero-profile.png` (about 1.5 MB)
  are large; prefer compressed images for new assets.

## Reporting

End every task with `## Changed` (path: what and why), `## Verified` (the
command and the tail of its output), `## Not done`, `## Noticed`.
