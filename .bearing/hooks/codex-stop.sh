#!/usr/bin/env bash
# codex-stop.sh (Stop): {"decision": "block"} once when files this session
# changed have not passed make check; stop_hook_active only reminds. Codex
# wants JSON on stdout for exit 0, so every other outcome prints {}.
here="$(cd "$(dirname "$0")/.." && pwd)"
j="$(cat)"
id="$(printf '%s' "$j" | bash "$here/hooks/read-json.sh" session_id)"
set -- --id "$id"
[ "$(printf '%s' "$j" | bash "$here/hooks/read-json.sh" stop_hook_active)" = "true" ] && set -- "$@" --active
err="$(mktemp)"; bash "$here/bin/brg-guard" stop-gate "$@" >/dev/null 2>"$err"; rc=$?
if [ "$rc" -eq 2 ] && command -v jq >/dev/null 2>&1; then jq -n --arg r "$(cat "$err")" '{decision: "block", reason: $r}'; else echo '{}'; fi
rm -f "$err"
