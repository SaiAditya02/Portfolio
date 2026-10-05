#!/usr/bin/env bash
# claude-pretool.sh (Claude Code PreToolUse, Bash): block publishing, history
# rewriting, deploy and destructive commands. Exit 2 with the reason on
# stderr blocks the call; an unreadable command is refused (fail closed).
here="$(cd "$(dirname "$0")/.." && pwd)"
cmd="$(cat | bash "$here/hooks/read-json.sh" tool_input.command)"
msg="$(bash "$here/bin/brg-guard" command "$cmd" 2>&1)" && exit 0
echo "$msg" >&2
exit 2
