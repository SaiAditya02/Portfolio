@AGENTS.md

# CLAUDE.md

Claude Code specifics for this repository; the standard is AGENTS.md above.

```
Repository:   Sai Aditya QA Portfolio (github.com/SaiAditya02/Portfolio)
Stack:        React 19 + TypeScript + Vite, npm; static site, no backend
Run, gate:    make dev; make check (or npm run lint && npm run build)
Git host:     github
Trunk:        main (owner commits and pushes directly)
```

Hooks in `.claude/settings.json` run the repository's Bearing guard
(`.bearing/bin/brg-guard`): every Bash command is checked and push, publish,
deploy, history rewriting and destructive commands are refused; every edited
JS/TS file is linted with oxlint. A command containing the guard's parse
sentinel string is refused too: write such files with the Write tool.

## Things the agent gets wrong in this repository

Add a line each time a mistake repeats; delete lines that stop applying.
