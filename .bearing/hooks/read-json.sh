#!/usr/bin/env bash
# read-json.sh <dot.path> [<dot.path> ...]: print the first non-empty field of
# the JSON on stdin. jq is required: without it the sentinel __BRG_UNPARSED__
# is printed and brg-guard refuses the command (fail closed). Invalid JSON or
# a missing key prints nothing, which the guard also refuses. A step that
# lands on a string holding JSON is decoded before descending (Copilot CLI may
# send toolArgs as a JSON string; the hooks docs show an object); a string
# that is not JSON, or a non-object, ends the walk with nothing.
j="$(cat)"
if ! command -v jq >/dev/null 2>&1; then echo "bearing: jq is required by the hooks; install jq" >&2; printf '%s' "__BRG_UNPARSED__"; exit 0; fi
for p in "$@"; do
  v="$(printf '%s' "$j" | jq -r --arg p "$p" 'reduce ($p | split("."))[] as $k (.;
    (if type == "string" then (fromjson? // null) else . end)
    | if type == "object" then .[$k] else null end) // empty' 2>/dev/null)" || v=""
  [ -z "$v" ] || { printf '%s' "$v"; exit 0; }
done
exit 0
