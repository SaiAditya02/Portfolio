#!/usr/bin/env bash
# codex-session.sh (SessionStart, every source): the guard's session report;
# on source compact it includes the snapshot codex-precompact.sh wrote.
here="$(cd "$(dirname "$0")/.." && pwd)"
j="$(cat)"
id="$(printf '%s' "$j" | bash "$here/hooks/read-json.sh" session_id)"
src="$(printf '%s' "$j" | bash "$here/hooks/read-json.sh" source)"
exec bash "$here/bin/brg-guard" session --id "$id" --source "$src"
