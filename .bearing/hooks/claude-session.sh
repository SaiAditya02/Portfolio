#!/usr/bin/env bash
# claude-session.sh (Claude Code SessionStart): the guard's session report.
here="$(cd "$(dirname "$0")/.." && pwd)"
j="$(cat)"
id="$(printf '%s' "$j" | bash "$here/hooks/read-json.sh" session_id)"
src="$(printf '%s' "$j" | bash "$here/hooks/read-json.sh" source)"
exec bash "$here/bin/brg-guard" session --id "$id" --source "$src"
