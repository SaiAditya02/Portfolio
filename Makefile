# Every command for this repository. `make help` lists them; `make check` is
# the gate (there is no CI yet, so it is the only one: lint, type-check, build).
SHELL := /usr/bin/env bash
.DEFAULT_GOAL := help
.PHONY: help setup install dev build lint check check-file preview

help: ## list the targets
	@grep -E '^[a-z-]+:.*## ' $(MAKEFILE_LIST) | awk -F':.*## ' '{printf "  %-12s %s\n", $$1, $$2}'

setup: install ## install dependencies and the git hooks (once per clone)
	bash .githooks/install.sh

install: ## npm install from the lockfile
	npm install

dev: ## start the Vite dev server
	npm run dev

build: ## type-check (tsc -b) and build to dist/
	npm run build

lint: ## oxlint over the repository
	npm run lint

preview: build ## serve the built site
	npm run preview

check: ## the gate: lint, then type-check and build
	npm run lint
	npm run build
	@mkdir -p .bearing/state && touch .bearing/state/.check-passed

check-file: ## lint one file: make check-file FILE=src/App.tsx
	@test -n "$(FILE)" || { echo "usage: make check-file FILE=<path>" >&2; exit 2; }
	@case "$(FILE)" in \
	  *.ts|*.tsx|*.js|*.jsx|*.mjs|*.cjs) npx --no-install oxlint --deny-warnings "$(FILE)";; \
	  *) echo "$(FILE): no linter for this file type";; \
	esac
