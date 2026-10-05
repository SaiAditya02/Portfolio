# Sai Aditya — QA Portfolio

Personal portfolio site for Sai Aditya, QA Engineer. It covers experience, selected projects, the QA toolkit, an interactive QA Lab of login test scenarios, and contact details.

Built with React 19, TypeScript and Vite.

## Run it locally

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and build to dist/
npm run preview  # serve the built site
npm run lint     # oxlint
```

## Where things live

| What | Where |
| --- | --- |
| Page content (experience, projects, skills, contact details, links) | `src/data/portfolio.ts` |
| Page layout and sections | `src/App.tsx` |
| Styles | `src/index.css`, `src/App.css` |
| Theme switcher (palette and light/dark/system) | `src/components/ThemeSwitcher.tsx`, `src/theme/preferences.ts`, `public/theme-init.js` |
| Resume PDF | `public/SaiAdityaResume.pdf` |

Most updates only need changes to `src/data/portfolio.ts`.
