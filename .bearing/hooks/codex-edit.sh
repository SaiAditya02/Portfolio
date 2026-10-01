#!/usr/bin/env bash
# codex-edit.sh (PostToolUse, apply_patch): format and lint every file the
# patch adds or updates; problems go back as {"decision": "block"}.
here="$(cd "$(dirname "$0")/.." && pwd)"
patch="$(cat | bash "$here/hooks/read-json.sh" tool_input.command tool_input.input)"
root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
problems=""
while IFS= read -r f; do
  [ -n "$f" ] || continue
  case "$f" in /*) ;; *) f="$root/$f";; esac
  bash "$here/bin/brg-guard" format "$f" >/dev/null 2>&1
  e="$(bash "$here/bin/brg-guard" check-file "$f" 2>&1 >/dev/null)" || problems="$problems${problems:+
}$e"
done <<LIST
$(printf '%s\n' "$patch" | sed -n 's/^\*\*\* Add File: //p; s/^\*\*\* Update File: //p; s/^\*\*\* Move to: //p')
LIST
if [ -n "$problems" ] && command -v jq >/dev/null 2>&1; then jq -n --arg r "$problems" '{decision: "block", reason: $r}'; fi
exit 0
