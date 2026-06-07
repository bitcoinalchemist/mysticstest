# Tools Site — CLAUDE.md

Project brief for Claude. Read this at the start of every session.

---

## Overview

A hub site (`index.html`) linking to standalone tool pages. All files live together in this folder. Links are relative (no build step, no framework).

**Live URL base:** mysticscards.space

---

## File inventory

**Site files (root — deployed to GitHub):**

| File | Purpose |
|------|---------|
| `index.html` | Hub — two large cards (Card of Life, I Ching) + tools pill-row below |
| `cardsoflife.html` | Card of Life — full playing card engine: Finder, annual spread grid, personal cards, relationship tool |
| `quadrations.html` | Standalone annual spread grid tool (age selector + card popup) |
| `iching.html` | I Ching oracle — cast readings + 8×8 hexagram grid (collapsed by default, toggled by Fu Xi/King Wen buttons) |
| `hexagrams.html` | Standalone 8×8 hexagram grid tool (always open, popup on click) |
| `bip39.html` | I Ching × BIP39 — binary encoding of hexagrams for Bitcoin mnemonics (kept, not on homepage) |
| `calculator.html` | Dozenal calculator — exact rational arithmetic, BIN/DEC/DOZ/HEX modes |
| `site.css` | **Shared CSS** — design tokens, reset, typography, site header/nav. All pages link this. |
| `site.js` | **Shared nav injector** — injects header + nav into every page. Edit `NAV` array here to add/rename pages. |
| `cardsdata.js` | Card data and shared functions: `CARDS`, `SPREAD_CARDS`, `SPREAD_PLANETS`, `deckAtAge()`, `spreadCardPips()`, `openCompareCard()`, `closeCompareCard()`, `renderLifeScriptInto()`, `cardPlanetLabel()`, `SUBTITLES`, `VOWS` |
| `dozenal.js` | Calculator logic (exact rational arithmetic) |
| `ichingdata.js` | `window.HEX_DATA` — 64 Sage-voice oracle answers (keyed by King Wen number 1–64) |
| `linedata.js` | `window.LINE_DATA` — 384 Sage-voice moving-line texts (keyed by King Wen number; each has keys `1`–`6`) |
| `iching-oracle-64-hexagrams.md` | Source text for all 64 hexagram answers (King Wen order). If edited, regenerate `ichingdata.js`. |
| `iching-oracle-384-lines.md` | Source text for all 384 moving-line answers. If edited, regenerate `linedata.js`. |

**Dev tooling (`dev/` — not deployed):**

| File | Purpose |
|------|---------|
| `dev/_template.html` | Boilerplate for new pages |
| `dev/check.sh` | Consistency checker — run with `bash dev/check.sh` |
| `dev/serve.sh` | Local dev server |

**Other folders:**
- `versions/` — manual snapshots (cp of all site files). Take one before each editing session.
- `Memories/` — memory files from previous sessions (readable; not auto-loaded, but the important stuff is in this CLAUDE.md).

---

## Current nav (site.js NAV array)

```js
var NAV = [
  { href: 'cardsoflife.html',  label: 'Card of Life'  },
  { href: 'calculator.html',  label: 'Calculator'    },
  { href: 'iching.html',      label: 'I Ching'       },
  { href: 'hexagrams.html',   label: 'Hexagrams'     },
  { href: 'quadrations.html', label: 'Quadrations'   },
];
```

`bip39.html` is NOT in the nav — it will be integrated into the I Ching page later.

To add a page: edit the `NAV` array in `site.js` only. Active link is auto-detected from filename.

---

## Design system

**Theme:** Parchment / serif / gold. All pages share this.

**Canonical tokens** (defined in `site.css`):
- Background: `--bg: #f7f2ea`
- Surface: `--surface: #fdfaf5`, `--surface-alt: #f0e9da`
- Text: `--text: #1a1916`
- Accent (navy): `--accent: #1e2340`
- Gold: `--gold: #b5864a`
- Rule lines: `--rule: #e2d9cc`, `--rule-strong: #c9bfb0`
- Fonts: `--serif` = Cormorant Garamond, `--sans` = Inter, `--mono` = SFMono-Regular

**Google Fonts:** Cormorant Garamond + Inter (all pages); JetBrains Mono (calculator only); Lora (quadration + quadrations).

**Site header** — sticky dark navy bar (`#1e2340`), injected by `site.js`. Defined in `site.css`.

---

## I Ching data

- Bit string: **left→right = lines 1→6 (bottom→top)**, LSB is the top line.
- `HEX_DATA[n]` → oracle answer, keyed by King Wen number (1-indexed). Fields: `name`, `trig`, `image`, `paras[2]`, `shadow`, `keynote`.
- `LINE_DATA[kw]` → object with keys `1`–`6`, each a Sage-voice moving-line text. Keyed by King Wen number.
- Binary value (0–63) → King Wen map lives in `iching.html` as `VAL_TO_KW`.

### Sage voice rules (hard constraints — do not deviate)

