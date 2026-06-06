#!/usr/bin/env bash
# serve.sh — start a local dev server for the tools site
# Usage: bash serve.sh [port]
# Then open http://localhost:8080 (or your chosen port) in a browser.

PORT="${1:-8080}"
DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "  mysticscards.space — local dev server"
echo "  ──────────────────────────────────────"
echo "  Serving: $DIR"
echo "  URL:     http://localhost:${PORT}"
echo ""
echo "  Pages:"
echo "    http://localhost:${PORT}/index.html"
echo "    http://localhost:${PORT}/iching.html"
echo "    http://localhost:${PORT}/bip39.html"
echo "    http://localhost:${PORT}/calculator.html"
echo "    http://localhost:${PORT}/quadration.html"
echo ""
echo "  Ctrl+C to stop."
echo ""

cd "$DIR"
python3 -m http.server "$PORT"
