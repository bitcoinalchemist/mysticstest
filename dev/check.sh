#!/usr/bin/env bash
# check.sh — verify structural consistency across all site pages
# Usage: bash dev/check.sh  (run from Super root, or: bash check.sh from inside dev/)
# Exits 0 if all checks pass, 1 if any fail.

# Site files live one level up from this script
DIR="$(cd "$(dirname "$0")/.." && pwd)"
PAGES=(index.html iching.html bip39.html calculator.html quadration.html)
NAV_LINKS=("quadration.html" "calculator.html" "iching.html" "bip39.html")

PASS=0
FAIL=0

ok()   { echo "  ✓ $1"; PASS=$((PASS+1)); }
fail() { echo "  ✗ $1"; FAIL=$((FAIL+1)); }

echo ""
echo "mysticscards.space — site check"
echo "────────────────────────────────"

for page in "${PAGES[@]}"; do
  FILE="$DIR/$page"
  echo ""
  echo "[$page]"

  if [ ! -f "$FILE" ]; then
    fail "file not found"
    continue
  fi

  # site.css linked
  grep -q 'href="site\.css"' "$FILE" \
    && ok "site.css linked" \
    || fail "site.css NOT linked"

  # Google Fonts
  grep -q 'fonts.googleapis.com' "$FILE" \
    && ok "Google Fonts present" \
    || fail "Google Fonts missing"

  # Site header
  grep -q 'class="site-header"' "$FILE" \
    && ok "site-header present" \
    || fail "site-header missing"

  # Site footer
  grep -q 'class="site-footer"' "$FILE" \
    && ok "site-footer present" \
    || fail "site-footer missing"

  # Burger script
  grep -q 'burgerBtn' "$FILE" \
    && ok "burger script present" \
    || fail "burger script missing"

  # All four nav links
  for link in "${NAV_LINKS[@]}"; do
    grep -q "href=\"${link}\"" "$FILE" \
      && ok "nav link: $link" \
      || fail "nav link MISSING: $link"
  done

  # Exactly one active nav item (index.html is exempt — it's the hub)
  COUNT=$(grep -oE '<a href="[^"]+\.html" class="[^"]*active[^"]*"' "$FILE" | wc -l | tr -d ' ')
  if [ "$page" = "index.html" ]; then
    ok "active nav item skipped (hub page)"
  elif [ "$COUNT" -eq 1 ]; then
    ok "exactly one nav item active"
  elif [ "$COUNT" -eq 0 ]; then
    fail "no active nav item (add class=\"active\" to current page's link)"
  else
    fail "multiple active nav items ($COUNT) — should be exactly 1"
  fi

  # No stale inline header CSS (a sign the site-header block wasn't removed)
  if grep -q '\.sh-nav\.open\s*{' "$FILE"; then
    fail "stale inline header CSS detected (site-header styles should be in site.css only)"
  else
    ok "no stale inline header CSS"
  fi

done

echo ""
echo "────────────────────────────────"
printf "  %d passed  |  %d failed\n" "$PASS" "$FAIL"
echo ""

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