These apply to all I Ching oracle text, both hexagram answers and moving lines:

1. The Sage speaks directly to "you". Never a scholar describing from outside.
2. Divination-guide register: it answers the situation. No meta-language ("you have asked", "the answer is").
3. No em dashes or en dashes.
4. Banned words: journey, path, universe, enlightenment.
5. Avoid "X, not Y" constructions — say what the thing is.
6. One breath sensory image line; two short counsel paragraphs; one shadow sentence; one italic keynote.

---

## cardsoflife.html notes

- Large file (2600+ lines). Has its own `:root` with `--text-primary`, `--text-muted`, `--text-secondary` — do NOT rename, they're used throughout.
- Finder date dropdowns are **Day / Month** order (not Month / Day).
- The "Minimise" toggle button sits between the planets row and the dates row in the finder result (not in the top corner).
- Finder header: the `Finder` section-label and the day/month form box sit on one top-aligned row via `.finder-top` (grid `1fr auto 1fr`, label left, box centered); stacks to one column ≤560px.

---

## Spread grid (shared component)

`.spread-grid` is the 7-column playing-card grid (crown row + 7 planetary rows + planet-label row). The CSS is **duplicated** in both `cardsoflife.html` (used by the browse grid and the annual/Quadrations grid) and `quadrations.html` — keep the two copies in sync.

- Columns are fluid: `grid-template-columns: repeat(7, 1fr)`, `width:100%`, capped at `max-width:560px` and centered. Cards use `aspect-ratio: 5/7` (not fixed px) so they scale proportionally. Change `max-width` to resize the whole grid.
- Standalone cards (`#mFace`, `#ccFace`, `.result-pip-card`, `.pcard .spread-card`, `.rel-equation .spread-card`) set explicit width+height, which overrides the base `aspect-ratio` — leave those as-is.

---

## Versioning

**Two systems run in parallel:**

### 1. Manual snapshots → `versions/`
Before each editing session, copy all site files:
```bash
TS=$(date +%Y%m%d-%H%M%S)
VN=$(ls /sessions/<session>/mnt/Super/versions/ | grep -E '^v[0-9]+_' | sort -t_ -k1 -V | tail -1 | grep -oE '^v[0-9]+' | grep -oE '[0-9]+')
NEXT=$((VN + 1))
DIR="/sessions/<session>/mnt/Super/versions/v${NEXT}_${TS}"
mkdir -p "$DIR"
for f in index.html site.js site.css iching.html bip39.html calculator.html cardsoflife.html hexagrams.html quadrations.html cardsdata.js dozenal.js ichingdata.js linedata.js; do
  [ -f "/sessions/<session>/mnt/Super/$f" ] && cp "/sessions/<session>/mnt/Super/$f" "$DIR/"
done
```

### 2. Git
```bash
cd /sessions/<session>/mnt/Super
git add -A && git commit -m "description"
```

**Revert:** bash mount can't overwrite files. Use `git show <hash>:<file>` to read old content, then Write tool to restore.

**Lock file:** If commit fails with `cannot lock ref 'HEAD'`, use `mcp__cowork__allow_cowork_file_delete` then `rm /sessions/<session>/mnt/Super/.git/HEAD.lock`.

---

## Important technical notes

### Bash mount quirk
`/sessions/<session>/mnt/Super/` is **CREATE-ONLY** for existing files — can write new files but not overwrite. Always use the host **Read/Write/Edit tools** to modify existing files.

### File tool paths
- Read/Write/Edit: `/Users/Claude/Super/filename`
- bash: `/sessions/<session>/mnt/Super/filename`

### iching.html
- Grid collapsed by default; Fu Xi / King Wen buttons open it; clicking the active button collapses it again.
- Page loads clean (no auto-restore of last reading). Manual save/load history (localStorage key `iching_readings`) is intact.

---

## Future work (do not implement without asking)

### BIP39 integration into I Ching page
`bip39.html` currently stands alone. Plan: fold its content into `iching.html` as a section or tab. Not yet designed.

### Aces removal for exact 3-coin probability
Removing the 4 aces from the 52-card deck gives exact 3-coin I Ching probabilities:
- Red pips 2–10 (young yang): 18/48 = 3/8
- Black pips 2–10 (young yin): 18/48 = 3/8
- Red courts (old yang / changing): 6/48 = 1/8
- Black courts (old yin / changing): 6/48 = 1/8

Symbolic role for aces is **undecided** — three directions under consideration:
1. *Void line* — a fifth line type, unformed; reading addresses what hasn't taken shape yet.
2. *Direct message* — ace interrupts the cast; suit determines the nature of the message.
3. *Silence* — the Sage declines to answer that line. Ace = the Tao before division.

When Levi returns to this: first ask which direction he's chosen, then modify `buildDeck()` in `iching.html` and add ace rendering/messaging to the cast flow.

### Moving lines — wired but worth reviewing
384 line texts are in `linedata.js` and wired into the cast flow. The accessibility focus-trap on the hexagram popup is a deferred item.
