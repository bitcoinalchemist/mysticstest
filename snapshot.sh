#!/usr/bin/env bash
# snapshot.sh — version the tools site before editing
# Usage: bash snapshot.sh "brief description of upcoming change"
#
# Creates versions/vN_TIMESTAMP/ with copies of all site files,
# then prints the CHANGELOG entry for Claude to append via Edit tool.
# (The bash mount is append-restricted on existing files, so CHANGELOG
#  is updated by the host file tool, not this script.)

set -euo pipefail

DESC="${1:-snapshot}"
SUPER="$(cd "$(dirname "$0")" && pwd)"
VERSIONS="$SUPER/versions"

# Find current max version number
CURRENT=$(ls "$VERSIONS" | grep -E '^v[0-9]+_' | sed 's/^v//' | cut -d_ -f1 | sort -n | tail -1)
CURRENT=${CURRENT:-0}
NEXT=$((CURRENT + 1))

TS=$(date +%Y%m%d-%H%M%S)
DIR="$VERSIONS/v${NEXT}_${TS}"

mkdir -p "$DIR"

# Copy all site files
FILES=(index.html iching.html bip39.html calculator.html quadration.html dozenal.js site.css ichingdata.js linedata.js)
COPIED=()
for f in "${FILES[@]}"; do
  if [ -f "$SUPER/$f" ]; then
    cp "$SUPER/$f" "$DIR/$f"
    COPIED+=("$f")
  fi
done

echo ""
echo "✓ Snapshot saved: versions/v${NEXT}_${TS}/"
echo "  Files: ${COPIED[*]}"
echo ""
echo "Add this line to versions/CHANGELOG.txt:"
echo "v${NEXT} — ${TS} — ${DESC}"
echo ""
