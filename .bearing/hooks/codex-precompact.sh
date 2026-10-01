#!/usr/bin/env bash
# codex-precompact.sh (PreCompact): write the snapshot SessionStart (compact)
# reads back. Codex ignores plain stdout here, so nothing is printed.
here="$(cd "$(dirname "$0")/.." && pwd)"
t="$(cat | bash "$here/hooks/read-json.sh" transcript_path)"
bash "$here/bin/brg-guard" precompact "$t" >/dev/null 2>&1
exit 0
