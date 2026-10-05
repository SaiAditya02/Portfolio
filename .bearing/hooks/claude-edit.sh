#!/usr/bin/env bash
# claude-edit.sh (Claude Code PostToolUse, Edit|Write): lint the edited file
# (make check-file, or the guard's per-language fallback). Problems go back
# to the agent on stderr with exit 2.
here="$(cd "$(dirname "$0")/.." && pwd)"
f="$(cat | bash "$here/hooks/read-json.sh" tool_input.file_path)"
[ -n "$f" ] && [ "$f" != "__BRG_UNPARSED__" ] && [ -f "$f" ] || exit 0
command -v make >/dev/null 2>&1 && exec bash "$here/bin/brg-guard" check-file "$f"
# No make on this machine: run the Makefile's check-file recipe directly.
case "$f" in *.ts|*.tsx|*.js|*.jsx|*.mjs|*.cjs) ;; *) exit 0;; esac
cd "$(git -C "$(dirname "$f")" rev-parse --show-toplevel 2>/dev/null || dirname "$f")" || exit 0
out="$(npx --no-install oxlint --deny-warnings "$f" 2>&1)" && exit 0
{ echo "oxlint found problems in $f. Fix them before moving on:"; printf '%s\n' "$out" | head -40; } >&2
exit 2
