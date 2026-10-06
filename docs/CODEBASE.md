# How the portfolio works

A guide to the code on `main`: where the page starts, what each part does, and how a theme switch flows
through it. Produced with the Bearing `explain-codebase` skill. Line numbers refer to commit `134ef30`.

## In short

A static Vite + React 19 single-page site. There is no backend and no network call; the contact form only
builds a `mailto:` link. Theme state lives in two attributes on `<html>`, `data-style` (`lime` or
`terminal`) and `data-appearance` (`light`, `dark` or `system`). A small script sets them before React
loads, `src/theme/preferences.ts` reads and writes them, and the CSS turns them into colours.

## Entry points

| Where | What happens |
| --- | --- |
| `index.html` | Loads `public/theme-init.js` (blocking), then `src/main.tsx` |
| `public/theme-init.js` | Before first paint: reads the saved style and mode from localStorage, lets `?style=` and `?mode=` in the URL override them, and sets both attributes on `<html>` |
| `src/main.tsx` | `createRoot` renders `<App />` in StrictMode |
| `package.json` scripts | `dev`, `build` (`tsc -b && vite build`), `lint` (oxlint), `preview` |
| `Makefile` | `make check` runs lint and build (the gate) |
| `.githooks/pre-push` | Runs the gate before every push |

## Module map

| Path | Role |
| --- | --- |
| `src/App.tsx` | Page frame: picks the skin class (`skin-lime` / `skin-terminal`) and the hero, then lays out every section |
| `src/sections/Header.tsx` | Sticky header, navigation with the active-section marker, `ThemeMenu`, resume link, phone menu, and the scrolling `ToolStrip` |
| `src/sections/LimeHero.tsx` | Lime Editorial hero (anime.js entrance) |
| `src/sections/TerminalHero.tsx` | Dark & Techy hero: typed boot sequence and the interactive command console |
| `src/sections/Sections.tsx` | About (with the profile card), Experience, Projects, Skills and tech stack, QA Lab, How I test, QA × AI, Contact, Footer |
| `src/sections/SectionHead.tsx` | Section label and heading; the label reads `/ About me` in Lime and `~/sai $ cat about.md` in Techy |
| `src/data/portfolio.ts` | All page content and copy |
| `src/data/toolMarks.ts` | Brand icon paths (Simple Icons, CC0) and stand-ins |
| `src/components/ToolIcon.tsx`, `Icon.tsx` | Tool logos and the small UI icon set |
| `src/components/ThemeMenu.tsx` | The Style and Mode picker |
| `src/theme/preferences.ts` | Theme options, defaults, the `useThemePreferences` hook and `applyPreferences` |
| `src/hooks/useContactForm.ts` | Contact form state and validation; submit opens an email draft |
| `src/index.css` | Colour tokens for both styles in light and dark, base element styles |
| `src/styles/site.css` | Shared layout and components |
| `src/styles/lime.css`, `terminal.css` | Each style's look and its hero |

## Trace: switching the theme

1. `Header.tsx` renders `<ThemeMenu />`; opening it shows the Style and Mode radios.
2. Choosing an option calls `apply` in `ThemeMenu.tsx`. When the **style** changes (and the browser supports
   it and reduced motion is off), the change runs inside `document.startViewTransition` for a cross-fade.
3. `applyPreferences` in `preferences.ts` sets `data-style` and `data-appearance` on `<html>`, saves both to
   localStorage (failures are ignored), and dispatches the `portfolio-theme-change` event.
4. Every `useThemePreferences` user re-reads the attributes: `App.tsx`, `Header.tsx`, `SectionHead.tsx` and
   `ThemeMenu.tsx`.
5. React re-renders: `App.tsx` swaps the skin class and the hero, `Header.tsx` swaps the brand, and
   `SectionHead.tsx` swaps the section labels.
6. CSS does the colouring: `index.css` picks the token set by `data-style`, then maps light, dark or system
   (system follows `prefers-color-scheme`). A **mode-only** change needs no React output; CSS reacts to
   `data-appearance` directly.
7. On the next visit, `theme-init.js` reads the saved choice back before the page paints.

## Where a theme rule lives (change all copies together)

- Style list, defaults and storage keys: `src/theme/preferences.ts` and `public/theme-init.js`.
- Colour tokens: `src/index.css`.
- Swatch colours in the theme menu: `src/styles/site.css` (`.theme-swatch-*`, hard-coded hex values).
- Style checks in components (`=== 'terminal'`): `App.tsx`, `Header.tsx`, `SectionHead.tsx`.

## Known gaps

- A `?style=` or `?mode=` URL parameter wins on every load: open a `?style=terminal` link, choose Lime,
  reload, and the page returns to Terminal while the parameter stays in the address bar.
- There is no `storage` listener, so a second open tab keeps the old theme until it reloads.
- `src/hooks/useMediaQuery.ts` is not imported anywhere.
- `AGENTS.md` says `src/App.tsx` renders every section; the sections now live in `src/sections/Sections.tsx`.
