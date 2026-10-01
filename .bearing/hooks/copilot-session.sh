#!/usr/bin/env bash
here="$(cd "$(dirname "$0")/.." && pwd)"
cat >/dev/null; exec bash "$here/bin/brg-guard" session
