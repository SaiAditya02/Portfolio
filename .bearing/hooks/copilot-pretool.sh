#!/usr/bin/env bash
# copilot-pretool.sh: block publishing, history rewriting, deploy and destructive commands (copilot).
# A command that cannot be read (no jq, bad JSON, missing key) is refused: fail closed.
here="$(cd "$(dirname "$0")/.." && pwd)"
cmd="$(cat | bash "$here/hooks/read-json.sh" toolArgs.command toolArgs.cmd tool_input.command)"
if msg="$(bash "$here/bin/brg-guard" command "$cmd" 2>&1)"; then
  case "copilot" in cursor) printf '{"permission":"allow"}\n';; esac
  exit 0
fi
q="$(printf '%s' "$msg" | jq -R . 2>/dev/null || printf '"%s"' "$msg")"
case "copilot" in
  cursor)  printf '{"permission":"deny","user_message":%s,"agent_message":%s}\n' "$q" "$q"; exit 0;;
  gemini)  printf '{"decision":"deny","reason":%s}\n' "$q";;
  copilot) printf '{"permissionDecision":"deny","permissionDecisionReason":%s}\n' "$q";;
  cline)   printf '{"cancel":true,"errorMessage":%s}\n' "$q";;
  *)       echo "$msg" >&2;;
esac
exit 2
