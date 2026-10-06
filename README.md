# Sai Aditya — QA Portfolio

Personal portfolio site for Sai Aditya, QA Engineer. It covers the profile, experience, selected projects, the QA toolkit, an interactive QA Lab of login test scenarios, the testing process, QA with AI, and contact details.

The site has two switchable themes, **Lime Editorial** and **Dark & Techy**, each with Light, Dark and System modes.

## Run it locally

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and build to dist/
npm run preview  # serve the built site
npm run lint     # oxlint
```

With `make` installed:

```bash
make setup   # npm install and the git hooks (once per clone)
make check   # the gate: lint, type-check and build
```

## Tech stack

| | Technology | Version | Used for |
| :---: | --- | --- | --- |
| <img src="https://cdn.simpleicons.org/react" width="28" height="28" alt="React"> | **React** | 19 | The user interface, built from components |
| <img src="https://cdn.simpleicons.org/typescript" width="28" height="28" alt="TypeScript"> | **TypeScript** | 6 | Typed code, checked with `tsc -b` on every build |
| <img src="https://cdn.simpleicons.org/vite" width="28" height="28" alt="Vite"> | **Vite** | 8 | Dev server and production build (`@vitejs/plugin-react`) |
| <img src="https://cdn.simpleicons.org/animedotjs" width="28" height="28" alt="anime.js"> | **anime.js** | 4 | Hero entrances and the terminal typing |
| <img src="https://cdn.simpleicons.org/framer" width="28" height="28" alt="Motion (formerly Framer Motion)"> | **Motion** (formerly Framer Motion) | 14 | Navigation marker, open and close panels, and scroll effects (`motion/react`) |
| <img src="https://cdn.simpleicons.org/css" width="28" height="28" alt="CSS"> | **CSS** | | Plain CSS: colour tokens in `src/index.css`, shared layout in `src/styles/site.css`, one file per theme |
| <img src="https://cdn.simpleicons.org/googlefonts" width="28" height="28" alt="Google Fonts"> | **Google Fonts** | | Urbanist, Cormorant Garamond, Archivo and JetBrains Mono |
| <img src="https://cdn.simpleicons.org/simpleicons/111111/ffffff" width="28" height="28" alt="Simple Icons"> | **Simple Icons** | | Tool logos (CC0), copied into the project; brands it lacks use a simple stand-in |
| <img src="https://cdn.simpleicons.org/oxc" width="28" height="28" alt="Oxc"> | **oxlint** | 1 | Linting; with `tsc -b` and `vite build`, it runs in a git hook before every push |
| <img src="https://cdn.simpleicons.org/npm" width="28" height="28" alt="npm"> | **npm** | | Package manager, locked with `package-lock.json` |
| <img src="https://cdn.simpleicons.org/vercel/000000/ffffff" width="28" height="28" alt="Vercel"> | **Vercel** | | Hosting: a static site that redeploys on every push to `main` |

- **Themes:** Lime Editorial and Dark & Techy, each in Light, Dark or System mode. The choice is remembered in the browser. A link can pick one with `?style=lime|terminal` and `?mode=light|dark|system`.
- **No backend:** the contact form opens an email draft.

## Built with Bearing

### Used

The repository was set up and documented with these Bearing skills:

| Skill | What it added |
| --- | --- |
| `new-repo` | The starting repository: project scaffold and the base structure for commands, hooks and agent rules |
| `tech-decision` | The technology choices: options weighed and the stack chosen for the site |
| `onboard-repo` | The project conventions: `Makefile` commands, `AGENTS.md` and `CLAUDE.md` rules for AI agents, and the `.bearing/` safety guard that stops agents from pushing, deploying or rewriting history |
| `git-hooks` | The hooks in `.githooks/`: commit-message checks, and lint and build before every push |
| `harness-setup` | The same rules and hooks for Codex (`.codex/`) and GitHub Copilot (`.github/`) |
| `prd` | The product requirements in `docs/product/PRD.md` |
| `backlog` | The user story, requirement coverage and open questions in `docs/product/` |

### Used indirectly (through Impeccable)

- `themes`: the two themes, Lime Editorial and Dark & Techy, each with Light, Dark and System modes, built during the Impeccable design work.
- `motion-design`: the anime.js and Motion animations, designed through Impeccable.

### Planned

| Skill | What it will add |
| --- | --- |
| `explain-codebase` | A read-only guide to how the site fits together |
| `docs-drift` | Fixes for docs that no longer match the code, such as `AGENTS.md` and `CLAUDE.md` |
| `deployment-architecture` | How the site is built and served on Vercel, with a diagram |
| `design-critique` | A scored review of both themes at desktop, tablet and phone widths |
| `screen-design` | Mockups of every screen and state of the current design |
| `simplify-code` | Removal of code the site does not need |
| `refactor` | Clean-up that keeps the site behaving exactly the same |
| `merge-request` | Prepared descriptions for larger changes before they are merged |
| `verify-deploy` | A check of the live Vercel site after each deploy |

Other skills: **Impeccable** was used for the visual design work, including the design directions and the redesigns.

## Where things live

| What | Where |
| --- | --- |
| Page content (profile, experience, projects, skills, QA Lab, contact details, links, page copy) | `src/data/portfolio.ts` |
| Page layout and sections | `src/App.tsx` (puts the page together), `src/sections/Sections.tsx` (about, experience, projects, skills, QA Lab, process, QA × AI, contact, footer) |
| Header and the two heroes | `src/sections/Header.tsx`, `src/sections/LimeHero.tsx`, `src/sections/TerminalHero.tsx` |
| Shared layout and tokens | `src/index.css` (colour tokens), `src/styles/site.css` (shared layout) |
| The two designs (Lime Editorial, Dark & Techy), each dark and light | `src/styles/lime.css`, `src/styles/terminal.css` |
| Design and light/dark/system switcher | `src/components/ThemeMenu.tsx`, `src/theme/preferences.ts`, `public/theme-init.js` |
| Tool logos | `src/data/toolMarks.ts`, `src/components/ToolIcon.tsx` |
| Contact form logic | `src/hooks/useContactForm.ts` |
| Resume PDF | `public/SaiAdityaResume.pdf` |
| Product documents | `docs/product/` |

Most updates only need changes to `src/data/portfolio.ts`. If you change the theme list or defaults, change `src/theme/preferences.ts` and `public/theme-init.js` together.
